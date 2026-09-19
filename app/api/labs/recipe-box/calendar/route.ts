import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { getCalendar, setCalendar, type CalendarEntry } from '@/lib/labs/recipeBox/upstash';
import { recipeById } from '@/lib/labs/recipeBox/recipes';

export async function GET(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  return NextResponse.json(await getCalendar());
}

export async function PUT(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.entries)) {
    return NextResponse.json({ error: 'Expected { entries: CalendarEntry[] }' }, { status: 400 });
  }

  const entries: CalendarEntry[] = body.entries
    .filter((e: unknown): e is Record<string, unknown> => typeof e === 'object' && e !== null)
    .filter((e: Record<string, unknown>) => typeof e.date === 'string' && typeof e.main === 'string' && recipeById(e.main))
    .map((e: Record<string, unknown>) => ({
      date: e.date as string,
      main: e.main as string,
      side: typeof e.side === 'string' && recipeById(e.side) ? e.side : null,
    }))
    .sort((a: CalendarEntry, b: CalendarEntry) => a.date.localeCompare(b.date));

  await setCalendar(entries);
  return NextResponse.json(entries);
}
