import Link from 'next/link';
import { ReactNode } from 'react';
import Ghost from './Ghost';

interface PressCtaProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function PressCta({ href, children, variant = 'primary', className }: PressCtaProps) {
  const cls = variant === 'primary' ? 'pr-cta' : 'pr-btn-secondary';
  return (
    <Link href={href} className={`${cls} pr-hoverable${className ? ` ${className}` : ''}`}>
      <Ghost>{children}</Ghost>
    </Link>
  );
}
