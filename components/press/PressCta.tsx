import Link from 'next/link';
import { ReactNode } from 'react';
import Ghost from './Ghost';

interface PressCtaProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

export default function PressCta({ href, children, variant = 'primary', style }: PressCtaProps) {
  const cls = variant === 'primary' ? 'pr-cta' : 'pr-btn-secondary';
  return (
    <Link href={href} className={`${cls} pr-hoverable`} style={style}>
      <Ghost>{children}</Ghost>
    </Link>
  );
}
