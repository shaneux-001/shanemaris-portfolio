/**
 * Everything that talks to the model lives here. Kept separate from recipe/UI
 * code on purpose — swapping providers or porting this to another project
 * later should mean touching this file, not untangling it from the rest.
 */
import Anthropic from '@anthropic-ai/sdk';

export interface MealPlanCandidate {
  id: string;
  title: string;
  dish_type: string;
  tags: string[];
}

export interface MealPlanEntry {
  main: string;
  side: string | null;
  reason: string;
}

function buildPrompt(numMeals: number, fridgeNotes: string, recipes: MealPlanCandidate[]): string {
  return `Plan ${numMeals} dinners for a family of 2 adults and 1 child, using ONLY the recipes listed below (reference by exact id).

Rules:
- A meal is either one "full meal" recipe alone (side: null), or one "single dish" recipe paired with a "side dish" or "condiment/side" recipe that makes real culinary sense together (matching cuisine or flavor profile).
- Never pair two "full meal" recipes together.
- Aim for variety across the week — don't repeat the same main protein or cuisine more than twice.
- Take what's on hand into account where it plausibly affects the choice, but don't invent ingredients that aren't in the recipe list.
- What's on hand / what they're in the mood for this week: ${fridgeNotes || '(nothing specified)'}

Respond with ONLY valid JSON, no markdown fences, no commentary — an array of exactly ${numMeals} objects shaped like:
[{"main":"<recipe id>","side":"<recipe id or null>","reason":"<one short sentence, under 18 words>"}]

Recipes:
${JSON.stringify(recipes)}`;
}

export async function generateMealPlan(
  numMeals: number,
  fridgeNotes: string,
  recipes: MealPlanCandidate[]
): Promise<MealPlanEntry[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 4096, // headroom for the model's internal reasoning tokens, which count against this budget too
      messages: [{ role: 'user', content: buildPrompt(numMeals, fridgeNotes, recipes) }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const data = await response.json();
  const textBlocks = (data.content ?? [])
    .filter((b: { type: string }) => b.type === 'text')
    .map((b: { text: string }) => b.text)
    .join('\n');
  const cleaned = textBlocks.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) throw new Error('Unexpected response shape from model');

  const validIds = new Set(recipes.map((r) => r.id));
  return parsed
    .filter((m) => m && typeof m.main === 'string' && validIds.has(m.main))
    .map((m) => ({
      main: m.main,
      side: typeof m.side === 'string' && validIds.has(m.side) ? m.side : null,
      reason: typeof m.reason === 'string' ? m.reason : '',
    }));
}

/* ------------------------------------------------------------------ */
/* Recipe import — turns a photo of a recipe card or pasted text into  */
/* a draft recipe the person reviews in the form before saving.        */
/* ------------------------------------------------------------------ */

export type ImportImageType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

export interface RecipeImportInput {
  text?: string;
  image?: { data: string; mediaType: ImportImageType };
}

const DISH_TYPE_ENUM = ['full meal', 'single dish', 'side dish', 'condiment/side', 'appetizer'];

const RECIPE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['is_recipe', 'title', 'dish_type', 'servings', 'ingredients', 'steps', 'tags', 'notes'],
  properties: {
    is_recipe: { type: 'boolean' },
    title: { type: 'string' },
    dish_type: { type: 'string', enum: DISH_TYPE_ENUM },
    servings: { type: ['integer', 'null'] },
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'amount', 'unit'],
        properties: { name: { type: 'string' }, amount: { type: 'string' }, unit: { type: 'string' } },
      },
    },
    steps: { type: 'array', items: { type: 'string' } },
    tags: { type: 'array', items: { type: 'string' } },
    notes: { type: 'string' },
  },
} as const;

const IMPORT_INSTRUCTIONS = `Transcribe the recipe you're given into the JSON schema. It may be a photo of a handwritten or printed recipe card, a meal-kit card, or text pasted from a website or note.

- Copy the recipe faithfully. Don't invent ingredients, amounts or steps that aren't there; leave a field empty when the source doesn't say.
- ingredients: one object per ingredient. "amount" is the quantity as written ("1/2", "2-3", "1 1/2"), "unit" is the measure ("cup", "Tbsp", "oz", "cloves", or "" when there isn't one), "name" is the ingredient with any prep ("garlic, minced").
- steps: one string per step, in order, without leading numbers.
- dish_type: "full meal" if it's a complete dinner on its own, "single dish" for a main that wants a side, "side dish" for sides, "condiment/side" for sauces, dressings and small accompaniments, "appetizer" for starters.
- tags: 2–6 short lowercase tags — main protein, cuisine, and things like "vegetarian", "quick", "slow cooker".
- notes: anything worth keeping that isn't an ingredient or step (tips, who it came from, substitutions). "" if none.
- If there's no recipe in what you're given, set is_recipe to false and leave the other fields empty.`;

export class NotARecipeError extends Error {}

/** Returns a draft recipe (unsanitised — the caller runs sanitizeRecipeInput). */
export async function extractRecipe(input: RecipeImportInput): Promise<Record<string, unknown>> {
  const client = new Anthropic();

  const content: Anthropic.Beta.BetaContentBlockParam[] = [];
  if (input.image) {
    content.push({ type: 'image', source: { type: 'base64', media_type: input.image.mediaType, data: input.image.data } });
  }
  content.push({
    type: 'text',
    text: input.text ? `Recipe text:\n\n${input.text}` : 'Transcribe the recipe in this image.',
  });

  const response = await client.beta.messages.create({
    model: 'claude-opus-5-5',
    max_tokens: 16000,
    // Careful transcription, not hard reasoning.
    output_config: { effort: 'low', format: { type: 'json_schema', schema: RECIPE_SCHEMA } },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: IMPORT_INSTRUCTIONS,
    messages: [{ role: 'user', content }],
  });

  if (response.stop_reason === 'refusal') throw new NotARecipeError('The model declined this one.');

  const text = response.content
    .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
  const parsed = JSON.parse(text) as Record<string, unknown>;
  if (parsed.is_recipe === false) throw new NotARecipeError("Couldn't find a recipe in that.");
  return parsed;
}
