'use client';

import { useMemo } from 'react';
import { toCssVars, type Mode } from '@/lib/labs/dsManager/tokens';
import { useStore } from '../Store';
import { cx } from '../ui';
import './meridian.css';

/**
 * Renders children inside the Meridian design system: every token in the
 * store becomes a --mer-* custom property on this wrapper, in the requested
 * mode. Token edits re-render every scope on the page.
 */
export default function MeridianScope({ mode = 'light', className, children, style }: { mode?: Mode; className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const { db } = useStore();
  const vars = useMemo(() => toCssVars(db.tokens, mode), [db.tokens, mode]);
  return (
    <div className={cx('mer-scope', className)} style={{ ...(vars as React.CSSProperties), ...style }}>
      {children}
    </div>
  );
}
