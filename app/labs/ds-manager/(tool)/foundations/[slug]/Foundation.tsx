'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CheckCircle, Moon, Sun, WarningOctagon } from '@phosphor-icons/react';
import { contrastChecks, FOUNDATIONS, TYPE_ROLES } from '@/lib/labs/dsManager/foundations';
import { chain, rawValue, resolve, type Mode } from '@/lib/labs/dsManager/tokens';
import type { Token } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../../_components/Store';
import { BASE } from '../../../_components/Shell';
import DaedalusScope from '../../../_components/daedalus/DaedalusScope';
import { DEMOS, defaultsFor } from '../../../_components/daedalus/demos';
import { EmptyState, Panel, Pill, Segmented, cx } from '../../../_components/ui';

function useTokens() {
  const { db } = useStore();
  const map = useMemo(() => new Map(db.tokens.map((t) => [t.name, t])), [db.tokens]);
  return { tokens: db.tokens, map, val: (name: string, mode: Mode = 'light') => resolve(map, name, mode) };
}

const TokenName = ({ name }: { name: string }) => (
  <Link href={`${BASE}/tokens`} className="font-ks-mono text-[11.5px] text-ks-accent-text hover:underline">
    {name}
  </Link>
);

/** Components that reference any of these tokens, for "where it's used". */
function UsedBy({ names }: { names: string[] }) {
  const { db } = useStore();
  const users = db.items.filter((i) => i.tokens.some((t) => names.includes(t)));
  if (!users.length) return null;
  return (
    <p className="m-0 mt-3 text-[12.5px] text-ks-fg-muted">
      Used by{' '}
      {users.map((u, i) => (
        <span key={u.slug}>
          <Link href={`${BASE}/components/${u.slug}`} className="text-ks-accent-text hover:underline">
            {u.name}
          </Link>
          {i < users.length - 1 ? ', ' : ''}
        </span>
      ))}
    </p>
  );
}

// ── Color ───────────────────────────────────────────────────────

function Color() {
  const { tokens, map, val } = useTokens();
  const ramps = useMemo(() => {
    const groups = new Map<string, Token[]>();
    for (const t of tokens.filter((t) => t.tier === 'primitive' && t.type === 'color')) {
      const hue = t.name.split('.')[1];
      groups.set(hue, [...(groups.get(hue) ?? []), t]);
    }
    return [...groups.entries()];
  }, [tokens]);
  const semantic = tokens.filter((t) => t.tier === 'semantic' && t.type === 'color');
  const groups = Array.from(new Set(semantic.map((t) => t.name.split('.')[1])));
  const checks = contrastChecks(tokens);
  const failing = checks.filter((c) => !c.pass);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="m-0 mb-1 text-[16px] font-semibold">Palette</h2>
        <p className="m-0 mb-4 text-[13px] text-ks-fg-muted">Primitive ramps. Components never use these directly — they go through semantic roles, which is what lets a theme swap them.</p>
        <div className="flex flex-col gap-3">
          {ramps.map(([hue, steps]) => (
            <div key={hue} className="grid grid-cols-[80px_1fr] items-center gap-3">
              <span className="text-[13px] font-medium capitalize">{hue}</span>
              <div className="grid overflow-hidden rounded-md border border-ks-border" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
                {steps.map((t) => {
                  const v = rawValue(t, 'light');
                  return (
                    <div key={t.name} title={`${t.name} ${v}`} className="flex h-14 flex-col justify-end p-1.5" style={{ background: v }}>
                      <span className="font-ks-mono text-[10px]" style={{ color: (parseInt(v.slice(1, 3), 16) + parseInt(v.slice(3, 5), 16) + parseInt(v.slice(5, 7), 16)) / 3 > 150 ? '#151a22' : '#fff' }}>
                        {t.name.split('.')[2]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="m-0 mb-1 text-[16px] font-semibold">Semantic roles</h2>
        <p className="m-0 mb-4 text-[13px] text-ks-fg-muted">What components actually reference. Each role resolves to a different primitive per theme.</p>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {groups.map((g) => (
            <Panel key={g} title={<span className="capitalize">{g}</span>} bodyClassName="p-0">
              <table className="w-full border-collapse text-[12.5px]">
                <thead>
                  <tr className="text-left text-[11px] text-ks-fg-subtle">
                    <th className="px-4 py-2 font-medium">Role</th>
                    <th className="w-[72px] px-2 py-2 text-center font-medium">Light</th>
                    <th className="w-[72px] px-2 py-2 text-center font-medium">Dark</th>
                  </tr>
                </thead>
                <tbody>
                  {semantic
                    .filter((t) => t.name.split('.')[1] === g)
                    .map((t) => (
                      <tr key={t.name} className="border-t border-ks-border">
                        <td className="px-4 py-2">
                          <TokenName name={t.name} />
                          {t.description && <div className="text-[11.5px] text-ks-fg-subtle">{t.description}</div>}
                        </td>
                        {(['light', 'dark'] as Mode[]).map((m) => (
                          <td key={m} className="px-2 py-2">
                            <span title={`${chain(map, t.name, m).slice(1).join(' → ')} → ${val(t.name, m)}`} className="mx-auto block h-7 w-12 rounded border border-ks-border" style={{ background: val(t.name, m) }} />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </Panel>
          ))}
        </div>
      </section>

      <section id="contrast" className="scroll-mt-20">
        <h2 className="m-0 mb-1 text-[16px] font-semibold">Contrast</h2>
        <p className="m-0 mb-4 text-[13px] text-ks-fg-muted">
          Every pairing components rely on, checked against WCAG 2.2 AA in both themes: 4.5:1 for text, 3:1 for UI boundaries. Recomputed whenever a token changes.
        </p>
        {failing.length > 0 && (
          <div role="alert" className="mb-4 flex gap-2 rounded-lg bg-ks-danger-soft p-3 text-[13px] text-ks-danger">
            <WarningOctagon size={17} weight="fill" className="mt-0.5 shrink-0" />
            <span>
              {failing.length} check{failing.length > 1 ? 's' : ''} failing. Fix it in{' '}
              <Link href={`${BASE}/tokens`} className="font-medium underline">
                Tokens
              </Link>{' '}
              and this table re-scores.
            </span>
          </div>
        )}
        <div className="ks-scroll relative overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
          <table className="w-full min-w-[640px] border-collapse text-[12.5px]">
            <thead className="border-b border-ks-border text-left text-[11px] text-ks-fg-subtle">
              <tr>
                <th className="px-4 py-2 font-medium">Pairing</th>
                <th className="px-2 py-2 font-medium">Theme</th>
                <th className="px-2 py-2 font-medium">Sample</th>
                <th className="px-2 py-2 text-right font-medium">Ratio</th>
                <th className="px-4 py-2 font-medium">AA ({'≥'} min)</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((c) => (
                <tr key={c.label + c.mode} className="border-b border-ks-border last:border-0">
                  <td className="px-4 py-2">
                    {c.label}
                    <div className="font-ks-mono text-[11px] text-ks-fg-subtle">
                      {c.fg} / {c.bg}
                    </div>
                  </td>
                  <td className="px-2 py-2 capitalize text-ks-fg-muted">{c.mode}</td>
                  <td className="px-2 py-2">
                    <span className="inline-flex h-7 items-center gap-2 rounded px-2.5 font-medium" style={{ background: c.bgValue, color: c.fgValue, border: c.min === 3 ? `2px solid ${c.fgValue}` : undefined }}>
                      Aa
                    </span>
                  </td>
                  <td className="ks-tabular px-2 py-2 text-right">{c.ratio ? `${c.ratio.toFixed(2)}:1` : '—'}</td>
                  <td className="px-4 py-2">
                    {c.pass ? (
                      <span className="inline-flex items-center gap-1 text-ks-success">
                        <CheckCircle size={14} weight="fill" /> Pass
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-ks-danger">
                        <WarningOctagon size={14} weight="fill" /> Fail · needs {c.min}:1
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// ── Typography ──────────────────────────────────────────────────

function Typography() {
  const { val } = useTokens();
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Typeface">
        <DaedalusScope className="rounded-md p-5">
          <div style={{ fontSize: 44, fontWeight: 650, lineHeight: 1.1 }}>Figtree</div>
          <div className="mt-2" style={{ fontSize: 15, color: 'var(--dae-color-text-secondary)' }}>
            Aa Bb Cc Dd Ee Ff Gg 0123456789 — friendly, open, legible at small sizes.
          </div>
        </DaedalusScope>
        <p className="m-0 mt-3 text-[12.5px] text-ks-fg-muted">
          <TokenName name="font.family.sans" /> · Native apps fall back to the platform face (SF Pro, Roboto) for Dynamic Type and font scaling.
        </p>
      </Panel>
      <section>
        <h2 className="m-0 mb-3 text-[16px] font-semibold">Type roles</h2>
        <div className="overflow-hidden rounded-lg border border-ks-border">
          {TYPE_ROLES.map((r) => (
            <div key={r.name} className="grid grid-cols-1 gap-3 border-b border-ks-border bg-ks-surface p-4 last:border-0 md:grid-cols-[200px_1fr]">
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="mt-0.5 font-ks-mono text-[11.5px] text-ks-fg-subtle">
                  {val(r.size)} / {val(r.lineHeight)} / {val(r.weight)}
                </div>
                <div className="mt-1.5 text-[12px] text-ks-fg-muted">{r.usage}</div>
              </div>
              <DaedalusScope className="flex items-center rounded-md px-4 py-3">
                <span style={{ fontSize: `var(--dae-${r.size.replace(/\./g, '-')})`, fontWeight: `var(--dae-${r.weight.replace(/\./g, '-')})`, lineHeight: `var(--dae-${r.lineHeight.replace(/\./g, '-')})` }}>{r.sample}</span>
              </DaedalusScope>
            </div>
          ))}
        </div>
      </section>
      <Panel title="Rules">
        <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13px] text-ks-fg-muted">
          <li>Sentence case everywhere: titles, buttons, tabs.</li>
          <li>Body text never below 16px on mobile; Caption is for metadata only.</li>
          <li>Line length 45–80 characters for reading text.</li>
          <li>Support 200% text scaling without loss of content (WCAG 1.4.4).</li>
        </ul>
      </Panel>
    </div>
  );
}

// ── Spacing / radius / elevation / motion / icons ───────────────

function Spacing() {
  const { tokens, val } = useTokens();
  const scale = tokens.filter((t) => /^space\.\d+$/.test(t.name));
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Scale" bodyClassName="p-0">
        {scale.map((t) => (
          <div key={t.name} className="grid grid-cols-[110px_60px_1fr] items-center gap-3 border-b border-ks-border px-4 py-2 last:border-0">
            <TokenName name={t.name} />
            <span className="ks-tabular text-[12.5px] text-ks-fg-muted">{val(t.name)}</span>
            <span className="h-3 rounded-sm bg-ks-accent" style={{ width: val(t.name) === '0px' ? 1 : val(t.name) }} />
          </div>
        ))}
      </Panel>
      <Panel title="Control sizing">
        <p className="m-0 mb-3 text-[13px] text-ks-fg-muted">
          Buttons, inputs and selects share <TokenName name="space.control.height" /> ({val('space.control.height')}) and <TokenName name="space.control.x" /> ({val('space.control.x')}) so they align in a row. Touch targets stay at least 44pt on iOS and 48dp on Android regardless.
        </p>
        <DaedalusScope className="flex flex-wrap items-center gap-3 rounded-md p-5">
          {DEMOS['text-field'].render({ ...defaultsFor(DEMOS['text-field']), helperText: '', required: false, label: 'Search' })}
          {DEMOS.button.render(defaultsFor(DEMOS.button))}
        </DaedalusScope>
        <UsedBy names={['space.control.x', 'space.control.height']} />
      </Panel>
      <Panel title="Rules">
        <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13px] text-ks-fg-muted">
          <li>Everything sits on a 4px grid. Use the scale, not arbitrary values.</li>
          <li>Group related items with smaller gaps (8–12px), separate sections with larger ones (24–48px).</li>
          <li>Density modes are planned as tokens (see roadmap RM-108), not per-component props.</li>
        </ul>
      </Panel>
    </div>
  );
}

function Radius() {
  const { tokens, val } = useTokens();
  const list = tokens.filter((t) => t.name.startsWith('radius.') || t.name.endsWith('.radius'));
  return (
    <Panel title="Radius tokens">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-2 rounded-md bg-ks-sunken p-4 text-center">
            <span className="h-16 w-16 border-2 border-ks-accent bg-ks-accent-soft" style={{ borderRadius: val(t.name) }} />
            <TokenName name={t.name} />
            <span className="text-[11.5px] text-ks-fg-subtle">{val(t.name)}</span>
          </div>
        ))}
      </div>
      <UsedBy names={list.map((t) => t.name)} />
    </Panel>
  );
}

function Elevation() {
  const { tokens } = useTokens();
  const shadows = tokens.filter((t) => t.type === 'shadow');
  const [mode, setMode] = useState<Mode>('light');
  return (
    <Panel
      title="Shadow levels"
      actions={
        <Segmented<Mode>
          label="Theme"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'light', label: <Sun size={14} aria-label="Light" /> },
            { value: 'dark', label: <Moon size={14} aria-label="Dark" /> },
          ]}
        />
      }
    >
      <DaedalusScope mode={mode} className="grid grid-cols-1 gap-8 rounded-md p-8 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3">
          <div className="h-24 w-full rounded-lg border" style={{ borderColor: 'var(--dae-color-border-subtle)', background: 'var(--dae-color-surface-raised)' }} />
          <span className="text-[13px]">Flat · border only</span>
        </div>
        {shadows.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-3">
            <div className="h-24 w-full rounded-lg" style={{ background: 'var(--dae-color-surface-raised)', boxShadow: `var(--dae-${t.name.replace(/\./g, '-')})` }} />
            <span className="text-[13px]">{t.name}</span>
          </div>
        ))}
      </DaedalusScope>
      <p className="m-0 mt-3 text-[12.5px] text-ks-fg-muted">Two levels only: cards (resting) and overlays (modals, menus, toasts). Dark mode leans on surface color, not shadow, to show depth.</p>
      <UsedBy names={shadows.map((t) => t.name)} />
    </Panel>
  );
}

function Motion() {
  const { tokens, val } = useTokens();
  const durations = tokens.filter((t) => t.type === 'duration');
  const [run, setRun] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <Panel title="Durations" actions={<button type="button" onClick={() => setRun((r) => r + 1)} className="text-[12.5px] text-ks-accent-text hover:underline">Replay</button>}>
        <div className="flex flex-col gap-4">
          {durations
            .filter((t) => parseInt(val(t.name)) < 1000)
            .map((t) => (
              <div key={t.name + run} className="grid grid-cols-[130px_60px_1fr] items-center gap-3">
                <TokenName name={t.name} />
                <span className="text-[12.5px] text-ks-fg-muted">{val(t.name)}</span>
                <span className="relative h-2 rounded-full bg-ks-neutral-soft">
                  <span className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-ks-accent" style={{ animation: `ks-slide ${val(t.name)} ease-out forwards` }} />
                </span>
              </div>
            ))}
        </div>
        <style>{`@keyframes ks-slide { from { left: 0 } to { left: calc(100% - 16px) } }`}</style>
      </Panel>
      <Panel title="Rules">
        <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13px] text-ks-fg-muted">
          <li>Fast (120ms) for state changes: hover, toggles, checkboxes. Base (200ms) for things entering or leaving.</li>
          <li>Motion explains a change; it never decorates. No looping animation except loading indicators.</li>
          <li>Honor reduced motion: transitions collapse to instant and shimmer stops (Skeleton does this on iOS as of 26.20).</li>
          <li>
            <TokenName name="duration.toast" /> ({val('duration.toast')}) is a reading time, not an animation — long enough to catch an Undo.
          </li>
        </ul>
      </Panel>
    </div>
  );
}

function Iconography() {
  const { item } = useStore();
  const icon = item('icon');
  return (
    <div className="flex flex-col gap-6">
      <Panel title={`${SYSTEM.name} icon set`}>
        <DaedalusScope className="rounded-md p-6">{DEMOS.icon.render({})}</DaedalusScope>
        <p className="m-0 mt-3 text-[13px] text-ks-fg-muted">
          {icon?.description}{' '}
          <Link href={`${BASE}/components/icon`} className="text-ks-accent-text hover:underline">
            Icon component docs
          </Link>
        </p>
      </Panel>
      <Panel title="Rules">
        <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13px] text-ks-fg-muted">
          <li>24px grid, 2px stroke; 16px and 20px sizes for dense UI only.</li>
          <li>Icons inherit text color (<TokenName name="color.icon.default" />). Never color an icon to carry meaning alone.</li>
          <li>Decorative icons are hidden from assistive tech; standalone icons (Icon Button) require a label.</li>
          <li>Need a new icon? Request it — one-off SVGs drift from the set within a release.</li>
        </ul>
      </Panel>
    </div>
  );
}

const VIEWS: Record<string, () => React.ReactNode> = { color: Color, typography: Typography, spacing: Spacing, radius: Radius, elevation: Elevation, motion: Motion, iconography: Iconography };

export default function Foundation({ slug }: { slug: string }) {
  const meta = FOUNDATIONS.find((f) => f.slug === slug);
  const View = VIEWS[slug];
  if (!meta || !View) return <EmptyState title="Not a foundation">Nothing is documented at this address.</EmptyState>;
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2 text-[12.5px] text-ks-fg-subtle">
        <Link href={`${BASE}/components`} className="hover:text-ks-fg">
          Styleguide
        </Link>{' '}
        / Foundations
      </nav>
      <header className="mb-5">
        <h1 className="m-0 flex items-center gap-2 text-[26px] font-semibold tracking-[-0.02em]">
          {meta.name} <Pill>Foundation</Pill>
        </h1>
        <p className="m-0 mt-1 max-w-[70ch] text-[14px] text-ks-fg-muted">{meta.description}</p>
      </header>
      <nav aria-label="Foundations" className="ks-scroll mb-6 flex gap-1 overflow-x-auto border-b border-ks-border">
        {FOUNDATIONS.map((f) => (
          <Link key={f.slug} href={`${BASE}/foundations/${f.slug}`} aria-current={f.slug === slug ? 'page' : undefined} className={cx('-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-[13.5px] font-medium', f.slug === slug ? 'border-ks-accent text-ks-fg' : 'border-transparent text-ks-fg-subtle hover:text-ks-fg')}>
            {f.name}
          </Link>
        ))}
      </nav>
      <View />
    </>
  );
}
