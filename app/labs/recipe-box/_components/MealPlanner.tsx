'use client';

import { useMemo, useState } from 'react';
import type { Recipe } from '@/lib/labs/recipeBox/recipes';
import type { MealPlanEntry } from '@/lib/labs/recipeBox/ai';
import { buildShoppingList } from '@/lib/labs/recipeBox/planning';
import type { CalendarEntry } from '@/lib/labs/recipeBox/upstash';

function defaultStartDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function MealPlanner({
  recipes,
  onCalendarUpdated,
}: {
  recipes: Recipe[];
  onCalendarUpdated: (entries: CalendarEntry[]) => void;
}) {
  const [fridgeNotes, setFridgeNotes] = useState('');
  const [numMeals, setNumMeals] = useState(5);
  const [meals, setMeals] = useState<MealPlanEntry[] | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locked, setLocked] = useState(false);
  const [startDate, setStartDate] = useState(defaultStartDate());

  const recipeById = useMemo(() => {
    const map = new Map(recipes.map((r) => [r.id, r]));
    return (id: string | null) => (id ? map.get(id) : undefined);
  }, [recipes]);

  const generate = async () => {
    setLoading(true);
    setError('');
    setLocked(false);
    try {
      const res = await fetch('/api/labs/recipe-box/meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numMeals, fridgeNotes }),
      });
      if (res.status === 429) {
        setError('Rate limit hit — give it a few minutes and try again.');
        return;
      }
      if (!res.ok) {
        setError('Could not generate a plan — try again.');
        return;
      }
      const data = await res.json();
      setMeals(data.meals);
      setUsedFallback(Boolean(data.usedFallback));
    } catch {
      setError('Something went wrong reaching the planner.');
    } finally {
      setLoading(false);
    }
  };

  const shoppingList = useMemo(() => (meals ? buildShoppingList(meals) : []), [meals]);

  const addToCalendar = async () => {
    if (!meals) return;
    const entries: CalendarEntry[] = meals.map((m, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      return { date: d.toISOString().slice(0, 10), main: m.main, side: m.side };
    });

    const res = await fetch('/api/labs/recipe-box/calendar');
    const existing: CalendarEntry[] = res.ok ? await res.json() : [];
    const merged = [...existing, ...entries];

    const putRes = await fetch('/api/labs/recipe-box/calendar', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entries: merged }),
    });
    if (putRes.ok) {
      const saved = await putRes.json();
      onCalendarUpdated(saved);
      setLocked(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-5 max-w-xl">
        <label className="text-sm text-pr-fg-strong font-medium">
          What&apos;s in the fridge / what are you feeling this week?
        </label>
        <textarea
          value={fridgeNotes}
          onChange={(e) => setFridgeNotes(e.target.value)}
          placeholder="e.g. we've got a lot of zucchini and ground beef to use up, nothing too spicy for the kid"
          rows={3}
          className="font-plex-mono text-sm px-3 py-2 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong outline-none focus-visible:border-pr-fg-strong resize-none"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm text-pr-muted">Meals:</label>
          <input
            type="number"
            min={1}
            max={10}
            value={numMeals}
            onChange={(e) => setNumMeals(Number(e.target.value))}
            className="w-16 font-plex-mono text-sm px-2 py-1.5 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong outline-none"
          />
          <button onClick={generate} disabled={loading} className="pr-btn-accent-outline">
            {loading ? 'Thinking…' : meals ? 'Regenerate' : 'Generate plan'}
          </button>
        </div>
        {error && <p className="text-sm text-red-500 m-0">{error}</p>}
        {usedFallback && (
          <p className="text-xs text-pr-muted italic m-0">
            The AI planner wasn&apos;t available — this plan came from the local fallback logic instead.
          </p>
        )}
      </div>

      {meals && (
        <div className="mb-8">
          <h3 className="font-archivo text-lg font-bold text-pr-fg-strong mb-3">This week&apos;s plan</h3>
          <ul className="flex flex-col gap-2 mb-4">
            {meals.map((m, i) => {
              const main = recipeById(m.main);
              const side = recipeById(m.side);
              return (
                <li key={i} className="border border-pr-rule rounded-lg p-3">
                  <div className="font-archivo font-bold text-pr-fg-strong">
                    {main?.title ?? m.main}
                    {side && <span className="text-pr-muted font-normal"> + {side.title}</span>}
                  </div>
                  {m.reason && <p className="text-sm text-pr-lede m-0 mt-1">{m.reason}</p>}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm text-pr-muted">Starting</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="font-plex-mono text-sm px-2 py-1.5 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong"
            />
            <button onClick={addToCalendar} className="pr-btn-secondary">
              {locked ? 'Added to calendar ✓' : 'Add to calendar + build shopping list'}
            </button>
          </div>

          {locked && shoppingList.length > 0 && (
            <div>
              <h3 className="font-archivo text-lg font-bold text-pr-fg-strong mb-3">Shopping list</h3>
              <ul className="flex flex-col gap-1.5">
                {shoppingList.map((g) => (
                  <li key={g.name} className="text-sm border-b border-dashed border-pr-rule pb-1.5">
                    <span className="font-medium text-pr-fg-strong">{g.name}</span>{' '}
                    <span className="font-plex-mono text-xs text-pr-muted">
                      {g.entries.map((e) => `${e.amt} — ${e.recipeTitle}`).join(' · ')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
