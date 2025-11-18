"use client";

import { Calendar, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';
import { useCallback } from 'react';
import { useFirestoreCollection } from '@/hooks/use-firestore-collection';
import type { Event } from '@/lib/types';
import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase-provider';

export default function EventsPage() {
  const { userRole } = useFirebase();
  const getPlaceholderImage = (id: string) => placeholderImages.find((p) => p.id === 'news-image-1' || p.id === id);

  const mapEvent = useCallback((doc: QueryDocumentSnapshot<DocumentData>): Event => {
    const data = doc.data() ?? {};
    return {
      id: doc.id,
      title: data.title ?? 'Evento',
      description: data.description ?? '',
      type: data.type ?? 'meetup',
      mode: data.mode ?? 'onsite',
      startDateTime: data.startDateTime?.toDate?.() ?? new Date(),
      endDateTime: data.endDateTime?.toDate?.() ?? new Date(),
      location: data.location ?? 'Por definir',
      speakers: data.speakers ?? [],
      isPublic: data.isPublic ?? true,
      createdBy: data.createdBy ?? '',
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
    } as Event;
  }, []);

  const { data: events, loading } = useFirestoreCollection<Event>('events', mapEvent, {
    listen: true,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Eventos</h1>
        <p className="text-muted-foreground">
          Participa en nuestros meetups, webinars y cumbres.
        </p>
      </div>
      <Tabs defaultValue="upcoming">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Próximos</TabsTrigger>
            <TabsTrigger value="past">Pasados</TabsTrigger>
          </TabsList>
          <div className="w-full max-w-sm">
            <Input placeholder="Buscar eventos..." />
          </div>
        </div>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <p className="text-muted-foreground">Cargando eventos...</p>}
            {!loading && events.length === 0 && (
              <p className="text-muted-foreground">Aún no hay eventos publicados.</p>
            )}
            {events.map((event) => {
              const eventImage = getPlaceholderImage(event.id);
              return (
                <Card key={event.id} className="flex flex-col">
                  {eventImage && (
                    <Image
                      src={eventImage.imageUrl}
                      alt={event.title}
                      width={600}
                      height={300}
                      className="w-full h-40 object-cover rounded-t-lg"
                      data-ai-hint={eventImage.imageHint}
                    />
                  )}
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{event.type}</Badge>
                    <CardTitle className="font-headline">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(event.startDateTime).toLocaleDateString('es-CR', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={userRole === 'guest' ? 'outline' : 'default'} disabled={userRole === 'guest'}>
                      {userRole === 'guest' ? 'Disponible para miembros' : 'Registrarse'}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="past">
            <p className="text-muted-foreground text-center py-12">No hay eventos pasados para mostrar.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
