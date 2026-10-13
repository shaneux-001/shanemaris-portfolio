'use client';

import { useState } from 'react';
import { ArrowRight, Check, FigmaLogo, Info, Minus, Warning } from '@phosphor-icons/react';
import { codeConnectCompose, codeConnectReact, codeConnectSwift, figmaHealth, rowStatus, ROW_LABEL, type RowStatus } from '@/lib/labs/dsManager/figma';
import { lockedReason } from '@/lib/labs/dsManager/permissions';
import type { PropMapping } from '@/lib/labs/dsManager/types';
import { useStore } from './Store';
import CodeBlock from './CodeBlock';
import { Button, EmptyState, LockedNote, Panel, Pill, cx, formatDate, type Tone } from './ui';

export const ROW_TONE: Record<RowStatus, Tone> = { mapped: 'success', 'by-design': 'neutral', 'value-gap': 'warning', 'figma-only': 'danger', 'code-only': 'danger' };

function StatusIcon({ s }: { s: RowStatus }) {
  const cls = 'shrink-0';
  if (s === 'mapped') return <Check size={14} weight="bold" className={cx(cls, 'text-ks-success')} aria-hidden="true" />;
  if (s === 'by-design') return <Minus size={14} className={cx(cls, 'text-ks-fg-subtle')} aria-hidden="true" />;
  return <Warning size={14} weight="fill" className={cx(cls, 'text-ks-warning')} aria-hidden="true" />;
}

function Row({ r }: { r: PropMapping }) {
  const s = rowStatus(r);
  return (
    <tr className="border-b border-ks-border align-top last:border-0">
      <td className="px-4 py-3">
        {r.figmaProp ? (
          <>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-medium">{r.figmaProp}</span>
              <span className="rounded bg-ks-neutral-soft px-1 font-ks-mono text-[10px] text-ks-fg-subtle">{r.figmaType}</span>
            </div>
            {r.values && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {r.values.map(([f, c]) => (
                  <span key={f} className={cx('rounded px-1.5 py-0.5 text-[11.5px]', c === null && !r.intentional ? 'bg-ks-warning-soft text-ks-warning line-through decoration-1' : 'bg-ks-sunken text-ks-fg-muted')} title={c === null ? 'No code equivalent' : `→ ${c}`}>
                    {f}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <span className="text-[12.5px] text-ks-fg-subtle">Not in Figma</span>
        )}
      </td>
      <td className="w-8 px-1 py-3 text-ks-fg-subtle">
        <ArrowRight size={14} aria-hidden="true" />
      </td>
      <td className="px-4 py-3">
        {r.codeProp ? (
          <>
            <span className="font-ks-mono text-[12.5px] text-ks-accent-text">{r.codeProp}</span>
            {r.values && (
              <div className="mt-1.5 flex flex-wrap gap-1 font-ks-mono text-[11px] text-ks-fg-subtle">
                {r.values
                  .filter(([, c]) => c !== null)
                  .map(([, c]) => (
                    <span key={c}>{c}</span>
                  ))}
              </div>
            )}
          </>
        ) : (
          <span className="text-[12.5px] text-ks-fg-subtle">Not in code</span>
        )}
      </td>
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5">
          <StatusIcon s={s} />
          <Pill tone={ROW_TONE[s]}>{ROW_LABEL[s]}</Pill>
        </span>
        {r.note && <p className="m-0 mt-1.5 max-w-[40ch] text-[12px] text-ks-fg-muted">{r.note}</p>}
      </td>
    </tr>
  );
}

export default function FigmaMappingView({ slug }: { slug: string }) {
  const { db, item, can } = useStore();
  const [explain, setExplain] = useState(false);
  const it = item(slug)!;
  const h = figmaHealth(db).find((x) => x.item.slug === slug);
  const m = h?.mapping;

  if (!m) {
    return (
      <EmptyState
        title="Not connected to Figma"
        action={
          can('item.edit') ? (
            explain ? (
              // No backend: explain what this would do rather than pretend.
              <p role="status" className="m-0 max-w-[52ch] rounded-md bg-ks-accent-soft p-3 text-[12.5px] text-ks-fg">
                <strong className="text-ks-accent-text">Figma isn&apos;t connected in this demo.</strong> With a connection, this would read the {it.name} component&apos;s properties from the library, suggest a mapping from its code props, and open it here for review.
              </p>
            ) : (
              <Button onClick={() => setExplain(true)}>
                <FigmaLogo size={15} /> Start a mapping
              </Button>
            )
          ) : (
            <LockedNote>{lockedReason('item.edit')}</LockedNote>
          )
        }
      >
        {it.name} has no Code Connect mapping, so Dev Mode in Figma shows generic layer code instead of real {it.name} usage.
        {it.lifecycle === 'experimental' ? ' Normal for an experimental component.' : it.kind === 'product-component' ? ' Product components are mapped by their product team.' : ''}
      </EmptyState>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="col-span-2 rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="flex items-center gap-1.5 text-[12px] text-ks-fg-muted">
            <FigmaLogo size={13} /> Library component
          </div>
          <div className="mt-0.5 truncate font-medium">{m.nodeName}</div>
          <div className="font-ks-mono text-[11px] text-ks-fg-subtle">node {m.nodeId}</div>
        </div>
        <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="text-[12px] text-ks-fg-muted">Design instances</div>
          <div className="ks-tabular text-[20px] font-semibold">{m.figmaInstances.toLocaleString()}</div>
          <div className={cx('text-[12px]', m.detachRate > 0.1 ? 'font-medium text-ks-danger' : 'text-ks-fg-subtle')}>{(m.detachRate * 100).toFixed(1)}% detached</div>
        </div>
        <div className="rounded-lg border border-ks-border bg-ks-surface px-4 py-3">
          <div className="text-[12px] text-ks-fg-muted">Last synced</div>
          <div className="text-[15px] font-semibold">{formatDate(m.lastSynced, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
          {h.stale && <div className="text-[12px] font-medium text-ks-warning">Code changed since</div>}
        </div>
      </div>

      {m.detachRate > 0.1 && (
        <div className="flex gap-2 rounded-lg bg-ks-danger-soft p-3 text-[13px] text-ks-fg">
          <Info size={17} className="mt-0.5 shrink-0 text-ks-danger" />
          <span>
            <strong>High detach rate.</strong> More than 1 in 10 {it.name} instances in design files are detached — designers are working around the component. The mismatches below usually explain why.
          </span>
        </div>
      )}

      <Panel title={`Property mapping (${h.mapped} of ${m.props.length} aligned)`} bodyClassName="p-0">
        {m.props.length ? (
          <div className="ks-scroll relative overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[13px]">
              <thead className="border-b border-ks-border text-left text-[11.5px] text-ks-fg-subtle">
                <tr>
                  <th className="px-4 py-2 font-medium">Figma property</th>
                  <th className="w-8" aria-label="maps to" />
                  <th className="px-4 py-2 font-medium">Code prop</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {m.props.map((r) => (
                  <Row key={(r.figmaProp ?? '') + (r.codeProp ?? '')} r={r} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="m-0 p-4 text-[13px] text-ks-fg-muted">No configurable properties — the component maps one to one.</p>
        )}
      </Panel>

      <section>
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="m-0 text-[14px] font-semibold">Code Connect files</h3>
            <p className="m-0 text-[12.5px] text-ks-fg-muted">Generated from this mapping. Once published, Figma Dev Mode shows real {it.name} code for whatever the designer selected. Unmapped properties are listed at the top of each file.</p>
          </div>
        </div>
        <CodeBlock
          tabs={[
            { id: 'react', label: 'React', code: codeConnectReact(it, m), filename: `${it.name.replace(/\s/g, '')}.figma.tsx` },
            { id: 'swift', label: 'SwiftUI', code: codeConnectSwift(it, m), filename: `M${it.name.replace(/\s/g, '')}+Figma.swift` },
            { id: 'compose', label: 'Compose', code: codeConnectCompose(it, m), filename: `M${it.name.replace(/\s/g, '')}Doc.kt` },
          ]}
        />
      </section>
    </div>
  );
}
