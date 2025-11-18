import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Building,
  CalendarCheck,
  CalendarDays,
  Handshake,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { OverviewChart } from '@/components/dashboard/overview-chart';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Miembros Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">
                +5 que el mes pasado
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Oportunidades Abiertas
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">
                +8 nuevas esta semana
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Matches Realizados
              </CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                +12 en los últimos 30 días
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Evento</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">En 15 días</div>
              <p className="text-xs text-muted-foreground">Fintech Summit 2024</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Crecimiento del Ecosistema</CardTitle>
              <CardDescription>
                Número de nuevos miembros en los últimos 6 meses.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades Recientes</CardTitle>
              <CardDescription>
                Las últimas 5 oportunidades creadas por miembros.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organización</TableHead>
                    <TableHead className="text-right">Tipo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Banco Nacional</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Busca startups de lending
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Reto</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">FintechCo</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Necesita capital semilla
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Inversión</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Carao Ventures</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Tesis de inversión en RegTech
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Tesis</Badge>
                    </TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>
                      <div className="font-medium">Impesa</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Busca piloto para pagos QR
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Piloto</Badge>
                    </TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>
                      <div className="font-medium">Zunify</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        Requiere talento en IA
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Talento</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
