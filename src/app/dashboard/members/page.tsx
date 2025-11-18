import { Building, Globe, Search } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { organizations } from '@/lib/placeholder-data';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';

export default function MembersPage() {
  const getPlaceholderImage = (id: string) =>
    placeholderImages.find((p) => p.id === id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Directorio de Miembros</h1>
        <p className="text-muted-foreground">
          Explora y conecta con las organizaciones que forman nuestro ecosistema.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Busca por nombre o con lenguaje natural: 'fintech de lending para pymes'"
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de Org" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="bank">Banco</SelectItem>
                <SelectItem value="investor">Inversor</SelectItem>
                <SelectItem value="partner">Partner</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Vertical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pagos">Pagos</SelectItem>
                <SelectItem value="lending">Lending</SelectItem>
                <SelectItem value="insurtech">Insurtech</SelectItem>
                <SelectItem value="regtech">Regtech</SelectItem>
              </SelectContent>
            </Select>
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => {
          const logo = getPlaceholderImage(org.logoId);
          return (
            <Card key={org.id}>
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  {logo && <AvatarImage src={logo.imageUrl} alt={org.name} className='object-contain'/>}
                  <AvatarFallback className="text-2xl">
                    {org.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-xl">{org.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm capitalize text-muted-foreground">{org.type}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground h-20 overflow-hidden">
                  {org.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {org.verticals.map((v) => (
                    <Badge key={v} variant="secondary">
                      {v}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={org.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </Button>
                </Link>
                <Button>Contactar</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
