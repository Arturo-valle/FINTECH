import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Building2 className="h-7 w-7 text-accent" />
      {!iconOnly && (
        <span className="font-headline text-xl font-bold">
          Fintech Hub CR
        </span>
      )}
    </div>
  );
}
