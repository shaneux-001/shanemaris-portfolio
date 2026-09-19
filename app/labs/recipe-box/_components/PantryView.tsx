'use client';

import { useEffect, useState } from 'react';
import { computeWeekUsage, type PantryRow } from '@/lib/labs/recipeBox/planning';
import type { PantryData, PantryItem, CalendarEntry } from '@/lib/labs/recipeBox/upstash';

const STATUS_LABEL: Record<PantryRow['status'], string> = {
  out: 'Out',
  low: 'Low',
  buy: 'Buy',
  check: 'Check',
  ok: 'OK',
};

export default function PantryView({ calendar }: { calendar: CalendarEntry[] }) {
  const [pantry, setPantry] = useState<PantryData>({ last_updated: null, items: [] });
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<PantryItem>({ name: '', amount: '', unit: '' });

  useEffect(() => {
    fetch('/api/labs/recipe-box/pantry')
      .then((r) => (r.ok ? r.json() : { last_updated: null, items: [] }))
      .then(setPantry)
      .finally(() => setLoading(false));
  }, []);

  const save = async (items: PantryItem[]) => {
    const res = await fetch('/api/labs/recipe-box/pantry', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (res.ok) setPantry(await res.json());
  };

  const addItem = () => {
    if (!draft.name.trim()) return;
    save([...pantry.items, draft]);
    setDraft({ name: '', amount: '', unit: '' });
  };

  const removeItem = (name: string) => {
    save(pantry.items.filter((i) => i.name !== name));
  };

  const usage = computeWeekUsage(calendar, pantry);

  if (loading) return <p className="text-sm text-pr-muted">Loading pantry…</p>;

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-plex-mono text-pr-muted mb-5">
        {pantry.last_updated ? `Last updated ${pantry.last_updated}` : 'Not set up yet'}
      </p>

      <h3 className="font-archivo text-lg font-bold text-pr-fg-strong mb-3">What&apos;s on hand</h3>
      <div className="flex flex-col gap-1.5 mb-4">
        {pantry.items.map((it) => (
          <div key={it.name} className="flex items-center justify-between border-b border-dashed border-pr-rule py-1.5 text-sm">
            <span className="text-pr-fg-strong">{it.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-plex-mono text-xs text-pr-muted">
                {it.amount} {it.unit}
              </span>
              <button onClick={() => removeItem(it.name)} className="text-xs text-pr-muted hover:text-red-500">
                remove
              </button>
            </div>
          </div>
        ))}
        {pantry.items.length === 0 && <p className="text-sm text-pr-muted italic">Nothing tracked yet.</p>}
      </div>

      <div className="flex gap-2 mb-8">
        <input
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          placeholder="ingredient"
          className="flex-1 text-sm px-2 py-1.5 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong"
        />
        <input
          value={draft.amount}
          onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
          placeholder="amount"
          className="w-20 font-plex-mono text-sm px-2 py-1.5 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong"
        />
        <input
          value={draft.unit}
          onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
          placeholder="unit"
          className="w-20 font-plex-mono text-sm px-2 py-1.5 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong"
        />
        <button onClick={addItem} className="pr-btn-secondary">
          Add
        </button>
      </div>

      <h3 className="font-archivo text-lg font-bold text-pr-fg-strong mb-3">This week, against your plan</h3>
      {usage.length === 0 ? (
        <p className="text-sm text-pr-muted italic">Nothing scheduled on the calendar for the next 7 days yet.</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {usage.map((row) => (
            <li key={row.name} className="flex items-center justify-between text-sm border-b border-dashed border-pr-rule py-1.5">
              <span className="text-pr-fg-strong">{row.name}</span>
              <span className="font-plex-mono text-xs text-pr-muted">
                <span className="uppercase mr-2">{STATUS_LABEL[row.status]}</span>
                {row.detail}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
