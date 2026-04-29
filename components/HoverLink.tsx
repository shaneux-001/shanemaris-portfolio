'use client';

/**
 * Thin wrapper around next/link that adds an opacity hover effect.
 * Exists because onMouseEnter/onMouseLeave require a client component,
 * but the parent page can remain a server component.
 */

import Link from 'next/link';
import { CSSProperties, ReactNode } from 'react';

interface HoverLinkProps {
  href: string;
  style?: CSSProperties;
  hoverOpacity?: number;
  children: ReactNode;
}

export default function HoverLink({
  href,
  style,
  hoverOpacity = 0.75,
  children,
}: HoverLinkProps) {
  return (
    <Link
      href={href}
      style={style}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = String(hoverOpacity); }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
    >
      {children}
    </Link>
  );
}
