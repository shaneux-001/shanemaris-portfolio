'use client';

import { useEffect, useState } from 'react';
import LabsHeader from '@/components/LabsHeader';
import { recipes } from '@/lib/labs/recipeBox/recipes';
import type { CalendarEntry } from '@/lib/labs/recipeBox/upstash';
import RecipeLibrary from './_components/RecipeLibrary';
import MealPlanner from './_components/MealPlanner';
import PantryView from './_components/PantryView';
import CalendarView from './_components/CalendarView';

type Tab = 'library' | 'plan' | 'calendar' | 'pantry';

export default function RecipeBoxPage() {
  const [tab, setTab] = useState<Tab>('plan');
  const [calendar, setCalendar] = useState<CalendarEntry[]>([]);

  useEffect(() => {
    fetch('/api/labs/recipe-box/calendar')
      .then((r) => (r.ok ? r.json() : []))
      .then(setCalendar);
  }, []);

  return (
    <>
      <LabsHeader />
      <main className="pr-page">
        <div className="pr-main pt-[clamp(36px,5vw,56px)]">
          <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">
            The Recipe Box
          </h1>
          <p className="pr-page-lede m-0 mb-8 leading-[1.65] text-pr-lede max-w-[56ch]">
            ~90 family recipes, a meal planner that reasons about what&apos;s actually in the fridge, and a pantry
            that keeps the shopping list honest.
          </p>

          <nav className="flex gap-1 mb-8 border-b border-pr-rule">
            {(
              [
                ['plan', 'Meal Plan'],
                ['library', 'Recipe Box'],
                ['calendar', 'Calendar'],
                ['pantry', 'Pantry'],
              ] as [Tab, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`font-plex-mono text-xs tracking-[0.04em] px-3 py-2 border-b-2 -mb-px ${
                  tab === key ? 'border-pr-fg-strong text-pr-fg-strong' : 'border-transparent text-pr-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {tab === 'library' && <RecipeLibrary recipes={recipes} />}
          {tab === 'plan' && <MealPlanner recipes={recipes} onCalendarUpdated={setCalendar} />}
          {tab === 'calendar' && <CalendarView recipes={recipes} calendar={calendar} onCalendarUpdated={setCalendar} />}
          {tab === 'pantry' && <PantryView calendar={calendar} />}
        </div>
      </main>
    </>
  );
}
