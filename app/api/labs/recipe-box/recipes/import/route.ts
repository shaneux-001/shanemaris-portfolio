import { NextRequest, NextResponse } from 'next/server';
import { requireSession } from '@/lib/labs/recipeBox/requireSession';
import { mealPlanRateLimit } from '@/lib/labs/recipeBox/upstash';
import { extractRecipe, NotARecipeError, type ImportImageType } from '@/lib/labs/recipeBox/ai';
import { sanitizeRecipeInput } from '@/lib/labs/recipeBox/recipes';

const IMAGE_TYPES: ImportImageType[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_BASE64 = 4_000_000; // ~3 MB image; the client downsizes well below this
const MAX_TEXT = 20_000;

/** Returns a draft recipe for review. Nothing is saved here. */
export async function POST(request: NextRequest) {
  const unauthorized = requireSession(request);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  const text = typeof body?.text === 'string' ? body.text.trim().slice(0, MAX_TEXT) : '';
  const imageData = typeof body?.image?.data === 'string' ? body.image.data : '';
  const mediaType = body?.image?.mediaType as ImportImageType;

  if (imageData && (!IMAGE_TYPES.includes(mediaType) || imageData.length > MAX_IMAGE_BASE64)) {
    return NextResponse.json({ error: 'Use a JPEG, PNG, WebP or GIF under 3 MB.' }, { status: 400 });
  }
  if (!imageData && !text) {
    return NextResponse.json({ error: 'Add a photo or paste some recipe text.' }, { status: 400 });
  }

  const { success } = await mealPlanRateLimit().limit('rb_recipe_import');
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded — try again in a bit.' }, { status: 429 });
  }

  try {
    const draft = await extractRecipe({
      text: text || undefined,
      image: imageData ? { data: imageData, mediaType } : undefined,
    });
    const clean = sanitizeRecipeInput(draft);
    if (typeof clean === 'string') {
      return NextResponse.json({ error: `Couldn't read a full recipe from that (${clean.toLowerCase()}).` }, { status: 422 });
    }
    return NextResponse.json({ ...clean, source: imageData ? 'Imported from photo' : 'Imported from text' });
  } catch (err) {
    if (err instanceof NotARecipeError) return NextResponse.json({ error: err.message }, { status: 422 });
    console.error('Recipe Box: recipe import failed —', err);
    return NextResponse.json({ error: 'Import failed — try again, or fill the form in by hand.' }, { status: 502 });
  }
}
