'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Ghost from './Ghost';

interface PressNavLinkProps {
  href: string;
  children: ReactNode;
}

export default function PressNavLink({ href, children }: PressNavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Link href={href} className="pr-nav-link pr-hoverable" data-active={active}>
      <Ghost>{children}</Ghost>
    </Link>
  );
}
