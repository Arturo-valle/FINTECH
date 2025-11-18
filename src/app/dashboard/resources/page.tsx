"use client";

import { BookCopy, Download, FileText, Filter, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCallback, useMemo } from 'react';
import { useFirestoreCollection } from '@/hooks/use-firestore-collection';
import type { Resource } from '@/lib/types';
import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase-provider';

export default function ResourcesPage() {
  const { userRole } = useFirebase();
  const mapResource = useCallback((doc: QueryDocumentSnapshot<DocumentData>): Resource => {
    const data = doc.data() ?? {};
    return {
      id: doc.id,
      title: data.title ?? 'Recurso',
      type: data.type ?? 'other',
      tags: data.tags ?? [],
      language: data.language ?? 'es',
      storagePath: data.storagePath ?? '',
      summary: data.summary ?? '',
      publishedAt: data.publishedAt?.toDate?.() ?? new Date(),
      createdBy: data.createdBy ?? '',
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
    } as Resource;
  }, []);

  const { data: resources, loading } = useFirestoreCollection<Resource>(
    'resources',
    mapResource,
    { listen: true }
  );

  const allTags = useMemo(() => {
    const tags = resources.flatMap((resource) => resource.tags || []);
    return tags.length ? Array.from(new Set(tags)) : ['AML', 'KYC'];
  }, [resources]);

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
            {loading && <p className="text-muted-foreground">Cargando recursos...</p>}
            {!loading && resources.length === 0 && (
              <p className="text-muted-foreground">Todavía no hay recursos publicados.</p>
            )}
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
                       <Button variant={userRole === 'guest' ? 'outline' : 'default'} disabled={userRole === 'guest'}>
                           <Download className="mr-2 h-4 w-4" />
                           {userRole === 'guest' ? 'Solo miembros' : 'Descargar'}
                       </Button>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </main>
    </div>
  );
}
