import { recipes, type Recipe } from './recipes';
import { getCustomRecipes } from './upstash';

/** The full box: bundled JSON recipes plus the ones added in the app. Server-only. */
export async function getAllRecipes(): Promise<Recipe[]> {
  return [...recipes, ...(await getCustomRecipes())];
}
