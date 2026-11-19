import rawRecipes from '@/content/labs/recipe-box/master_recipes.json';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  dish_type: 'full meal' | 'single dish' | 'condiment/side' | 'appetizer' | 'side dish';
  servings?: number;
  ingredients: Ingredient[];
  steps?: string[];
  tags?: string[];
  notes?: string;
  source?: string;
  source_images?: string[];
  /** True for recipes added in the app (stored in Upstash), not the bundled JSON. Only these are editable. */
  custom?: boolean;
}

export const DISH_TYPES: Recipe['dish_type'][] = ['full meal', 'single dish', 'side dish', 'condiment/side', 'appetizer'];

/** The bundled ~90 recipes. Recipes added in the app live in Upstash — see getAllRecipes() in library.ts. */
export const recipes = rawRecipes as Recipe[];

export function recipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

/** Compact shape for prompting the model — id/title/dish_type/tags only, no ingredients/steps. */
export function compactRecipesForPrompt(list: Recipe[] = recipes) {
  return list.map((r) => ({ id: r.id, title: r.title, dish_type: r.dish_type, tags: r.tags ?? [] }));
}

export function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, '')
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'recipe'
  );
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/**
 * Normalises untrusted input (a form submit or a model extraction) into a
 * Recipe minus its id. Returns an error string when it can't be saved.
 */
export function sanitizeRecipeInput(input: unknown): Omit<Recipe, 'id'> | string {
  if (!input || typeof input !== 'object') return 'Expected a recipe object';
  const r = input as Record<string, unknown>;

  const title = str(r.title, 200);
  if (!title) return 'Title is required';

  const dish_type = DISH_TYPES.includes(r.dish_type as Recipe['dish_type'])
    ? (r.dish_type as Recipe['dish_type'])
    : 'single dish';

  const ingredients = (Array.isArray(r.ingredients) ? r.ingredients : [])
    .filter((i): i is Record<string, unknown> => typeof i === 'object' && i !== null)
    .map((i) => ({ name: str(i.name, 200), amount: str(i.amount, 40), unit: str(i.unit, 40) }))
    .filter((i) => i.name)
    .slice(0, 100);
  if (!ingredients.length) return 'Add at least one ingredient';

  const steps = (Array.isArray(r.steps) ? r.steps : []).map((s) => str(s, 2000)).filter(Boolean).slice(0, 100);
  const tags = [
    ...new Set((Array.isArray(r.tags) ? r.tags : []).map((t) => str(t, 40).toLowerCase()).filter(Boolean)),
  ].slice(0, 20);
  const servingsNum = Math.round(Number(r.servings));
  const servings = Number.isFinite(servingsNum) && servingsNum > 0 && servingsNum < 100 ? servingsNum : undefined;
  const notes = str(r.notes, 4000) || undefined;
  const source = str(r.source, 300) || undefined;

  return { title, dish_type, servings, ingredients, steps, tags, notes, source, custom: true };
}

/** Picks an id for a new recipe that collides with nothing already in the box. */
export function uniqueRecipeId(title: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  const base = slugify(title);
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  return id;
}
