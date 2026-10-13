'use client';

import { migrationProgress } from '@/lib/labs/dsManager/metrics';
import type { MigrationGuide } from '@/lib/labs/dsManager/types';
import { cx } from './ui';

/** Stacked progress for one migration: done / in progress / not started, 2px surface gaps, labelled in text. */
export default function MigrationBar({ m }: { m: MigrationGuide }) {
  const p = migrationProgress(m);
  const seg = (n: number, cls: string, label: string) =>
    n > 0 && <span title={`${label}: ${n}`} className={cx('h-full first:rounded-l-[4px] last:rounded-r-[4px]', cls)} style={{ flex: `${n} 1 0` }} />;
  return (
    <div>
      <div className="flex h-2.5 gap-[2px]" role="img" aria-label={`${p.done} of ${p.total} products migrated, ${p.inProgress} in progress, ${p.notStarted} not started`}>
        {seg(p.done, 'bg-ks-accent', 'Migrated')}
        {seg(p.inProgress, 'bg-[color-mix(in_oklab,var(--ks-accent)_45%,var(--ks-surface))]', 'In progress')}
        {seg(p.notStarted, 'bg-ks-neutral-soft', 'Not started')}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 text-[11.5px] text-ks-fg-subtle">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-ks-accent" /> {p.done} migrated
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-[color-mix(in_oklab,var(--ks-accent)_45%,var(--ks-surface))]" /> {p.inProgress} in progress
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-sm bg-ks-neutral-soft" /> {p.notStarted} not started
        </span>
      </div>
    </div>
  );
}
