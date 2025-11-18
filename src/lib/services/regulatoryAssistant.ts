export type RegulatoryAssistantEvent =
  | {type: 'chunk'; text: string}
  | {type: 'metadata'; disclaimer: string; citations: Citation[]; sessionId: string};

export type Citation = {
  id: string;
  source: string;
  page: number;
  snippet: string;
  score: number;
};

export async function* streamRegulatoryAssistant(
  message: string,
  options?: {sessionId?: string; role?: string; language?: 'es' | 'en'}
) {
  const response = await fetch('/api/regulatory-assistant', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      message,
      sessionId: options?.sessionId,
      role: options?.role ?? 'fintech',
      language: options?.language ?? 'es',
    }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  if (!reader) return;

  while (true) {
    const {done, value} = await reader.read();
    if (done) {
      if (buffer.trim()) yield JSON.parse(buffer) as RegulatoryAssistantEvent;
      break;
    }

    buffer += decoder.decode(value, {stream: true});
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      if (!line.trim()) continue;
      yield JSON.parse(line) as RegulatoryAssistantEvent;
    }
  }
}
