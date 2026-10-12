'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';
import { completeness } from '@/lib/labs/dsManager/metrics';
import type { ItemKind } from '@/lib/labs/dsManager/types';
import type { Mode } from '@/lib/labs/dsManager/tokens';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import MeridianScope from '../../_components/meridian/MeridianScope';
import { DEMOS, defaultsFor } from '../../_components/meridian/demos';
import { LifecyclePill, PageHeader, Segmented, ScoreCell, cx } from '../../_components/ui';

type Filter = 'component' | 'pattern' | 'product-component' | 'deprecated';

export default function Styleguide() {
  const { db } = useStore();
  const [filter, setFilter] = useState<Filter>('component');
  const [mode, setMode] = useState<Mode>('light');

  const groups = useMemo(() => {
    const list = db.items.filter((i) => (filter === 'deprecated' ? i.lifecycle === 'deprecated' : i.kind === (filter as ItemKind) && i.lifecycle !== 'deprecated'));
    const cats = Array.from(new Set(list.map((i) => i.category)));
    return cats.map((c) => ({ category: c, items: list.filter((i) => i.category === c) }));
  }, [db.items, filter]);

  return (
    <>
      <PageHeader
        title="Styleguide"
        description={`Living documentation for ${SYSTEM.name}. Every preview is the real component, rendered from the current token set.`}
        actions={
          <Segmented<Mode>
            label="Preview theme"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'light', label: <><Sun size={14} /> Light</> },
              { value: 'dark', label: <><Moon size={14} /> Dark</> },
            ]}
          />
        }
      />
      <div className="mb-6">
        <Segmented<Filter>
          label="Show"
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'component', label: 'Components' },
            { value: 'pattern', label: 'Patterns' },
            { value: 'product-component', label: 'Product components' },
            { value: 'deprecated', label: 'Deprecated' },
          ]}
        />
      </div>
      <div className="flex flex-col gap-8">
        {groups.map((g) => (
          <section key={g.category}>
            <h2 className="m-0 mb-3 text-[13px] font-semibold text-ks-fg-muted">{g.category}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {g.items.map((i) => {
                const demo = DEMOS[i.slug];
                return (
                  // Stretched-link card: the preview sits outside the <Link> (demos
                  // contain their own links/buttons, which can't nest inside an <a>).
                  <div key={i.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-ks-border bg-ks-surface transition-colors hover:border-ks-border-strong">
                    <MeridianScope mode={mode} className="relative flex h-[150px] items-center justify-center overflow-hidden border-b border-ks-border p-4">
                      <div inert aria-hidden="true" className="pointer-events-none flex w-full origin-center scale-[0.85] items-center justify-center">
                        {demo ? demo.render(defaultsFor(demo)) : <span className="text-[12px] opacity-60">No live demo — Figma only</span>}
                      </div>
                    </MeridianScope>
                    <div className="flex flex-col gap-1.5 px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <Link href={`${BASE}/components/${i.slug}`} className="font-medium text-ks-fg after:absolute after:inset-0 after:content-[''] group-hover:text-ks-accent-text">
                          {i.name}
                        </Link>
                        <LifecyclePill lifecycle={i.lifecycle} />
                      </div>
                      <p className={cx('m-0 line-clamp-2 text-[12.5px] text-ks-fg-muted')}>{i.description}</p>
                      <div className="mt-1">
                        <ScoreCell value={completeness(i).score} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
