/**
 * Deterministic planning logic ported from the original recipe_box.html
 * prototype: meal pairing fallback, shopping-list aggregation, and pantry
 * quantity diffing. None of this goes through the model — it's exact
 * arithmetic and rule-following, which the model is worse at than plain code.
 */
import { Recipe, recipeById } from './recipes';
import type { PantryData, CalendarEntry } from './upstash';
import type { MealPlanEntry } from './ai';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PROTEIN_TAGS = ['chicken', 'beef', 'pork', 'seafood', 'shrimp', 'salmon', 'tuna', 'fish'];

/** Used when the model call fails or returns something unusable — a real plan, not an error state. */
export function localHeuristicPlan(recipes: Recipe[], numMeals: number): MealPlanEntry[] {
  const fullMeals = shuffle(recipes.filter((r) => r.dish_type === 'full meal'));
  const singles = shuffle(recipes.filter((r) => r.dish_type === 'single dish'));
  const sides = recipes.filter((r) => r.dish_type === 'side dish');

  const usedProteinTags: Record<string, number> = {};
  const usedSideIds = new Set<string>();

  const proteinOf = (r: Recipe) => (r.tags ?? []).find((t) => PROTEIN_TAGS.includes(t)) ?? null;
  const tooRepeated = (r: Recipe) => {
    const p = proteinOf(r);
    return p ? (usedProteinTags[p] ?? 0) >= 2 : false;
  };
  const markUsed = (r: Recipe) => {
    const p = proteinOf(r);
    if (p) usedProteinTags[p] = (usedProteinTags[p] ?? 0) + 1;
  };
  const findSideFor = (single: Recipe): Recipe | null => {
    const candidates = sides.filter(
      (s) => !usedSideIds.has(s.id) && (s.tags ?? []).some((t) => (single.tags ?? []).includes(t))
    );
    if (!candidates.length) return null;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    usedSideIds.add(chosen.id);
    return chosen;
  };

  const meals: MealPlanEntry[] = [];
  let fmIdx = 0;
  let sIdx = 0;
  const pickFullMealFirst = () => Math.random() < 0.5;

  while (meals.length < numMeals && (fmIdx < fullMeals.length || sIdx < singles.length)) {
    let picked: MealPlanEntry | null = null;

    if (pickFullMealFirst() && fmIdx < fullMeals.length) {
      while (fmIdx < fullMeals.length && tooRepeated(fullMeals[fmIdx])) fmIdx++;
      if (fmIdx < fullMeals.length) {
        picked = { main: fullMeals[fmIdx].id, side: null, reason: 'A complete meal on its own.' };
        markUsed(fullMeals[fmIdx]);
        fmIdx++;
      }
    }
    if (!picked && sIdx < singles.length) {
      while (sIdx < singles.length && tooRepeated(singles[sIdx])) sIdx++;
      if (sIdx < singles.length) {
        const single = singles[sIdx];
        const side = findSideFor(single);
        picked = {
          main: single.id,
          side: side ? side.id : null,
          reason: side ? 'Paired with a matching side.' : 'Stands well on its own.',
        };
        markUsed(single);
        sIdx++;
      }
    }
    if (!picked && fmIdx < fullMeals.length) {
      picked = { main: fullMeals[fmIdx].id, side: null, reason: 'A complete meal on its own.' };
      fmIdx++;
    }
    if (!picked && sIdx < singles.length) {
      const single = singles[sIdx];
      const side = findSideFor(single);
      picked = {
        main: single.id,
        side: side ? side.id : null,
        reason: side ? 'Paired with a matching side.' : 'Stands well on its own.',
      };
      sIdx++;
    }
    if (picked) meals.push(picked);
    else break;
  }

  return meals;
}

export interface ShoppingListGroup {
  name: string;
  entries: { amt: string; recipeTitle: string }[];
}

export function buildShoppingList(meals: MealPlanEntry[]): ShoppingListGroup[] {
  const groups: Record<string, ShoppingListGroup> = {};
  meals.forEach((m) => {
    [m.main, m.side].filter((id): id is string => Boolean(id)).forEach((id) => {
      const r = recipeById(id);
      if (!r) return;
      (r.ingredients ?? []).forEach((ing) => {
        const key = (ing.name ?? '').trim().toLowerCase();
        if (!key) return;
        if (!groups[key]) groups[key] = { name: ing.name.trim(), entries: [] };
        const amtLabel = [ing.amount, ing.unit].filter(Boolean).join(' ').trim();
        groups[key].entries.push({ amt: amtLabel || 'to taste', recipeTitle: r.title });
      });
    });
  });
  return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
}

function parseApproxQty(s: string | undefined): number | null {
  if (!s) return null;
  const str = String(s).trim().toLowerCase();
  if (!str || /to taste|tbd|optional|as needed/.test(str)) return null;

  const rangeMatch = str.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
  if (rangeMatch) return (parseFloat(rangeMatch[1]) + parseFloat(rangeMatch[2])) / 2;

  const mixedMatch = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) return parseInt(mixedMatch[1]) + parseInt(mixedMatch[2]) / parseInt(mixedMatch[3]);

  const fracMatch = str.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) return parseInt(fracMatch[1]) / parseInt(fracMatch[2]);

  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

export type PantryStatus = 'out' | 'low' | 'buy' | 'check' | 'ok';

export interface PantryRow {
  name: string;
  status: PantryStatus;
  detail: string;
}

/** Cross-references the upcoming week's calendar entries against pantry stock. */
export function computeWeekUsage(calendarLog: CalendarEntry[], pantry: PantryData): PantryRow[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const todayStr = fmt(today);
  const end = new Date(today);
  end.setDate(end.getDate() + 6);
  const endStr = fmt(end);

  const upcoming = calendarLog.filter((e) => e.date >= todayStr && e.date <= endStr);

  const needed: Record<string, { name: string; unit: string; qty: number; hasNonNumeric: boolean }> = {};
  upcoming.forEach((entry) => {
    [entry.main, entry.side].filter((id): id is string => Boolean(id)).forEach((id) => {
      const r = recipeById(id);
      if (!r) return;
      (r.ingredients ?? []).forEach((ing) => {
        const name = (ing.name ?? '').trim().toLowerCase();
        if (!name) return;
        const unit = (ing.unit ?? '').trim().toLowerCase();
        const key = `${name}|${unit}`;
        const qty = parseApproxQty(ing.amount);
        if (!needed[key]) needed[key] = { name: ing.name.trim(), unit, qty: 0, hasNonNumeric: false };
        if (qty === null) needed[key].hasNonNumeric = true;
        else needed[key].qty += qty;
      });
    });
  });

  const pantryByName: Record<string, (typeof pantry.items)[number]> = {};
  pantry.items.forEach((it) => {
    pantryByName[(it.name ?? '').trim().toLowerCase()] = it;
  });

  const rows: PantryRow[] = Object.values(needed).map((n) => {
    const pantryItem = pantryByName[n.name.trim().toLowerCase()];
    if (!pantryItem) return { name: n.name, status: 'buy', detail: 'Not tracked in pantry' };

    const pantryUnit = (pantryItem.unit ?? '').trim().toLowerCase();
    if (pantryUnit !== n.unit || n.hasNonNumeric) {
      return { name: n.name, status: 'check', detail: `Have ${pantryItem.amount || '?'} ${pantryItem.unit || ''} — check manually` };
    }
    const pantryQty = parseApproxQty(pantryItem.amount);
    if (pantryQty === null) {
      return { name: n.name, status: 'check', detail: `Have ${pantryItem.amount || '?'} ${pantryItem.unit || ''} — check manually` };
    }
    const remaining = pantryQty - n.qty;
    if (remaining <= 0) return { name: n.name, status: 'out', detail: `Needs ~${n.qty} ${n.unit}, have ${pantryQty} ${n.unit}` };
    if (remaining <= pantryQty * 0.25) return { name: n.name, status: 'low', detail: `~${remaining.toFixed(1)} ${n.unit} left after this week` };
    return { name: n.name, status: 'ok', detail: `~${remaining.toFixed(1)} ${n.unit} left after this week` };
  });

  const order: Record<PantryStatus, number> = { out: 0, low: 1, buy: 2, check: 3, ok: 4 };
  rows.sort((a, b) => order[a.status] - order[b.status] || a.name.localeCompare(b.name));
  return rows;
}
