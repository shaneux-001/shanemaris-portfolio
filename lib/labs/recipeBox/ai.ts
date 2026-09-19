/**
 * The one function that talks to the model. Kept separate from recipe/UI
 * code on purpose — swapping providers or porting this to another project
 * later should mean touching this file, not untangling it from the rest.
 */

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
