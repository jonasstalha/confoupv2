import { ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} data-testid="link-logo">
      <div className="relative">
        <ShieldCheck className="h-8 w-8 text-ring" />
        <div className="absolute inset-0 bg-ring/20 blur-sm rounded-full" />
      </div>
      <span className="font-bold text-xl tracking-tight">
        Confo<span className="text-primary">UP</span>
      </span>
    </Link>
  );
}
