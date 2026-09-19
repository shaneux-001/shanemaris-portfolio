import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { getPantry, setPantry, type PantryItem } from '@/lib/labs/recipeBox/upstash';

export async function GET(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json(await getPantry());
}

export async function PUT(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: 'Expected { items: PantryItem[] }' }, { status: 400 });
  }

  const items: PantryItem[] = body.items
    .filter((it: unknown): it is { name: unknown } => typeof it === 'object' && it !== null && 'name' in it)
    .map((it: Record<string, unknown>) => ({
      name: String(it.name ?? '').trim(),
      amount: String(it.amount ?? ''),
      unit: String(it.unit ?? ''),
      category: it.category ? String(it.category) : undefined,
      note: it.note ? String(it.note) : undefined,
    }))
    .filter((it: PantryItem) => it.name.length > 0);

  const data = { last_updated: new Date().toISOString().slice(0, 10), items };
  await setPantry(data);
  return NextResponse.json(data);
}
