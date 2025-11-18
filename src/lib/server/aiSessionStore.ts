export type Citation = {
  id: string;
  source: string;
  page: number;
  snippet: string;
  score: number;
};

export type AiSessionMessage = {
  id: string;
  question: string;
  answer: string;
  citations: Citation[];
  disclaimer: string;
  createdAt: string;
};

const sessionStoreKey = Symbol.for('__ai_sessions_store');

function getSessionStore(): Map<string, AiSessionMessage[]> {
  const globalScope = globalThis as unknown as {
    [sessionStoreKey]?: Map<string, AiSessionMessage[]>;
  };

  if (!globalScope[sessionStoreKey]) {
    globalScope[sessionStoreKey] = new Map<string, AiSessionMessage[]>();
  }

  return globalScope[sessionStoreKey]!;
}

export function appendAiSessionEntry(sessionId: string, entry: AiSessionMessage) {
  const store = getSessionStore();
  const existing = store.get(sessionId) ?? [];
  store.set(sessionId, [...existing, entry]);
}

export function listAiSessionEntries(sessionId: string): AiSessionMessage[] {
  const store = getSessionStore();
  return store.get(sessionId) ?? [];
}
