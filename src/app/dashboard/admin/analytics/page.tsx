import { Bot, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OverviewChart } from '@/components/dashboard/overview-chart';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Analítica Conversacional del Ecosistema</h1>
        <p className="text-muted-foreground">
          Haz preguntas en lenguaje natural para obtener insights de los datos del hub.
        </p>
      </div>

      <Card>
          <CardContent className="p-4">
             <div className="flex w-full items-center space-x-2">
                <Input
                id="analytics-query"
                placeholder="Ej: ¿Cómo ha crecido el número de fintechs de pagos en los últimos 3 años?"
                className="flex-1"
                />
                <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Preguntar</span>
                </Button>
            </div>
          </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start gap-4">
            <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Bot className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline">Respuesta de la IA</CardTitle>
                <CardDescription>Basado en tu pregunta sobre el crecimiento de fintechs de pagos.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
                <h3 className="font-semibold">Análisis</h3>
                <p className="text-muted-foreground">
                    El número de fintechs en el vertical de pagos ha experimentado un crecimiento sostenido durante los últimos 3 años. Se observa un crecimiento anual promedio del 25%, con una aceleración notable en el último año fiscal, posiblemente debido a la adopción de nuevas regulaciones de open banking.
                </p>
                <h3 className="font-semibold">Sugerencia</h3>
                 <p className="text-muted-foreground">
                    Un gráfico de barras es la mejor visualización para mostrar el número de nuevas empresas por año y resaltar la tendencia de crecimiento.
                </p>
            </div>
            <div>
                <h3 className="font-semibold text-center mb-4">Crecimiento de Fintechs de Pagos por Año</h3>
                <OverviewChart />
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
