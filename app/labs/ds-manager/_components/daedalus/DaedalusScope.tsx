'use client';

import { useMemo } from 'react';
import { toCssVars, type Mode } from '@/lib/labs/dsManager/tokens';
import { useStore } from '../Store';
import { cx } from '../ui';
import './daedalus.css';

/**
 * Renders children inside the Daedalus design system: every token in the
 * store becomes a --dae-* custom property on this wrapper, in the requested
 * mode. Token edits re-render every scope on the page.
 */
export default function DaedalusScope({ mode = 'light', className, children, style }: { mode?: Mode; className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const { db } = useStore();
  const vars = useMemo(() => toCssVars(db.tokens, mode), [db.tokens, mode]);
  return (
    <div className={cx('dae-scope', className)} style={{ ...(vars as React.CSSProperties), ...style }}>
      {children}
    </div>
  );
}
