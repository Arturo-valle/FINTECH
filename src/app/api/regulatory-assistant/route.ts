import {NextRequest, NextResponse} from 'next/server';

import {regulatoryAssistantRag} from '@/ai/flows/regulatory-assistant-rag';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const {message, sessionId, role = 'fintech', language = 'es'} = await req.json();

  const result = await regulatoryAssistantRag({
    question: message,
    role,
    language,
    sessionId,
  });

  const encoder = new TextEncoder();
  const chunks = chunkForStreaming(result.answer);

  const stream = new ReadableStream({
    async start(controller) {
      chunks.forEach(part => controller.enqueue(encoder.encode(JSON.stringify({type: 'chunk', text: part}) + '\n')));
      controller.enqueue(
        encoder.encode(
          JSON.stringify({
            type: 'metadata',
            citations: result.citations,
            disclaimer: result.disclaimer,
            sessionId: result.sessionId,
          }) + '\n'
        )
      );
      controller.close();
    },
  });

  return new NextResponse(stream, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function chunkForStreaming(text: string, size = 180) {
  if (!text) return [] as string[];
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
