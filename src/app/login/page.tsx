import Link from 'next/link';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// A placeholder for social icons since they aren't in lucide-react
const SocialIcon = ({ name }: { name: string }) => (
  <div className="w-6 h-6 flex items-center justify-center font-bold text-sm border rounded-full">
    {name.charAt(0)}
  </div>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-secondary/50 flex flex-col items-center justify-center p-4 relative">
       <Button variant="ghost" asChild className="absolute top-4 left-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver al inicio
        </Link>
      </Button>
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="text-center">
           <div className="mx-auto bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mb-4">
             <Building2 className="w-8 h-8" />
           </div>
          <CardTitle className="font-headline text-2xl">Bienvenido de Vuelta</CardTitle>
          <CardDescription>Inicia sesión para acceder a tu cuenta de Fintech Hub CR.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continuar con</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline"><SocialIcon name="G" /> Google</Button>
            <Button variant="outline"><SocialIcon name="L" /> LinkedIn</Button>
            <Button variant="outline"><SocialIcon name="M" /> Microsoft</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Regístrate
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
