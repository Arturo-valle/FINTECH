'use client';

import { Loader2, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LogoutPage() {
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        router.replace('/login');
      } catch (err) {
        setError('No pudimos cerrar tu sesión. Inténtalo nuevamente.');
        setProcessing(false);
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 p-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <LogOut className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">Cerrando sesión</CardTitle>
          <CardDescription>
            {processing
              ? 'Estamos finalizando tu sesión de forma segura.'
              : 'Hubo un problema al cerrar tu sesión.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {processing ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <Button onClick={() => router.replace('/login')}>Volver al inicio de sesión</Button>
          )}
        </CardContent>
        {error ? <p className="text-sm text-destructive text-center pb-4">{error}</p> : null}
      </Card>
    </div>
  );
}
