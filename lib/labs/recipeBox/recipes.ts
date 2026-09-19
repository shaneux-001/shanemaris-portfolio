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
}

export const recipes = rawRecipes as Recipe[];

export function recipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

/** Compact shape for prompting the model — id/title/dish_type/tags only, no ingredients/steps. */
export function compactRecipesForPrompt() {
  return recipes.map((r) => ({ id: r.id, title: r.title, dish_type: r.dish_type, tags: r.tags ?? [] }));
}
