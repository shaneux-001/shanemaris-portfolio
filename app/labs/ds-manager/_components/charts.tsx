'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from '@phosphor-icons/react';
import { cx } from './ui';

/*
 * Single-series charts only (a series' title names it, so no legend box).
 * Line 2px, area wash ~10%, end marker ≥8px with a 2px surface ring,
 * hairline recessive gridlines, values in text tokens — never series color.
 */

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

/** Sparkline: de-emphasized line, current point in the accent. Decorative — the tile carries the number. */
export function Sparkline({ values, width = 84, height = 26, className }: { values: number[]; width?: number; height?: number; className?: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 4;
  const x = (i: number) => pad + (i / (values.length - 1)) * (width - pad * 2);
  const y = (v: number) => (max === min ? height / 2 : pad + (1 - (v - min) / (max - min)) * (height - pad * 2));
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const last = values.length - 1;
  return (
    <svg width={width} height={height} aria-hidden="true" className={cx('overflow-visible', className)}>
      <path d={d} fill="none" stroke="var(--ks-fg-subtle)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" opacity={0.7} />
      <circle cx={x(last)} cy={y(values[last])} r={3.5} fill="var(--ks-accent)" stroke="var(--ks-surface)" strokeWidth={2} />
    </svg>
  );
}

/** Signed change vs. the previous period. Color = direction × whether up is good; an arrow carries direction without color. */
export function Delta({ values, goodWhen = 'up', suffix = '', period = 'vs last sprint' }: { values: number[]; goodWhen?: 'up' | 'down'; suffix?: string; period?: string }) {
  if (values.length < 2) return null;
  const diff = values[values.length - 1] - values[values.length - 2];
  const good = diff === 0 ? null : goodWhen === 'up' ? diff > 0 : diff < 0;
  const Icon = diff > 0 ? ArrowUpRight : diff < 0 ? ArrowDownRight : Minus;
  return (
    <span className={cx('inline-flex items-center gap-0.5 whitespace-nowrap text-[12px] font-medium', good === null ? 'text-ks-fg-subtle' : good ? 'text-ks-success' : 'text-ks-danger')}>
      <Icon size={12} weight="bold" aria-hidden="true" />
      <span className="ks-tabular">
        {diff > 0 ? '+' : ''}
        {diff}
        {suffix}
      </span>
      <span className="font-normal text-ks-fg-subtle">{period}</span>
    </span>
  );
}

function niceTicks(min: number, max: number, count = 3): number[] {
  if (max === min) return [min];
  const span = max - min;
  const step0 = span / count;
  const mag = 10 ** Math.floor(Math.log10(step0));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) ?? step0;
  const lo = Math.floor(min / step) * step;
  const ticks = [];
  for (let v = lo; v <= max + step * 0.001; v += step) ticks.push(Math.round(v * 100) / 100);
  if (ticks[ticks.length - 1] < max) ticks.push(ticks[ticks.length - 1] + step);
  return ticks;
}

/**
 * Line chart for one series over sprints, with a hover/focus crosshair and
 * tooltip. Arrow keys move between points when focused.
 */
export function LineChart({ values, labels, label, height = 180, format = (v: number) => v.toLocaleString(), zeroBased = true }: { values: number[]; labels: string[]; label: string; height?: number; format?: (v: number) => string; zeroBased?: boolean }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const padL = 44;
  const padR = 16;
  const padT = 12;
  const padB = 26;
  const ticks = niceTicks(zeroBased ? 0 : Math.min(...values), Math.max(...values, 1));
  const lo = ticks[0];
  const hi = ticks[ticks.length - 1];
  const x = (i: number) => padL + (values.length < 2 ? 0 : (i / (values.length - 1)) * (width - padL - padR));
  const y = (v: number) => padT + (1 - (v - lo) / (hi - lo || 1)) * (height - padT - padB);
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const area = `${line} L${x(values.length - 1)},${y(lo)} L${x(0)},${y(lo)} Z`;
  const last = values.length - 1;
  const active = hover ?? null;

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={`${label}: ${values.map((v, i) => `${labels[i]} ${format(v)}`).join(', ')}`}
          tabIndex={0}
          className="block focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--ks-accent)]"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - r.left;
            const i = Math.round(((px - padL) / (width - padL - padR)) * (values.length - 1));
            setHover(Math.max(0, Math.min(values.length - 1, i)));
          }}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover(last)}
          onBlur={() => setHover(null)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? last) - 1));
            if (e.key === 'ArrowRight') setHover((h) => Math.min(last, (h ?? last) + 1));
          }}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke="var(--ks-border)" strokeWidth={1} />
              <text x={padL - 8} y={y(t)} dy="0.35em" textAnchor="end" fontSize={11} fill="var(--ks-fg-subtle)" className="ks-tabular">
                {format(t)}
              </text>
            </g>
          ))}
          {labels.map((l, i) => (
            <text key={l} x={x(i)} y={height - 6} textAnchor="middle" fontSize={11} fill="var(--ks-fg-subtle)">
              {l}
            </text>
          ))}
          <path d={area} fill="var(--ks-accent)" opacity={0.1} />
          <path d={line} fill="none" stroke="var(--ks-accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {active !== null && <line x1={x(active)} x2={x(active)} y1={padT} y2={height - padB} stroke="var(--ks-fg-subtle)" strokeWidth={1} />}
          <circle cx={x(active ?? last)} cy={y(values[active ?? last])} r={4.5} fill="var(--ks-accent)" stroke="var(--ks-surface)" strokeWidth={2} />
          {active === null && (
            <text x={x(last) - 8} y={y(values[last]) - 10} textAnchor="end" fontSize={12} fontWeight={600} fill="var(--ks-fg)" className="ks-tabular">
              {format(values[last])}
            </text>
          )}
        </svg>
      )}
      {active !== null && width > 0 && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-ks-border bg-ks-surface px-2.5 py-1.5 text-[12px] shadow-[var(--ks-shadow-pop)]"
          style={{ left: Math.min(Math.max(x(active), 60), width - 60), top: Math.max(0, y(values[active]) - 46) }}
        >
          <div className="text-ks-fg-subtle">Sprint {labels[active]}</div>
          <div className="ks-tabular font-semibold text-ks-fg">{format(values[active])}</div>
        </div>
      )}
    </div>
  );
}
