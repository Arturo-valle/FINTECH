'use client';

import {useMemo, useRef, useState} from 'react';
import {Bot, ExternalLink, Loader2, Send, User} from 'lucide-react';

import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {streamRegulatoryAssistant, Citation} from '@/lib/services/regulatoryAssistant';
import {cn} from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  disclaimer?: string;
};

const quickPrompts = [
  '¿Qué es el Sandbox Regulatorio?',
  'Requisitos para licencias de pagos',
  'Diferencias entre SUGEF y SUGEVAL',
];

export default function RegulatoryAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const pendingAssistantId = useRef<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isStreaming, [input, isStreaming]);

  const handleSend = async (prompt?: string) => {
    const question = prompt ?? input.trim();
    if (!question) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    pendingAssistantId.current = assistantId;
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
    setIsStreaming(true);

    let assembled = '';
    let citations: Citation[] = [];
    let disclaimer: string | undefined;

    for await (const event of streamRegulatoryAssistant(question, {sessionId, role: 'fintech', language: 'es'})) {
      if (event.type === 'chunk') {
        assembled += event.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content: assembled,
                }
              : msg
          )
        );
      } else {
        citations = event.citations;
        disclaimer = event.disclaimer;
        setSessionId(event.sessionId);
      }
    }

    setMessages(prev =>
      prev.map(msg =>
        msg.id === assistantId
          ? {
              ...msg,
              content: assembled,
              citations,
              disclaimer,
            }
          : msg
      )
    );

    pendingAssistantId.current = null;
    setIsStreaming(false);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-headline font-bold">Asistente Regulatorio IA</h1>
        <p className="text-muted-foreground">
          Pregúntale a nuestro asistente sobre leyes, regulaciones y guías del ecosistema.
        </p>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-sm text-muted-foreground">Inicia una conversación para ver las respuestas con citas.</div>
          )}
          {messages.map(message => (
            <div key={message.id} className={cn('flex items-start gap-4', message.role === 'user' && 'justify-end')}>
              {message.role === 'assistant' && (
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'rounded-lg p-3 max-w-xl text-sm space-y-2 whitespace-pre-wrap',
                  message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'
                )}
              >
                <p>{message.content || (pendingAssistantId.current === message.id ? 'Redactando respuesta…' : '')}</p>
                {message.citations && message.citations.length > 0 && (
                  <div className="space-y-2">
                    <Separator />
                    <p className="text-xs font-semibold">Referencias</p>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {message.citations.map((citation, index) => (
                        <li key={`${citation.id}-${index}`} className="flex items-center gap-1">
                          <span className="font-medium text-primary">[{index + 1}]</span>
                          <span className="line-clamp-2">{citation.snippet}</span>
                          <a
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                            href={citation.source}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.disclaimer && (
                  <p className="text-[11px] text-muted-foreground">{message.disclaimer}</p>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isStreaming && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Gemini está redactando…</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="space-y-4 w-full">
            <div className="flex gap-2 flex-wrap">
              {quickPrompts.map(prompt => (
                <Button key={prompt} variant="outline" size="sm" onClick={() => handleSend(prompt)} disabled={isStreaming}>
                  {prompt}
                </Button>
              ))}
            </div>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="message"
                placeholder="Escribe tu pregunta regulatoria..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button type="button" size="icon" onClick={() => handleSend()} disabled={!canSend}>
                {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                <span className="sr-only">Enviar</span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
