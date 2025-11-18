import fs from 'fs/promises';

export type EmbeddedRegulatoryChunk = {
  id: string;
  source: string;
  page: number;
  text: string;
  embedding: number[];
};

const embeddingStoreKey = Symbol.for('__regulatory_embeddings');

function getEmbeddingStore(): EmbeddedRegulatoryChunk[] {
  const globalScope = globalThis as unknown as {
    [embeddingStoreKey]?: EmbeddedRegulatoryChunk[];
  };

  if (!globalScope[embeddingStoreKey]) {
    globalScope[embeddingStoreKey] = [];
  }

  return globalScope[embeddingStoreKey]!;
}

export function saveEmbeddings(chunks: EmbeddedRegulatoryChunk[]) {
  const store = getEmbeddingStore();
  const bySource = new Map(store.map(chunk => [`${chunk.source}:${chunk.page}:${chunk.id}`, chunk] as const));

  chunks.forEach(chunk => {
    bySource.set(`${chunk.source}:${chunk.page}:${chunk.id}`, chunk);
  });

  const deduped = Array.from(bySource.values());
  (globalThis as unknown as {[embeddingStoreKey]?: EmbeddedRegulatoryChunk[]})[embeddingStoreKey] = deduped;
}

export function listEmbeddings(): EmbeddedRegulatoryChunk[] {
  return [...getEmbeddingStore()];
}

export async function loadLocalFallbackDocument(path = 'docs/blueprint.md') {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return [{
      id: 'local-blueprint',
      source: path,
      page: 1,
      text: content,
      embedding: [],
    } satisfies EmbeddedRegulatoryChunk];
  } catch (error) {
    console.error('Failed to read fallback document', error);
    return [] as EmbeddedRegulatoryChunk[];
  }
}
