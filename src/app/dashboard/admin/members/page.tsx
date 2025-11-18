"use client";

import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { useCallback, useMemo } from 'react';
import { useFirestoreCollection } from '@/hooks/use-firestore-collection';
import type { Organization } from '@/lib/types';
import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/lib/firebase-provider';

export default function AdminMembersPage() {
  const { userRole } = useFirebase();
  const getPlaceholderImage = (id: string) => placeholderImages.find((p) => p.id === id);

  const mapOrganization = useCallback(
    (doc: QueryDocumentSnapshot<DocumentData>): Organization => {
      const data = doc.data() ?? {};
      return {
        id: doc.id,
        name: data.name ?? 'Organización',
        logoId: data.logoId,
        logoUrl: data.logoUrl,
        type: data.type ?? 'other',
        description: data.description ?? '',
        website: data.website ?? '#',
        country: data.country ?? 'Costa Rica',
        verticals: data.verticals ?? [],
        stage: data.stage ?? 'growing',
        needs: data.needs ?? [],
        isMember: data.isMember ?? false,
        membershipTier: data.membershipTier ?? 'basic',
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      } as Organization;
    },
    []
  );

  const { data: organizations, loading } = useFirestoreCollection<Organization>(
    'organizations',
    mapOrganization,
    { listen: true }
  );

  const organizationsWithLogo = useMemo(
    () =>
      organizations.map((org) => {
        const placeholder = org.logoId ? getPlaceholderImage(org.logoId) : null;
        return {
          ...org,
          logoUrl: org.logoUrl ?? placeholder?.imageUrl,
          logoHint: placeholder?.imageHint,
        };
      }),
    [organizations]
  );

  const isAdmin = ['association_admin', 'super_admin'].includes(userRole);

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestión de miembros</CardTitle>
          <CardDescription>Esta sección está limitada a administradores.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Gestión de Miembros</CardTitle>
        <CardDescription>
          Administra organizaciones, membresías y roles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Logo</span>
              </TableHead>
              <TableHead>Organización</TableHead>
              <TableHead>Membresía</TableHead>
              <TableHead className="hidden md:table-cell">
                Tipo
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Fecha de Ingreso
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6}>Cargando organizaciones...</TableCell>
              </TableRow>
            )}
            {!loading && organizationsWithLogo.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground">
                  No hay miembros registrados aún.
                </TableCell>
              </TableRow>
            )}
            {organizationsWithLogo.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="hidden sm:table-cell">
                  <Avatar className="h-10 w-10">
                    {org.logoUrl && (
                      <AvatarImage
                        src={org.logoUrl}
                        alt={org.name}
                        className="object-contain"
                        data-ai-hint={org.logoHint}
                      />
                    )}
                    <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{org.membershipTier}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell capitalize">
                  {org.type}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {org.createdAt.toLocaleDateString('es-CR')}
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
                      <DropdownMenuItem>Cambiar Membresía</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Eliminar
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
  );
}
