import { Bot, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const messages = [
  { from: 'bot', text: 'Hola, soy tu asistente regulatorio. ¿Cómo puedo ayudarte hoy a navegar el marco financiero de Costa Rica?' },
  { from: 'user', text: '¿Cuáles son los requisitos clave de KYC para una fintech de pagos?' },
  { from: 'bot', text: 'Para una fintech de pagos en Costa Rica, los requisitos clave de KYC (Conoce a tu Cliente) bajo la normativa de SUGEF incluyen: 1. **Identificación del Cliente:** Recopilar y verificar documentos de identidad válidos (cédula, pasaporte). 2. **Verificación de Domicilio:** Obtener un comprobante de domicilio reciente. 3. **Perfil de Riesgo:** Evaluar el nivel de riesgo del cliente basado en su actividad transaccional y perfil. 4. **Monitoreo Continuo:** Realizar un seguimiento de las transacciones para detectar actividades inusuales. \n\n*Disclaimer: Esta respuesta es de carácter informativo y no constituye asesoría legal.*' },
];

export default function RegulatoryAssistantPage() {
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
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-4 ${msg.from === 'user' ? 'justify-end' : ''}`}>
              {msg.from === 'bot' && (
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-lg ${msg.from === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
               {msg.from === 'user' && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="space-y-4 w-full">
            <div className="flex gap-2">
                <Button variant="outline" size="sm">¿Qué es el Sandbox Regulatorio?</Button>
                <Button variant="outline" size="sm">Requisitos para licencias de pagos</Button>
                <Button variant="outline" size="sm">Diferencias entre SUGEF y SUGEVAL</Button>
            </div>
            <div className="flex w-full items-center space-x-2">
                <Input id="message" placeholder="Escribe tu pregunta regulatoria..." className="flex-1" autoComplete="off" />
                <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Enviar</span>
                </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
