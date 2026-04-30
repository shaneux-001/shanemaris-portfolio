'use client';

/**
 * Header / nav link with icon. Mirrors the kit's nav-link-icon pattern:
 * muted color by default, shifts to accent on hover. No background sweep,
 * no transform — kept distinct from inline body text links (highlight)
 * and CTA buttons (underglow).
 *
 * Lives as a client component because the hover handler needs to run in
 * the browser; the parent header in app/layout.tsx stays server-rendered.
 *
 * NOTE on the icon prop: we accept a string key (not a component reference)
 * because the parent layout is a server component, and passing a Phosphor
 * forwardRef component across the RSC boundary fails — neither the /ssr
 * icons (no 'use client' marker → not serializable as a prop) nor the main
 * package (uses createContext → can't be imported by a server component)
 * works. Importing the icons HERE, inside the client component, sidesteps
 * both constraints.
 */

import Link from 'next/link';
import {
  Briefcase,
  User,
  Envelope,
  House,
  type Icon,
} from '@phosphor-icons/react';
import { CSSProperties, ReactNode } from 'react';

const ICONS = {
  briefcase: Briefcase,
  user: User,
  envelope: Envelope,
  house: House,
} satisfies Record<string, Icon>;

export type NavIconKey = keyof typeof ICONS;

interface NavLinkProps {
  href: string;
  icon?: NavIconKey;
  children: ReactNode;
  /** Optional weight override for the icon — defaults to 'regular'. */
  iconWeight?: 'regular' | 'duotone' | 'fill' | 'bold' | 'thin' | 'light';
  /** Optional style overrides merged onto the link. */
  style?: CSSProperties;
}

export default function NavLink({
  href,
  icon,
  iconWeight = 'regular',
  children,
  style,
}: NavLinkProps) {
  const IconComp = icon ? ICONS[icon] : null;

  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '0.875rem',
        color: 'var(--color-muted)',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        transition: 'color var(--motion-fast) var(--ease-default)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--color-muted)';
      }}
    >
      {IconComp && <IconComp size={16} weight={iconWeight} />}
      {children}
    </Link>
  );
}
