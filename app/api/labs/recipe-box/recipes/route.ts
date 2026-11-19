import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { getCalendar, getCustomRecipes, setCalendar, setCustomRecipes } from '@/lib/labs/recipeBox/upstash';
import { recipes, sanitizeRecipeInput, uniqueRecipeId } from '@/lib/labs/recipeBox/recipes';

const MAX_CUSTOM_RECIPES = 500;

/** Recipes added in the app (the bundled ones ship with the page). */
export async function GET(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json(await getCustomRecipes());
}

export async function POST(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const clean = sanitizeRecipeInput(await request.json().catch(() => null));
  if (typeof clean === 'string') return NextResponse.json({ error: clean }, { status: 400 });

  const custom = await getCustomRecipes();
  if (custom.length >= MAX_CUSTOM_RECIPES) {
    return NextResponse.json({ error: 'The recipe box is full.' }, { status: 400 });
  }

  const id = uniqueRecipeId(clean.title, [...recipes, ...custom].map((r) => r.id));
  const recipe = { id, ...clean };
  await setCustomRecipes([...custom, recipe]);
  return NextResponse.json(recipe, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === 'string' ? body.id : '';
  const clean = sanitizeRecipeInput(body);
  if (typeof clean === 'string') return NextResponse.json({ error: clean }, { status: 400 });

  const custom = await getCustomRecipes();
  const index = custom.findIndex((r) => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Only recipes added in the app can be edited.' }, { status: 404 });
  }

  // Keep the id stable so calendar entries still point at it.
  const recipe = { ...custom[index], ...clean, id };
  const next = [...custom];
  next[index] = recipe;
  await setCustomRecipes(next);
  return NextResponse.json(recipe);
}

export async function DELETE(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const id = request.nextUrl.searchParams.get('id') ?? '';
  const custom = await getCustomRecipes();
  if (!custom.some((r) => r.id === id)) {
    return NextResponse.json({ error: 'Only recipes added in the app can be deleted.' }, { status: 404 });
  }

  await setCustomRecipes(custom.filter((r) => r.id !== id));

  // Drop calendar entries that would now point at nothing.
  const calendar = await getCalendar();
  const remaining = calendar
    .filter((e) => e.main !== id)
    .map((e) => (e.side === id ? { ...e, side: null } : e));
  if (remaining.length !== calendar.length || remaining.some((e, i) => e.side !== calendar[i]?.side)) {
    await setCalendar(remaining);
  }

  return NextResponse.json({ ok: true, calendar: remaining });
}
