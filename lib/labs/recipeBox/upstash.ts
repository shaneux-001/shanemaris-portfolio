import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

function redis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('UPSTASH_REDIS_REST_URL/TOKEN are not set');
  return new Redis({ url, token });
}

let ratelimitInstance: Ratelimit | null = null;

/** Shared backstop limiter — 30 requests/hour across the whole gated session, regardless of who or what is calling. */
export function mealPlanRateLimit(): Ratelimit {
  if (!ratelimitInstance) {
    ratelimitInstance = new Ratelimit({
      redis: redis(),
      limiter: Ratelimit.slidingWindow(30, '1 h'),
      prefix: 'rb_ratelimit',
    });
  }
  return ratelimitInstance;
}

const PANTRY_KEY = 'rb_pantry';

export interface PantryItem {
  name: string;
  amount: string;
  unit: string;
  category?: string;
  note?: string;
}

export interface PantryData {
  last_updated: string | null;
  items: PantryItem[];
}

export async function getPantry(): Promise<PantryData> {
  const data = await redis().get<PantryData>(PANTRY_KEY);
  return data ?? { last_updated: null, items: [] };
}

export async function setPantry(data: PantryData): Promise<void> {
  await redis().set(PANTRY_KEY, data);
}

const CALENDAR_KEY = 'rb_calendar';

export interface CalendarEntry {
  date: string;
  main: string;
  side: string | null;
}

export async function getCalendar(): Promise<CalendarEntry[]> {
  const data = await redis().get<CalendarEntry[]>(CALENDAR_KEY);
  return data ?? [];
}

export async function setCalendar(entries: CalendarEntry[]): Promise<void> {
  await redis().set(CALENDAR_KEY, entries);
}
