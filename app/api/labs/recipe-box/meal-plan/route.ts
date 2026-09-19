import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { mealPlanRateLimit } from '@/lib/labs/recipeBox/upstash';
import { recipes, compactRecipesForPrompt } from '@/lib/labs/recipeBox/recipes';
import { generateMealPlan } from '@/lib/labs/recipeBox/ai';
import { localHeuristicPlan } from '@/lib/labs/recipeBox/planning';

const MAX_MEALS = 10;

export async function POST(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const { success } = await mealPlanRateLimit().limit('rb_meal_plan');
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded — try again in a bit.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const numMeals = Math.min(MAX_MEALS, Math.max(1, Number(body.numMeals) || 5));
  const fridgeNotes = typeof body.fridgeNotes === 'string' ? body.fridgeNotes.slice(0, 2000) : '';

  let meals;
  let usedFallback = false;
  try {
    meals = await generateMealPlan(numMeals, fridgeNotes, compactRecipesForPrompt());
    if (!meals.length) throw new Error('empty plan');
  } catch {
    meals = localHeuristicPlan(recipes, numMeals);
    usedFallback = true;
  }

  return NextResponse.json({ meals, usedFallback });
}
