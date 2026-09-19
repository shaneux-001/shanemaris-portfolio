'use client';

import { useMemo } from 'react';
import type { Recipe } from '@/lib/labs/recipeBox/recipes';
import type { CalendarEntry } from '@/lib/labs/recipeBox/upstash';

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function CalendarView({
  recipes,
  calendar,
  onCalendarUpdated,
}: {
  recipes: Recipe[];
  calendar: CalendarEntry[];
  onCalendarUpdated: (entries: CalendarEntry[]) => void;
}) {
  const recipeById = useMemo(() => {
    const map = new Map(recipes.map((r) => [r.id, r]));
    return (id: string | null) => (id ? map.get(id) : undefined);
  }, [recipes]);

  const sorted = useMemo(() => [...calendar].sort((a, b) => a.date.localeCompare(b.date)), [calendar]);

  const removeEntry = async (index: number) => {
    const entries = sorted.filter((_, i) => i !== index);
    const res = await fetch('/api/labs/recipe-box/calendar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries }),
    });
    if (res.ok) onCalendarUpdated(await res.json());
  };

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-pr-muted italic">
        Nothing scheduled yet — generate a plan on the Meal Plan tab and add it to your calendar.
      </p>
    );
  }

  return (
    <div className="max-w-xl">
      <ul className="flex flex-col gap-2">
        {sorted.map((entry, i) => {
          const main = recipeById(entry.main);
          const side = recipeById(entry.side);
          return (
            <li key={`${entry.date}-${entry.main}-${i}`} className="flex items-start justify-between gap-4 border border-pr-rule rounded-lg p-3">
              <div>
                <span className="block font-plex-mono text-[11px] text-pr-muted mb-1">{formatDisplayDate(entry.date)}</span>
                <span className="font-archivo font-bold text-pr-fg-strong">
                  {main?.title ?? entry.main}
                  {side && <span className="text-pr-muted font-normal"> + {side.title}</span>}
                </span>
              </div>
              <button onClick={() => removeEntry(i)} className="text-xs text-pr-muted hover:text-red-500 whitespace-nowrap">
                remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
