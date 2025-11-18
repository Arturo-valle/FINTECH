import Link from 'next/link';
import { Linkedin, Twitter, Youtube } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: '#', 'aria-label': 'Twitter' },
    { icon: Linkedin, href: '#', 'aria-label': 'LinkedIn' },
    { icon: Youtube, href: '#', 'aria-label': 'YouTube' },
  ];

  const footerLinks = {
    'Asociación': [
      { label: 'Sobre Nosotros', href: '#' },
      { label: 'Beneficios', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
    'Ecosistema': [
      { label: 'Miembros', href: '#' },
      { label: 'Noticias', href: '#' },
      { label: 'Eventos', href: '#' },
    ],
    'Recursos': [
      { label: 'Hub Regulatorio', href: '#' },
      { label: 'Reportes', href: '#' },
      { label: 'Prensa', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Logo className="mb-4" />
            <p className="text-primary-foreground/80 text-sm max-w-xs">
              El portal oficial y hub digital para conectar y potenciar el ecosistema fintech de Costa Rica.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} aria-label={link['aria-label']} className="text-primary-foreground/80 hover:text-accent transition-colors">
                  <link.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-headline font-semibold mb-4">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Fintech Hub CR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
