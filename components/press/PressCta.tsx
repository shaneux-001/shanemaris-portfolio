import Link from 'next/link';
import { ReactNode } from 'react';
import Ghost from './Ghost';

interface PressCtaProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent-outline';
  className?: string;
}

const VARIANT_CLASSES = {
  primary: 'pr-cta',
  secondary: 'pr-btn-secondary',
  'accent-outline': 'pr-btn-accent-outline',
} as const;

export default function PressCta({ href, children, variant = 'primary', className }: PressCtaProps) {
  const cls = VARIANT_CLASSES[variant];
  return (
    <Link href={href} className={`${cls} pr-hoverable${className ? ` ${className}` : ''}`}>
      <Ghost>{children}</Ghost>
    </Link>
  );
}
