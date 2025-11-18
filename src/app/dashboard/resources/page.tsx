import { BookCopy, Download, FileText, Filter, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const resources = [
  { id: 1, title: 'Ley de Promoción de la Competencia y Defensa Efectiva del Consumidor', type: 'law', tags: ['AML', 'KYC'] },
  { id: 2, title: 'Guía para la implementación de Sandbox Regulatorio', type: 'guideline', tags: ['sandbox', 'innovación'] },
  { id: 3, title: 'Reglamento de Sociedades de Fondos de Inversión', type: 'regulation', tags: ['inversión', 'wealthtech'] },
  { id: 4, title: 'Presentación: Open Banking en LATAM', type: 'slide', tags: ['open banking', 'pagos'] },
];

const allTags = ['AML', 'KYC', 'sandbox', 'innovación', 'inversión', 'wealthtech', 'open banking', 'pagos'];

export default function ResourcesPage() {
  return (
    <div className="grid md:grid-cols-[250px_1fr] gap-8">
      <aside>
        <h2 className="text-xl font-headline font-semibold mb-4 flex items-center gap-2"><Filter className="h-5 w-5"/> Filtros</h2>
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold text-sm mb-2">Buscar por Título</h3>
                <Input placeholder="Buscar..." />
            </div>
            <div>
                <h3 className="font-semibold text-sm mb-2">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                        <Button key={tag} variant="outline" size="sm" className="h-auto py-1 px-2">
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>
             <div>
                <h3 className="font-semibold text-sm mb-2">Tipo de Recurso</h3>
                <div className="space-y-2">
                     {['Ley', 'Reglamento', 'Guía', 'Artículo', 'Video'].map(type => (
                        <div key={type} className="flex items-center space-x-2">
                            <input type="checkbox" id={type} className="rounded" />
                            <label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </aside>
      <main className="space-y-6">
        <div>
            <h1 className="text-3xl font-headline font-bold">Hub de Recursos</h1>
            <p className="text-muted-foreground">
            Tu centro de conocimiento regulatorio y educativo.
            </p>
        </div>
        <div className="space-y-4">
            {resources.map(resource => (
                <Card key={resource.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-primary" />
                         <div>
                            <CardTitle className="font-headline text-lg">{resource.title}</CardTitle>
                            <div className="flex gap-2 mt-2">
                                {resource.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                         </div>
                       </div>
                       <Button variant="outline">
                           <Download className="mr-2 h-4 w-4" />
                           Descargar
                       </Button>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
