import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart2,
  Calendar,
  Handshake,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import PublicHeader from '@/components/layout/public-header';
import Footer from '@/components/layout/footer';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { organizations, news, events } from '@/lib/placeholder-data';

const heroImage = placeholderImages.find((p) => p.id === 'hero-background');
const getPlaceholderImage = (id: string) => placeholderImages.find((p) => p.id === id);

export default function Home() {
  const memberLogos = organizations
    .filter((o) => o.isMember)
    .slice(0, 5)
    .map((org) => getPlaceholderImage(org.logoId));
  const latestNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full text-white">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Fintech Hub CR
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
              Conectando y potenciando el ecosistema Fintech de Costa Rica.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Hacerse Miembro <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/dashboard/members">Explorar Ecosistema</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h2 className="font-headline text-4xl font-bold text-primary">120+</h2>
                <p className="mt-2 text-muted-foreground">Miembros Activos</p>
              </div>
              <div>
                <h2 className="font-headline text-4xl font-bold text-primary">50+</h2>
                <p className="mt-2 text-muted-foreground">Eventos Anuales</p>
              </div>
              <div>
                <h2 className="font-headline text-4xl font-bold text-primary">$50M+</h2>
                <p className="mt-2 text-muted-foreground">Capital Levantado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Un Hub Digital para la Innovación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Handshake, title: 'Matchmaking IA', description: 'Conectamos startups con corporativos e inversores usando IA para encontrar la sinergia perfecta.' },
                { icon: ShieldCheck, title: 'Asistente Regulatorio', description: 'Navega el marco regulatorio de Costa Rica con nuestro chatbot experto potenciado por IA.' },
                { icon: Users, title: 'Directorio Inteligente', description: 'Encuentra miembros por especialidad, tecnología o necesidades con nuestra búsqueda semántica.' },
                { icon: Calendar, title: 'Gestión de Eventos', description: 'Participa en webinars, meetups y cumbres exclusivas para miembros de la asociación.' },
                { icon: Newspaper, title: 'Creación de Contenido', description: 'Genera borradores para noticias y blogs con nuestro asistente de contenido IA.' },
                { icon: BarChart2, title: 'Analítica Avanzada', description: 'Obtén insights del ecosistema preguntando en lenguaje natural a nuestros datos.' },
              ].map((feature, index) => (
                <Card key={index} className="text-center bg-card">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Member Highlights Section */}
        <section id="members" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-4">Nuestros Miembros</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Una comunidad diversa de startups, bancos, inversores y reguladores que forman el corazón del fintech en Costa Rica.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {memberLogos.map((logo, index) =>
                logo ? (
                  <Image
                    key={index}
                    src={logo.imageUrl}
                    alt={logo.description}
                    width={150}
                    height={50}
                    className="object-contain"
                    data-ai-hint={logo.imageHint}
                  />
                ) : null
              )}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-12 md:py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Últimas Noticias</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((article) => {
                const articleImage = getPlaceholderImage(article.imageId);
                return (
                  <Card key={article.id} className="overflow-hidden">
                    {articleImage && (
                       <Image
                         src={articleImage.imageUrl}
                         alt={articleImage.description}
                         width={600}
                         height={400}
                         className="w-full h-48 object-cover"
                         data-ai-hint={articleImage.imageHint}
                       />
                    )}
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                      <h3 className="font-headline text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {new Date(article.date).toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <Button asChild variant="link" className="p-0">
                        <Link href="#">Leer más <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="flex flex-col md:flex-row items-center">
                  <div className="p-6 text-center md:border-r">
                    <p className="font-headline text-2xl font-bold text-primary">{new Date(event.startDateTime).getDate()}</p>
                    <p className="text-muted-foreground uppercase text-sm">{new Date(event.startDateTime).toLocaleString('es-CR', { month: 'short' })}</p>
                  </div>
                  <div className="p-6 flex-1">
                    <Badge variant="default" className="mb-2 bg-accent text-accent-foreground">{event.type}</Badge>
                    <h3 className="font-headline text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description.substring(0, 100)}...</p>
                    <Button asChild>
                      <Link href="#">Ver Detalles y Registrarse</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
