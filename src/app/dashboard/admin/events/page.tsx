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
import { events } from '@/lib/placeholder-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminEventsPage() {
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
