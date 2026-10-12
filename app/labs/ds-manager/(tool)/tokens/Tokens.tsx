'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, FigmaLogo, MagnifyingGlass, Robot } from '@phosphor-icons/react';
import { chain, dependents, isRef, rawValue, resolve, type Mode } from '@/lib/labs/dsManager/tokens';
import { toAgentSpec, toCSS, toDTCG, toFigmaVariables, toKotlin, toSCSS, toSwift } from '@/lib/labs/dsManager/exporters';
import type { Token, TokenTier } from '@/lib/labs/dsManager/types';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import MeridianScope from '../../_components/meridian/MeridianScope';
import { DEMOS, defaultsFor } from '../../_components/meridian/demos';
import CodeBlock from '../../_components/CodeBlock';
import { Button, Drawer, PageHeader, Panel, Pill, Segmented, SelectFilter, cx, inputClass } from '../../_components/ui';

type View = 'browse' | 'export';

function Swatch({ value, size = 22 }: { value: string; size?: number }) {
  if (!value.startsWith('#') && !value.startsWith('rgb')) return null;
  return <span className="inline-block shrink-0 rounded border border-ks-border" style={{ width: size, height: size, background: value }} />;
}

function ValueCell({ token, mode, map }: { token: Token; mode: Mode; map: Map<string, Token> }) {
  const raw = rawValue(token, mode);
  const resolved = resolve(map, token.name, mode);
  return (
    <span className="flex min-w-0 items-center gap-2">
      {token.type === 'color' && <Swatch value={resolved} />}
      <span className="min-w-0">
        <span className={cx('block truncate font-ks-mono text-[12px]', isRef(raw) ? 'text-ks-accent-text' : 'text-ks-fg')}>{raw}</span>
        {isRef(raw) && <span className="block truncate font-ks-mono text-[11px] text-ks-fg-subtle">{resolved}</span>}
      </span>
    </span>
  );
}

/** Edit one mode's value: a reference picker plus a literal input (with a color picker for colors). */
function ModeEditor({ token, mode, value, onChange, map, tokens }: { token: Token; mode: Mode; value: string; onChange: (v: string) => void; map: Map<string, Token>; tokens: Token[] }) {
  const candidates = tokens.filter((t) => t.type === token.type && t.name !== token.name && (token.tier === 'primitive' ? false : t.tier === 'primitive' || (token.tier === 'component' && t.tier === 'semantic')));
  const resolved = isRef(value) ? resolve(map, value.slice(1, -1), mode) : value;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[12px] font-medium capitalize text-ks-fg-muted">{typeof token.value === 'string' ? 'Value' : `${mode} mode`}</div>
      {candidates.length > 0 && (
        <select value={isRef(value) ? value : ''} onChange={(e) => e.target.value && onChange(e.target.value)} className="h-8 rounded-md border border-ks-border bg-ks-surface px-2 font-ks-mono text-[12px]">
          <option value="">Literal value…</option>
          {candidates.map((c) => (
            <option key={c.name} value={`{${c.name}}`}>
              {`{${c.name}}`} — {resolve(map, c.name, mode)}
            </option>
          ))}
        </select>
      )}
      <div className="flex items-center gap-2">
        {token.type === 'color' && resolved.startsWith('#') && (
          <input type="color" aria-label={`${mode} color`} value={resolved.length === 7 ? resolved : '#000000'} onChange={(e) => onChange(e.target.value)} className="h-8 w-10 cursor-pointer rounded border border-ks-border bg-transparent" />
        )}
        <input value={value} onChange={(e) => onChange(e.target.value)} className={cx(inputClass, 'h-8 py-0 font-ks-mono text-[12px]')} aria-label={`${mode} value`} />
      </div>
    </div>
  );
}

function TokenEditor({ name, onClose }: { name: string; onClose: () => void }) {
  const { db, run } = useStore();
  const map = useMemo(() => new Map(db.tokens.map((t) => [t.name, t])), [db.tokens]);
  const token = map.get(name)!;
  const [draft, setDraft] = useState<Token['value']>(token.value);
  const [saved, setSaved] = useState(false);

  // Blast radius: tokens that reference this one, and components whose token list includes it or a dependent.
  const deps = dependents(db.tokens, name);
  const affectedNames = new Set([name, ...deps.map((d) => d.name), ...deps.flatMap((d) => dependents(db.tokens, d.name).map((x) => x.name))]);
  const affectedItems = db.items.filter((i) => i.tokens.some((t) => affectedNames.has(t)) && DEMOS[i.slug]);

  // Preview the draft without saving: an overridden token list fed to a local scope.
  const previewTokens = db.tokens.map((t) => (t.name === name ? { ...t, value: draft } : t));
  const changed = JSON.stringify(draft) !== JSON.stringify(token.value);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <Pill>{token.tier}</Pill>
          <Pill>{token.type}</Pill>
          {typeof token.value !== 'string' && <Pill tone="accent">themed</Pill>}
        </div>
        {token.description && <p className="m-0 text-[13px] text-ks-fg-muted">{token.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {typeof draft === 'string' ? (
          <ModeEditor token={token} mode="light" value={draft} onChange={(v) => setDraft(v)} map={map} tokens={db.tokens} />
        ) : (
          (['light', 'dark'] as Mode[]).map((m) => <ModeEditor key={m} token={token} mode={m} value={draft[m]} onChange={(v) => setDraft({ ...(draft as { light: string; dark: string }), [m]: v })} map={map} tokens={db.tokens} />)
        )}
      </div>

      <div>
        <div className="mb-2 text-[12.5px] font-medium">Resolves through</div>
        <div className="flex flex-wrap items-center gap-1 font-ks-mono text-[11.5px]">
          {chain(map, name, 'light').map((c, i, arr) => (
            <span key={c} className="flex items-center gap-1">
              <span className="rounded bg-ks-sunken px-1.5 py-0.5">{c}</span>
              {i < arr.length - 1 && <ArrowRight size={11} className="text-ks-fg-subtle" />}
            </span>
          ))}
          <ArrowRight size={11} className="text-ks-fg-subtle" />
          <span className="rounded bg-ks-accent-soft px-1.5 py-0.5 text-ks-accent-text">{resolve(map, name, 'light')}</span>
        </div>
      </div>

      <div>
        <div className="mb-2 text-[12.5px] font-medium">
          Blast radius: {deps.length} token{deps.length === 1 ? '' : 's'}, {db.items.filter((i) => i.tokens.some((t) => affectedNames.has(t))).length} component{affectedItems.length === 1 ? '' : 's'}
        </div>
        {deps.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {deps.map((d) => (
              <span key={d.name} className="rounded bg-ks-sunken px-1.5 py-0.5 font-ks-mono text-[11px] text-ks-fg-muted">
                {d.name}
              </span>
            ))}
          </div>
        )}
        {affectedItems.length > 0 && (
          <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-ks-border">
            {(['light', 'dark'] as Mode[]).map((m) => (
              <PreviewScope key={m} mode={m} tokens={previewTokens}>
                <div inert className="flex flex-col items-center gap-3 p-4">
                  {affectedItems.slice(0, 3).map((i) => (
                    <div key={i.slug} className="flex w-full scale-90 justify-center">
                      {DEMOS[i.slug].render(defaultsFor(DEMOS[i.slug]))}
                    </div>
                  ))}
                </div>
              </PreviewScope>
            ))}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 -mx-5 -mb-5 flex items-center justify-between gap-2 border-t border-ks-border bg-ks-surface px-5 py-3">
        <span className="text-[12px] text-ks-fg-subtle" aria-live="polite">
          {saved ? 'Saved. Logged to the changelog.' : changed ? 'Previewing unsaved change' : 'No changes'}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button size="sm" variant="ghost" disabled={!changed} onClick={() => setDraft(token.value)}>
            Revert
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={!changed}
            onClick={async () => {
              await run((r) => r.updateToken(name, draft));
              setSaved(true);
            }}
          >
            Save token
          </Button>
        </div>
      </div>
    </div>
  );
}

/** A Meridian scope fed an explicit token list (for previewing unsaved edits). */
function PreviewScope({ mode, tokens, children }: { mode: Mode; tokens: Token[]; children: React.ReactNode }) {
  const map = new Map(tokens.map((t) => [t.name, t]));
  const vars = Object.fromEntries(tokens.map((t) => [`--mer-${t.name.replace(/\./g, '-')}`, resolve(map, t.name, mode)]));
  return (
    <MeridianScope mode={mode} style={vars as React.CSSProperties}>
      {children}
    </MeridianScope>
  );
}

function Exports() {
  const { db } = useStore();
  const [mode, setMode] = useState<Mode>('light');
  const [figmaNote, setFigmaNote] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Panel>
          <FigmaLogo size={22} className="mb-2 text-ks-fg-muted" />
          <div className="font-medium">Figma Variables</div>
          <p className="m-0 mt-1 text-[12.5px] text-ks-fg-muted">Three collections (Primitive, Semantic with Light/Dark modes, Component), references kept as aliases.</p>
          <Button size="sm" className="mt-3" onClick={() => setFigmaNote(true)}>
            Push to Figma…
          </Button>
        </Panel>
        <Panel>
          <div className="mb-2 font-ks-mono text-[18px] text-ks-fg-muted">{'{ }'}</div>
          <div className="font-medium">Deployable tokens</div>
          <p className="m-0 mt-1 text-[12.5px] text-ks-fg-muted">W3C DTCG JSON for Style Dictionary pipelines, plus ready-made CSS, SCSS, Swift and Kotlin.</p>
        </Panel>
        <Panel>
          <Robot size={22} className="mb-2 text-ks-fg-muted" />
          <div className="font-medium">Agent spec</div>
          <p className="m-0 mt-1 text-[12.5px] text-ks-fg-muted">One Markdown file with rules, components, patterns and resolved tokens, so an AI coding tool can build on-system prototypes.</p>
        </Panel>
      </div>

      {figmaNote && (
        <div role="status" className="rounded-lg border border-ks-border bg-ks-accent-soft p-4 text-[13px]">
          <strong className="text-ks-accent-text">Backend not connected.</strong>{' '}
          <span className="text-ks-fg-muted">
            With a Figma connection this would call the Variables REST API to upsert {db.tokens.length} variables into the {SYSTEM.name} library and report a diff before publishing. For now, download the Figma Variables JSON below and import it with a variables import plugin.
          </span>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <h2 className="m-0 text-[15px] font-semibold">Generated files</h2>
        <Segmented<Mode>
          label="Agent spec mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
        />
      </div>
      <CodeBlock
        maxHeight={520}
        tabs={[
          { id: 'agent', label: 'AGENTS.md', code: toAgentSpec(db, mode), filename: 'AGENTS.md' },
          { id: 'figma', label: 'Figma Variables', code: toFigmaVariables(db.tokens), filename: 'meridian.figma-variables.json' },
          { id: 'dtcg', label: 'DTCG JSON', code: toDTCG(db.tokens), filename: 'meridian.tokens.json' },
          { id: 'css', label: 'CSS', code: toCSS(db.tokens), filename: 'meridian.css' },
          { id: 'scss', label: 'SCSS', code: toSCSS(db.tokens), filename: '_meridian.scss' },
          { id: 'swift', label: 'Swift', code: toSwift(db.tokens), filename: 'MeridianTokens.swift' },
          { id: 'kotlin', label: 'Kotlin', code: toKotlin(db.tokens), filename: 'MeridianTokens.kt' },
        ]}
      />
    </div>
  );
}

export default function Tokens() {
  const { db } = useStore();
  const [view, setView] = useState<View>('browse');
  const [tier, setTier] = useState<TokenTier>('semantic');
  const [type, setType] = useState('all');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const map = useMemo(() => new Map(db.tokens.map((t) => [t.name, t])), [db.tokens]);

  const usage = useMemo(() => {
    const u = new Map<string, number>();
    for (const i of db.items) for (const t of i.tokens) u.set(t, (u.get(t) ?? 0) + 1);
    return u;
  }, [db.items]);

  const rows = db.tokens.filter((t) => t.tier === tier && (type === 'all' || t.type === type) && (!q || t.name.includes(q.toLowerCase())));
  const types = Array.from(new Set(db.tokens.filter((t) => t.tier === tier).map((t) => t.type)));

  return (
    <>
      <PageHeader
        title="Tokens"
        description={`${db.tokens.length} tokens in three tiers. Components reference semantic tokens only, which is what makes themes and density modes possible. Edit a token and every live demo updates.`}
        actions={
          <Segmented<View>
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: 'browse', label: 'Browse & edit' },
              { value: 'export', label: 'Export' },
            ]}
          />
        }
      />

      {view === 'export' ? (
        <Exports />
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Segmented<TokenTier>
              label="Tier"
              value={tier}
              onChange={(t) => {
                setTier(t);
                setType('all');
              }}
              options={(['primitive', 'semantic', 'component'] as TokenTier[]).map((t) => ({
                value: t,
                label: (
                  <>
                    {t[0].toUpperCase() + t.slice(1)} <span className="text-ks-fg-subtle">{db.tokens.filter((x) => x.tier === t).length}</span>
                  </>
                ),
              }))}
            />
            <SelectFilter label="Type" value={type} onChange={setType} options={[{ value: 'all', label: 'All types' }, ...types.map((t) => ({ value: t, label: t }))]} />
            <label className="relative min-w-[200px] flex-1 sm:max-w-[260px]">
              <span className="sr-only">Filter tokens</span>
              <MagnifyingGlass size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ks-fg-subtle" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by name" className={cx(inputClass, 'h-8 py-0 pl-8 text-[12.5px]')} />
            </label>
          </div>

          <div className="ks-scroll overflow-x-auto rounded-lg border border-ks-border bg-ks-surface">
            <table className="w-full min-w-[820px] border-collapse text-[13px]">
              <thead className="border-b border-ks-border bg-ks-surface-2/60 text-left text-[11.5px] text-ks-fg-subtle">
                <tr>
                  <th className="px-3 py-2 font-medium">Token</th>
                  <th className="px-3 py-2 font-medium">{tier === 'semantic' ? 'Light' : 'Value'}</th>
                  {tier === 'semantic' && <th className="px-3 py-2 font-medium">Dark</th>}
                  <th className="px-3 py-2 font-medium">Used by</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.name} onClick={() => setEditing(t.name)} className="cursor-pointer border-b border-ks-border last:border-0 hover:bg-ks-surface-2">
                    <td className="px-3 py-2">
                      <button type="button" onClick={() => setEditing(t.name)} className="font-ks-mono text-[12.5px] text-ks-fg">
                        {t.name}
                      </button>
                    </td>
                    <td className="max-w-[240px] px-3 py-2">
                      <ValueCell token={t} mode="light" map={map} />
                    </td>
                    {tier === 'semantic' && (
                      <td className="max-w-[240px] px-3 py-2">
                        <ValueCell token={t} mode="dark" map={map} />
                      </td>
                    )}
                    <td className="ks-tabular px-3 py-2 text-ks-fg-muted">{usage.get(t.name) ? `${usage.get(t.name)} components` : tier === 'primitive' ? `${dependents(db.tokens, t.name).length} tokens` : '—'}</td>
                    <td className="px-3 py-2 text-[12.5px] text-ks-fg-muted">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-ks-fg-subtle">
            Try it: open <button type="button" className="font-ks-mono text-ks-accent-text hover:underline" onClick={() => setEditing('color.action.primary.bg')}>color.action.primary.bg</button>, pick a new color, save, then visit the{' '}
            <Link href={`${BASE}/components`} className="text-ks-accent-text hover:underline">
              styleguide
            </Link>
            .
          </p>
        </>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title={<span className="font-ks-mono text-[14px]">{editing}</span>} width={600}>
        {editing && <TokenEditor key={editing} name={editing} onClose={() => setEditing(null)} />}
      </Drawer>
    </>
  );
}
