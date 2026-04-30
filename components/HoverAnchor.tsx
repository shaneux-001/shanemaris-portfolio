'use client';

/**
 * Sibling of HoverLink, but for plain <a> elements (downloads, mailto:,
 * external URLs) where next/link is the wrong fit. Same hoverEffect
 * surface — pick one of 'opacity' | 'highlight' | 'underglow'.
 *
 * All effect colors come from CSS tokens in app/globals.css, so dark
 * mode (when toggled) flips them automatically.
 */

import { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';

type HoverEffect = 'opacity' | 'highlight' | 'underglow';

interface HoverAnchorProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> {
  hoverEffect?: HoverEffect;
  hoverOpacity?: number;
  style?: CSSProperties;
  children: ReactNode;
}

const highlightBase: CSSProperties = {
  backgroundImage:
    'linear-gradient(var(--accent-tint-15), var(--accent-tint-15))',
  backgroundSize: '100% 0%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left bottom',
  transition: 'background-size var(--motion-default) var(--ease-default)',
  borderRadius: '3px',
};

const underglowBase: CSSProperties = {
  transition:
    'box-shadow var(--motion-slow) var(--ease-default), transform var(--motion-default) var(--ease-default), background-color var(--motion-default) var(--ease-default)',
};

export default function HoverAnchor({
  style,
  hoverEffect = 'opacity',
  hoverOpacity = 0.75,
  children,
  ...rest
}: HoverAnchorProps) {
  const baseStyle: CSSProperties =
    hoverEffect === 'highlight'
      ? { ...highlightBase, ...style }
      : hoverEffect === 'underglow'
      ? { ...underglowBase, ...style }
      : { ...style };

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hoverEffect === 'opacity') {
      e.currentTarget.style.opacity = String(hoverOpacity);
    } else if (hoverEffect === 'highlight') {
      e.currentTarget.style.backgroundSize = '100% 100%';
    } else if (hoverEffect === 'underglow') {
      e.currentTarget.style.transform = 'translateY(-1px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-underglow-strong)';
    }
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hoverEffect === 'opacity') {
      e.currentTarget.style.opacity = '1';
    } else if (hoverEffect === 'highlight') {
      e.currentTarget.style.backgroundSize = '100% 0%';
    } else if (hoverEffect === 'underglow') {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  };

  return (
    <a
      {...rest}
      style={baseStyle}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  );
}
