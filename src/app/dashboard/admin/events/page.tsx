"use client";

import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCallback } from 'react';
import { useFirestoreCollection } from '@/hooks/use-firestore-collection';
import type { Event } from '@/lib/types';
import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase-provider';

export default function AdminEventsPage() {
  const { userRole } = useFirebase();
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

  const isAdmin = ['association_admin', 'super_admin'].includes(userRole);

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestión de eventos</CardTitle>
          <CardDescription>Acceso restringido a administradores de la asociación.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="flex-1">
            <h1 className="text-3xl font-headline font-bold">Gestión de Eventos</h1>
            <p className="text-muted-foreground">
                Crea, edita y administra todos los eventos del hub.
            </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Crear Evento
            </span>
          </Button>
        </div>
      </div>
       <TabsList className="mt-4">
        <TabsTrigger value="all">Todos</TabsTrigger>
        <TabsTrigger value="published">Publicados</TabsTrigger>
        <TabsTrigger value="draft">Borradores</TabsTrigger>
        <TabsTrigger value="archived" className="hidden sm:flex">
          Archivados
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Tipo
                  </TableHead>
                   <TableHead className="hidden md:table-cell">
                    Modo
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Registrados
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Fecha
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Acciones</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={6}>Cargando eventos...</TableCell>
                  </TableRow>
                )}
                {!loading && events.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground">
                      No hay eventos disponibles todavía.
                    </TableCell>
                  </TableRow>
                )}
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell className="hidden md:table-cell capitalize">
                      <Badge variant="secondary">{event.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell capitalize">
                       <Badge variant="outline">{event.mode}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">152</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(event.startDateTime).toLocaleDateString('es-CR')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Ver Registros</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Archivar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
