import { Bot, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function ContentAssistantPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Asistente de Contenidos IA</h1>
        <p className="text-muted-foreground">
          Genera borradores para noticias, blogs y redes sociales en segundos.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Parámetros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="contentType">Tipo de Contenido</Label>
                        <Select>
                            <SelectTrigger id="contentType">
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="news">Noticia</SelectItem>
                                <SelectItem value="blog">Post de Blog</SelectItem>
                                <SelectItem value="event">Descripción de Evento</SelectItem>
                                <SelectItem value="social">Mensaje para Redes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="audience">Público Objetivo</Label>
                        <Select>
                            <SelectTrigger id="audience">
                                <SelectValue placeholder="Seleccionar público" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="startups">Startups</SelectItem>
                                <SelectItem value="investors">Inversores</SelectItem>
                                <SelectItem value="banks">Bancos</SelectItem>
                                <SelectItem value="general">Público General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="tone">Tono</Label>
                        <Select>
                            <SelectTrigger id="tone">
                                <SelectValue placeholder="Seleccionar tono" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Profesional</SelectItem>
                                <SelectItem value="friendly">Amigable</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bullets">Puntos Clave</Label>
                        <Textarea id="bullets" placeholder="- Lanzamiento de nuevo producto...&#10;- Alianza estratégica con...&#10;- Cifras de crecimiento..." rows={5}/>
                    </div>
                     <Button className="w-full">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generar Borrador
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
             <CardHeader>
                <CardTitle className="font-headline">Borrador Generado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-muted rounded-lg p-4 min-h-[400px] text-sm space-y-4">
                    <h2 className="text-xl font-bold font-headline">Fintech Hub CR Anuncia Alianza Estratégica para Impulsar la Innovación en Pagos</h2>
                    <p>La Asociación Fintech de Costa Rica se complace en anunciar una alianza clave con <span className="font-semibold">[Nombre de Partner]</span>, un movimiento que promete acelerar la transformación digital en el sector de pagos del país.</p>
                    <p>Esta colaboración se centrará en el desarrollo de soluciones de pago instantáneo y en la promoción de estándares de open banking, beneficiando directamente a startups y consumidores.</p>
                    <blockquote className="border-l-4 border-primary pl-4 italic">"Creemos que esta alianza es un catalizador para el futuro financiero de Costa Rica", afirmó un representante de la asociación.</blockquote>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon"><ThumbsUp className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon"><ThumbsDown className="h-5 w-5"/></Button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">Mejorar</Button>
                        <Button variant="outline">Acortar</Button>
                        <Button variant="outline">Traducir (EN)</Button>
                        <Button>Copiar</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
