'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, DeviceMobile, Lightbulb, Monitor, Moon, PlusCircle, Sparkle, Sun, Trash, Swap } from '@phosphor-icons/react';
import { findMatches } from '@/lib/labs/dsManager/match';
import { PATTERN_SIGNATURES } from '@/lib/labs/dsManager/intake';
import type { Mode } from '@/lib/labs/dsManager/tokens';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import DaedalusScope from '../../_components/daedalus/DaedalusScope';
import { DEMOS, defaultsFor, type Props } from '../../_components/daedalus/demos';
import { Button, LifecyclePill, PageHeader, Panel, Segmented, cx, inputClass } from '../../_components/ui';

interface Block {
  id: number;
  /** System item slug, or undefined for a custom (not-in-system) block. */
  slug?: string;
  customName?: string;
  props: Props;
}

let nextId = 1;
const block = (slug: string): Block => ({ id: nextId++, slug, props: defaultsFor(DEMOS[slug]) });

export default function Sandbox() {
  const { db, item } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const [blocks, setBlocks] = useState<Block[]>(() => {
    const add = params.get('add');
    return add && DEMOS[add] ? [block(add)] : [block('top-app-bar'), block('text-field'), block('button')];
  });
  const [selected, setSelected] = useState<number | null>(null);
  const [device, setDevice] = useState<'mobile' | 'web'>('mobile');
  const [mode, setMode] = useState<Mode>('light');
  const [paletteQ, setPaletteQ] = useState('');
  const [customName, setCustomName] = useState('');
  const [intent, setIntent] = useState('');

  const library = useMemo(() => db.items.filter((i) => DEMOS[i.slug] && i.lifecycle !== 'deprecated' && i.kind !== 'pattern'), [db.items]);
  const paletteMatches = paletteQ ? findMatches(paletteQ, library, { limit: 12, min: 0.15 }).map((m) => m.item) : library;
  const intentMatches = intent.trim().length > 2 ? findMatches(intent, db.items.filter((i) => i.lifecycle !== 'deprecated'), { limit: 4, min: 0.3 }) : [];

  const update = (id: number, fn: (b: Block) => Block) => setBlocks((bs) => bs.map((b) => (b.id === id ? fn(b) : b)));
  const move = (id: number, dir: -1 | 1) =>
    setBlocks((bs) => {
      const i = bs.findIndex((b) => b.id === id);
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const next = [...bs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const add = (slug: string) => {
    const b = block(slug);
    setBlocks((bs) => [...bs, b]);
    setSelected(b.id);
  };

  // Reuse insights: composed patterns, and custom blocks that already exist.
  const slugs = new Set(blocks.map((b) => b.slug).filter(Boolean) as string[]);
  const patternHits = PATTERN_SIGNATURES.filter((s) => s.needs.every((n) => slugs.has(n)));
  const customHits = blocks
    .filter((b) => b.customName)
    .map((b) => ({ block: b, match: findMatches(b.customName!, db.items.filter((i) => i.lifecycle !== 'deprecated'), { limit: 1, min: 0.35 })[0] }))
    .filter((x) => x.match);
  const custom = blocks.filter((b) => b.customName);

  const sel = blocks.find((b) => b.id === selected);
  const selDemo = sel?.slug ? DEMOS[sel.slug] : undefined;

  const toProposal = () => {
    const used = blocks.filter((b) => b.slug).map((b) => item(b.slug!)?.name);
    const novel = custom.map((b) => b.customName);
    const title = novel[0] ?? intent.trim() ?? '';
    // Components used are context for triage, not part of the problem statement
    // (naming them in the problem would make the duplicate check match them).
    const problem = [intent.trim(), novel.length ? `Needs something the system doesn't have: ${novel.join(', ')}.` : ''].filter(Boolean).join(' ');
    const q = new URLSearchParams({ from: 'sandbox', title, problem, kind: novel.length ? 'new-component' : 'new-pattern', with: used.join(', ') });
    router.push(`${BASE}/proposals/new?${q}`);
  };

  return (
    <>
      <PageHeader
        title="Sandbox"
        description="Compose with real Daedalus components. The sandbox points out when what you're building already exists, and turns genuine gaps into a pre-filled request."
        actions={
          <>
            <Segmented
              label="Device"
              value={device}
              onChange={setDevice}
              options={[
                { value: 'mobile', label: <><DeviceMobile size={14} /> Mobile</> },
                { value: 'web', label: <><Monitor size={14} /> Web</> },
              ]}
            />
            <Segmented
              label="Theme"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'light', label: <Sun size={14} aria-label="Light" /> },
                { value: 'dark', label: <Moon size={14} aria-label="Dark" /> },
              ]}
            />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[230px_1fr_290px]">
        {/* Palette */}
        <aside className="flex flex-col gap-3">
          <input value={paletteQ} onChange={(e) => setPaletteQ(e.target.value)} placeholder="Find a component" aria-label="Find a component" className={cx(inputClass, 'h-8 py-0 text-[12.5px]')} />
          <ul className="ks-scroll m-0 flex max-h-[260px] list-none flex-col gap-px overflow-y-auto rounded-lg border border-ks-border bg-ks-surface p-1 lg:max-h-[440px]">
            {paletteMatches.map((i) => (
              <li key={i.slug}>
                <button type="button" onClick={() => add(i.slug)} className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-[13px] hover:bg-ks-surface-2">
                  <span className="truncate">{i.name}</span>
                  <PlusCircle size={15} className="shrink-0 text-ks-fg-subtle" />
                </button>
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-dashed border-ks-border-strong p-3">
            <label htmlFor="custom" className="mb-1 block text-[12.5px] font-medium">
              Need something that isn&apos;t here?
            </label>
            <form
              className="flex gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!customName.trim()) return;
                const b: Block = { id: nextId++, customName: customName.trim(), props: {} };
                setBlocks((bs) => [...bs, b]);
                setSelected(b.id);
                setCustomName('');
              }}
            >
              <input id="custom" value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="e.g. Popup reminder" className={cx(inputClass, 'h-8 py-0 text-[12.5px]')} />
              <Button size="sm" type="submit" disabled={!customName.trim()}>
                Add
              </Button>
            </form>
          </div>
        </aside>

        {/* Canvas */}
        <div className="min-w-0">
          <div className="flex justify-center rounded-lg border border-ks-border bg-ks-sunken p-4 sm:p-6">
            <DaedalusScope
              mode={mode}
              className={cx('flex min-h-[460px] w-full flex-col overflow-hidden rounded-[20px] shadow-[var(--ks-shadow-pop)]', device === 'mobile' ? 'max-w-[390px]' : 'max-w-[880px] rounded-lg')}
            >
              {blocks.length === 0 ? (
                <div className="m-auto p-8 text-center text-[14px] opacity-60">Add components from the left.</div>
              ) : (
                blocks.map((b, idx) => {
                  const demo = b.slug ? DEMOS[b.slug] : undefined;
                  const isSel = b.id === selected;
                  const edge = b.slug === 'top-app-bar' || b.slug === 'bottom-navigation';
                  return (
                    <div key={b.id} className={cx('group relative', !edge && 'px-4 py-3', isSel && 'outline outline-2 -outline-offset-2 outline-[var(--ks-accent)]')} onClickCapture={() => setSelected(b.id)}>
                      {demo ? (
                        <div className={cx('flex', demo.layout === 'stretch' || edge ? 'justify-stretch [&>*]:w-full' : 'justify-start')}>{demo.render(b.props)}</div>
                      ) : (
                        <div className="flex min-h-[64px] items-center justify-center rounded-md border-2 border-dashed border-[var(--dae-color-border-default)] text-[13px] opacity-80">
                          {b.customName} <span className="ml-1 opacity-60">(not in system)</span>
                        </div>
                      )}
                      <div className={cx('absolute right-1 top-1 z-10 gap-0.5 rounded-md border border-ks-border bg-ks-surface p-0.5 font-[var(--ks-font-sans)] shadow-sm', isSel ? 'flex' : 'hidden group-hover:flex')}>
                        <button type="button" aria-label="Move up" disabled={idx === 0} onClick={() => move(b.id, -1)} className="rounded p-1 text-ks-fg-muted hover:bg-ks-surface-2 disabled:opacity-30">
                          <ArrowUp size={14} />
                        </button>
                        <button type="button" aria-label="Move down" disabled={idx === blocks.length - 1} onClick={() => move(b.id, 1)} className="rounded p-1 text-ks-fg-muted hover:bg-ks-surface-2 disabled:opacity-30">
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          aria-label="Remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            setBlocks((bs) => bs.filter((x) => x.id !== b.id));
                            setSelected(null);
                          }}
                          className="rounded p-1 text-ks-danger hover:bg-ks-danger-soft"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </DaedalusScope>
          </div>
          <p className="mt-2 text-center text-[12px] text-ks-fg-subtle">Components are live. Click one to edit its props; hover for move and remove.</p>
        </div>

        {/* Inspector + insights */}
        <aside className="flex flex-col gap-4">
          <Panel title={sel ? (sel.slug ? item(sel.slug)?.name : sel.customName) : 'Inspector'}>
            {!sel && <p className="m-0 text-[12.5px] text-ks-fg-muted">Select a component on the canvas.</p>}
            {sel && selDemo && (
              <div className="flex flex-col gap-2.5">
                {selDemo.controls.length === 0 && <p className="m-0 text-[12.5px] text-ks-fg-muted">No configurable props.</p>}
                {selDemo.controls.map((c) => (
                  <label key={c.name} className={cx('flex gap-1 text-[12px] text-ks-fg-muted', c.type === 'boolean' ? 'items-center justify-between' : 'flex-col')}>
                    <span className="font-ks-mono">{c.label ?? c.name}</span>
                    {c.type === 'select' && (
                      <select value={String(sel.props[c.name])} onChange={(e) => update(sel.id, (b) => ({ ...b, props: { ...b.props, [c.name]: e.target.value } }))} className="h-8 rounded-md border border-ks-border bg-ks-surface px-2 text-[13px] text-ks-fg">
                        {c.options!.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    )}
                    {(c.type === 'text' || c.type === 'number') && (
                      <input
                        type={c.type}
                        value={String(sel.props[c.name])}
                        onChange={(e) => update(sel.id, (b) => ({ ...b, props: { ...b.props, [c.name]: c.type === 'number' ? Number(e.target.value) : e.target.value } }))}
                        className={cx(inputClass, 'h-8 py-0 text-[13px]')}
                      />
                    )}
                    {c.type === 'boolean' && <input type="checkbox" checked={sel.props[c.name] === true} onChange={(e) => update(sel.id, (b) => ({ ...b, props: { ...b.props, [c.name]: e.target.checked } }))} className="h-4 w-4 accent-[var(--ks-accent)]" />}
                  </label>
                ))}
                {sel.slug && (
                  <a href={`${BASE}/components/${sel.slug}`} className="mt-1 text-[12px] text-ks-accent-text hover:underline">
                    Usage guidance →
                  </a>
                )}
              </div>
            )}
            {sel && !selDemo && <p className="m-0 text-[12.5px] text-ks-fg-muted">A placeholder for something the system doesn&apos;t have. Check the reuse panel before proposing it.</p>}
          </Panel>

          <Panel title={<span className="flex items-center gap-1.5"><Lightbulb size={15} weight="fill" className="text-ks-warning" /> Reuse check</span>}>
            {customHits.length === 0 && patternHits.length === 0 && <p className="m-0 text-[12.5px] text-ks-fg-muted">Nothing to flag. Everything on the canvas is in the system.</p>}
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[12.5px]">
              {customHits.map(({ block: b, match }) => (
                <li key={b.id} className="rounded-md bg-ks-warning-soft p-2.5">
                  <div className="text-ks-fg">
                    <strong>{b.customName}</strong> looks like <strong>{match.item.name}</strong> ({Math.round(match.score * 100)}%), which already exists.
                  </div>
                  {DEMOS[match.item.slug] && (
                    <Button size="sm" className="mt-2" onClick={() => update(b.id, () => ({ id: b.id, slug: match.item.slug, props: defaultsFor(DEMOS[match.item.slug]) }))}>
                      <Swap size={14} /> Swap in {match.item.name}
                    </Button>
                  )}
                </li>
              ))}
              {patternHits.map((s) => (
                <li key={s.pattern} className="rounded-md bg-ks-accent-soft p-2.5 text-ks-fg">
                  {s.message}{' '}
                  <a href={`${BASE}/components/${s.pattern}`} className="font-medium text-ks-accent-text hover:underline">
                    {item(s.pattern)?.name} →
                  </a>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Turn this into a request">
            <label htmlFor="intent" className="mb-1 block text-[12.5px] text-ks-fg-muted">
              What are you trying to build?
            </label>
            <textarea id="intent" rows={3} value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="e.g. a way to compare two providers side by side" className={cx(inputClass, 'text-[13px]')} />
            {intentMatches.length > 0 && (
              <div className="mt-2">
                <div className="mb-1 flex items-center gap-1 text-[11.5px] text-ks-fg-subtle">
                  <Sparkle size={12} /> Related in the system
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {intentMatches.map((m) => (
                    <button key={m.item.slug} type="button" onClick={() => DEMOS[m.item.slug] && add(m.item.slug)} className="inline-flex items-center gap-1 rounded-md border border-ks-border px-2 py-1 text-[12px] hover:border-ks-border-strong">
                      {m.item.name} <LifecyclePill lifecycle={m.item.lifecycle} />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button variant="primary" className="mt-3 w-full" disabled={!intent.trim() && custom.length === 0} onClick={toProposal}>
              Start a pre-filled request
            </Button>
            {customHits.length > 0 && <p className="m-0 mt-2 text-[11.5px] text-ks-warning">Resolve the reuse flags first — the request check will ask about them.</p>}
          </Panel>
        </aside>
      </div>
    </>
  );
}
