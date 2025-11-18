'use server';

import {Buffer} from 'node:buffer';

import {ai} from '@/ai/genkit';
import {appendAiSessionEntry, Citation} from '@/lib/server/aiSessionStore';
import {EmbeddedRegulatoryChunk, listEmbeddings, loadLocalFallbackDocument, saveEmbeddings} from '@/lib/server/regulatoryEmbeddingsStore';
import {z} from 'genkit';

const EmbeddingModel = 'googleai/text-embedding-004';
const GenerationModel = 'googleai/gemini-1.5-pro';

const IngestInputSchema = z.object({
  bucket: z.string().optional(),
  prefix: z.string().default('resources/'),
});

const IngestOutputSchema = z.object({
  embeddedChunks: z.number(),
  sources: z.array(z.string()),
});

const QueryInputSchema = z.object({
  question: z.string(),
  role: z.string().default('fintech'),
  language: z.enum(['es', 'en']).default('es'),
  sessionId: z.string().optional(),
});

const QueryOutputSchema = z.object({
  answer: z.string(),
  citations: z.array(
    z.object({
      id: z.string(),
      source: z.string(),
      page: z.number(),
      snippet: z.string(),
      score: z.number(),
    })
  ),
  disclaimer: z.string(),
  sessionId: z.string(),
});

const ingestionFlow = ai.defineFlow(
  {name: 'ingestRegulatoryResources', inputSchema: IngestInputSchema, outputSchema: IngestOutputSchema},
  async input => {
    const bucket = input.bucket ?? process.env.RESOURCES_BUCKET;
    const sourceFiles = await collectSources(bucket, input.prefix);
    const resources = sourceFiles.length > 0 ? sourceFiles : await loadLocalFallbackDocument();
    const chunks = chunkDocuments(resources);
    const embeddingsResponse: any = await ai.embedMany({
      model: EmbeddingModel,
      input: chunks.map(chunk => chunk.text),
    });
    const embeddings: number[][] =
      embeddingsResponse?.output?.embeddings ?? embeddingsResponse?.embeddings ?? [];

    const embeddedChunks: EmbeddedRegulatoryChunk[] = chunks.map((chunk, index) => ({
      ...chunk,
      embedding: embeddings[index] ?? [],
    }));

    saveEmbeddings(embeddedChunks);

    return {
      embeddedChunks: embeddedChunks.length,
      sources: Array.from(new Set(embeddedChunks.map(chunk => chunk.source))),
    } satisfies z.infer<typeof IngestOutputSchema>;
  }
);

const queryFlow = ai.defineFlow(
  {name: 'regulatoryAssistantRag', inputSchema: QueryInputSchema, outputSchema: QueryOutputSchema},
  async input => {
    const sessionId = input.sessionId ?? crypto.randomUUID();
    const embeddingStore = listEmbeddings();

    if (embeddingStore.length === 0) {
      await ingestionFlow({bucket: process.env.RESOURCES_BUCKET, prefix: 'resources/'});
    }

    const queryEmbeddingResponse: any = await ai.embedMany({model: EmbeddingModel, input: [input.question]});
    const queryEmbedding: number[] =
      queryEmbeddingResponse?.output?.embeddings?.[0] ?? queryEmbeddingResponse?.embeddings?.[0] ?? [];

    const ranked = rankBySimilarity(embeddingStore, queryEmbedding).slice(0, 4);
    const context = ranked.map((chunk, idx) => `[[${idx + 1}]] ${chunk.text}`).join('\n\n');

    const completion: any = await ai.generate({
      model: GenerationModel,
      input: `Eres un asistente regulatorio especializado en Costa Rica. Responde en ${input.language === 'es' ? 'español' : 'inglés'} con máximo rigor.

Contexto de referencia:
${context}

Pregunta: ${input.question}
Rol del usuario: ${input.role}

Incluye citas a las secciones relevantes usando el formato [[n]] y entrega una respuesta concisa.`,
    });

    const answer = completion?.outputText ?? completion?.text ?? '';
    const citations: Citation[] = ranked.map((chunk, index) => ({
      id: chunk.id,
      source: chunk.source,
      page: chunk.page,
      snippet: chunk.text.slice(0, 280),
      score: chunk.score ?? 0,
    }));

    const disclaimer =
      input.language === 'es'
        ? 'Esta respuesta es de carácter informativo y no constituye asesoría legal.'
        : 'This answer is for informational purposes only and does not constitute legal advice.';

    appendAiSessionEntry(sessionId, {
      id: crypto.randomUUID(),
      question: input.question,
      answer,
      citations,
      disclaimer,
      createdAt: new Date().toISOString(),
    });

    return {answer, citations, disclaimer, sessionId} satisfies z.infer<typeof QueryOutputSchema>;
  }
);

export async function ingestRegulatoryResources(input: z.infer<typeof IngestInputSchema>) {
  return ingestionFlow(input);
}

export async function regulatoryAssistantRag(input: z.infer<typeof QueryInputSchema>) {
  return queryFlow(input);
}

async function collectSources(bucket?: string, prefix = 'resources/'): Promise<EmbeddedRegulatoryChunk[]> {
  if (!bucket) return [];

  try {
    const response = await fetch(`https://storage.googleapis.com/storage/v1/b/${bucket}/o?prefix=${prefix}`);
    const {items = []} = (await response.json()) as {items?: {name: string; mediaLink: string}[]};
    const pdfs = items.filter(item => item.name.endsWith('.pdf'));
    const buffers = await Promise.all(
      pdfs.map(async file => {
        const pdfResponse = await fetch(`https://storage.googleapis.com/${bucket}/${file.name}`);
        const arrayBuffer = await pdfResponse.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return {
          id: file.name,
          source: `gs://${bucket}/${file.name}`,
          page: 1,
          text: await extractPdfText(base64),
          embedding: [],
        } satisfies EmbeddedRegulatoryChunk;
      })
    );
    return buffers.filter(chunk => Boolean(chunk.text.trim()));
  } catch (error) {
    console.error('Falling back to local resources due to Cloud Storage error', error);
    return [];
  }
}

async function extractPdfText(base64: string): Promise<string> {
  try {
    const response: any = await ai.generate({
      model: GenerationModel,
      input: [
        {
          media: {
            data: Buffer.from(base64, 'base64'),
            mimeType: 'application/pdf',
          },
        },
        {text: 'Extrae el texto visible de este PDF y devuélvelo como texto plano.'},
      ],
    });
    return response?.outputText ?? response?.text ?? '';
  } catch (error) {
    console.error('Could not extract PDF text', error);
    return '';
  }
}

function chunkDocuments(resources: EmbeddedRegulatoryChunk[], chunkSize = 1200): Omit<EmbeddedRegulatoryChunk, 'embedding'>[] {
  const chunks: Omit<EmbeddedRegulatoryChunk, 'embedding'>[] = [];

  resources.forEach(resource => {
    const cleanText = resource.text.replace(/\s+/g, ' ').trim();
    for (let i = 0; i < cleanText.length; i += chunkSize) {
      const text = cleanText.slice(i, i + chunkSize);
      chunks.push({
        id: `${resource.id}-${i / chunkSize}`,
        source: resource.source,
        page: resource.page,
        text,
      });
    }
  });

  return chunks;
}

function rankBySimilarity(chunks: EmbeddedRegulatoryChunk[], queryEmbedding: number[]): (EmbeddedRegulatoryChunk & {score: number})[] {
  return chunks
    .map(chunk => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score);
}

function cosineSimilarity(a: number[], b: number[]) {
  if (!a.length || !b.length || a.length !== b.length) return 0;
  const dot = a.reduce((sum, value, index) => sum + value * b[index], 0);
  const normA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const normB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));
  return normA && normB ? dot / (normA * normB) : 0;
}
