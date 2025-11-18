import { Lightbulb, Plus, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const opportunities = [
    {
        id: 1,
        title: "Buscamos startup de RegTech para automatización de KYC",
        company: "Banco Nacional",
        status: "open",
    },
    {
        id: 2,
        title: "Ronda de inversión pre-seed para plataforma de Neobanking",
        company: "FintechCo",
        status: "in_discussion",
    }
]

const recommendations = [
    {
        id: 1,
        opportunityTitle: "Buscamos startup de RegTech para automatización de KYC",
        targetCompany: "RegulAI",
        matchScore: 0.92,
        explanation: "RegulAI se especializa en soluciones de IA para cumplimiento normativo, alineándose perfectamente con la necesidad del Banco Nacional. Su tecnología ha demostrado reducir los tiempos de onboarding en un 70%."
    },
    {
        id: 2,
        opportunityTitle: "Ronda de inversión pre-seed para plataforma de Neobanking",
        targetCompany: "Carao Ventures",
        matchScore: 0.85,
        explanation: "Carao Ventures tiene una tesis de inversión activa en neobanks para la región y ha invertido previamente en 3 compañías del sector. El enfoque en PyMEs de FintechCo es de alto interés para ellos."
    }
]

export default function MatchmakingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Matchmaking IA</h1>
          <p className="text-muted-foreground">
            Crea oportunidades y recibe recomendaciones inteligentes de partners.
          </p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Crear Oportunidad
        </Button>
      </div>

       <Tabs defaultValue="recommendations">
        <TabsList>
          <TabsTrigger value="recommendations">Recomendaciones IA</TabsTrigger>
          <TabsTrigger value="my-opportunities">Mis Oportunidades</TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {recommendations.map(rec => (
                    <Card key={rec.id}>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg flex items-start justify-between">
                                <span>{rec.targetCompany}</span>
                                <Badge className="flex items-center gap-1 text-base bg-accent hover:bg-accent/90">
                                    <Star className="h-4 w-4" /> { (rec.matchScore * 100).toFixed(0) }%
                                </Badge>
                            </CardTitle>
                            <CardDescription>Recomendado para: "{rec.opportunityTitle}"</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{rec.explanation}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                             <Button variant="ghost">Ignorar</Button>
                             <Button>Contactar</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="my-opportunities" className="mt-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {opportunities.map(op => (
                    <Card key={op.id}>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{op.title}</CardTitle>
                            <CardDescription>Publicado por: {op.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Badge variant={op.status === 'open' ? 'default' : 'secondary'}>
                                {op.status === 'open' ? 'Abierta' : 'En Discusión'}
                            </Badge>
                        </CardContent>
                         <CardFooter className="flex justify-end gap-2">
                             <Button variant="outline">Ver Matches</Button>
                             <Button variant="destructive">Cerrar</Button>
                        </CardFooter>
                    </Card>
                ))}
                <Card className="flex flex-col items-center justify-center text-center border-dashed min-h-[200px]">
                    <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-headline text-lg font-semibold mb-2">Crea una nueva oportunidad</h3>
                    <p className="text-sm text-muted-foreground mb-4">¿Buscas capital, talento o un partner tecnológico?</p>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Crear Oportunidad
                    </Button>
                </Card>
             </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
