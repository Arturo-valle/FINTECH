import { Calendar, MapPin } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { events } from '@/lib/placeholder-data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Image from 'next/image';

export default function EventsPage() {
    const getPlaceholderImage = (id: string) =>
    placeholderImages.find((p) => p.id === 'news-image-1');

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
            {events.map((event) => {
              const eventImage = getPlaceholderImage('news-image-1'); // using a generic one
              return(
                <Card key={event.id} className="flex flex-col">
                  {eventImage && <Image src={eventImage.imageUrl} alt={event.title} width={600} height={300} className="w-full h-40 object-cover rounded-t-lg" data-ai-hint={eventImage.imageHint} />}
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
                    <Button className="w-full">Registrarse</Button>
                  </CardFooter>
                </Card>
              )
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
