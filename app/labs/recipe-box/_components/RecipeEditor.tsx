'use client';

import { useRef, useState } from 'react';
import { DISH_TYPES, type Ingredient, type Recipe } from '@/lib/labs/recipeBox/recipes';

const FIELD =
  'w-full font-plex-mono text-sm px-3 py-2 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong outline-none focus-visible:border-pr-fg-strong';
const LABEL = 'block text-sm text-pr-fg-strong font-medium mb-1.5';
const SECTION = 'font-archivo text-sm font-bold text-pr-fg-strong uppercase tracking-wide mt-6 mb-2';

interface Draft {
  title: string;
  dish_type: Recipe['dish_type'];
  servings: string;
  ingredients: Ingredient[];
  steps: string;
  tags: string;
  notes: string;
  source: string;
}

const blankIngredient = (): Ingredient => ({ amount: '', unit: '', name: '' });

function toDraft(r?: Partial<Recipe>): Draft {
  return {
    title: r?.title ?? '',
    dish_type: r?.dish_type ?? 'full meal',
    servings: r?.servings ? String(r.servings) : '',
    ingredients: r?.ingredients?.length ? r.ingredients.map((i) => ({ ...i })) : [blankIngredient(), blankIngredient(), blankIngredient()],
    steps: (r?.steps ?? []).join('\n'),
    tags: (r?.tags ?? []).join(', '),
    notes: r?.notes ?? '',
    source: r?.source ?? '',
  };
}

function fromDraft(d: Draft) {
  return {
    title: d.title,
    dish_type: d.dish_type,
    servings: d.servings ? Number(d.servings) : undefined,
    ingredients: d.ingredients.filter((i) => i.name.trim()),
    steps: d.steps.split('\n').map((s) => s.replace(/^\s*\d+[.)]\s*/, '').trim()).filter(Boolean),
    tags: d.tags.split(',').map((t) => t.trim()).filter(Boolean),
    notes: d.notes,
    source: d.source,
  };
}

/** Downsizes a photo in the browser so uploads stay small (and phone photos don't blow the request limit). */
async function photoToJpegBase64(file: File, maxEdge = 1568): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('unreadable'));
      el.src = url;
    });
    const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function RecipeEditor({
  recipe,
  onSaved,
  onClose,
}: {
  /** Pass a custom recipe to edit it; omit to add a new one. */
  recipe?: Recipe;
  onSaved: (recipe: Recipe) => void;
  onClose: () => void;
}) {
  const editing = Boolean(recipe);
  const [draft, setDraft] = useState<Draft>(() => toDraft(recipe));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [photo, setPhoto] = useState<File | null>(null);
  const [pasted, setPasted] = useState('');
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setIngredient = (index: number, field: keyof Ingredient, value: string) =>
    setDraft((d) => ({ ...d, ingredients: d.ingredients.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)) }));

  const runImport = async () => {
    setImporting(true);
    setImportMsg('');
    try {
      let image: { data: string; mediaType: string } | undefined;
      if (photo) {
        try {
          image = { data: await photoToJpegBase64(photo), mediaType: 'image/jpeg' };
        } catch {
          setImportMsg("This browser can't read that image. Try a JPEG or PNG.");
          return;
        }
      }
      const res = await fetch('/api/labs/recipe-box/recipes/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pasted, image }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setImportMsg(data.error ?? 'Import failed. Try again.');
        return;
      }
      setDraft(toDraft(data));
      setImportMsg('Form filled in. Check it over, then save.');
    } catch {
      setImportMsg('Something went wrong reaching the importer.');
    } finally {
      setImporting(false);
    }
  };

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/labs/recipe-box/recipes', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { id: recipe!.id, ...fromDraft(draft) } : fromDraft(draft)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? 'Could not save. Try again.');
        return;
      }
      onSaved(data);
    } catch {
      setError('Something went wrong saving the recipe.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-stretch justify-end bg-black/40" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="rb-editor-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full overflow-y-auto bg-pr-surface border-l border-pr-rule p-6"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 id="rb-editor-title" className="font-archivo text-2xl font-bold text-pr-fg-strong m-0">
            {editing ? 'Edit recipe' : 'Add a recipe'}
          </h2>
          <button onClick={onClose} className="pr-btn-secondary">
            Close
          </button>
        </div>

        {!editing && (
          <section className="border border-dashed border-pr-rule rounded-lg p-4 mb-2">
            <h3 className="font-archivo text-base font-bold text-pr-fg-strong m-0 mb-1">Import from a photo or text</h3>
            <p className="text-sm text-pr-lede m-0 mb-3">
              Upload a photo of a recipe card, paste a recipe, or both. Claude fills in the form below for you to check
              before saving.
            </p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              className="sr-only"
              id="rb-photo"
            />
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <label htmlFor="rb-photo" className="pr-btn-secondary cursor-pointer">
                {photo ? 'Change photo' : 'Choose photo'}
              </label>
              {photo && (
                <span className="text-xs font-plex-mono text-pr-muted flex items-center gap-2 min-w-0">
                  <span className="truncate max-w-[220px]">{photo.name}</span>
                  <button
                    onClick={() => {
                      setPhoto(null);
                      if (fileInput.current) fileInput.current.value = '';
                    }}
                    className="underline hover:text-pr-fg-strong"
                  >
                    remove
                  </button>
                </span>
              )}
            </div>
            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              rows={4}
              aria-label="Pasted recipe text"
              placeholder="…or paste a recipe here"
              className={`${FIELD} resize-y mb-3`}
            />
            <button onClick={runImport} disabled={importing || (!photo && !pasted.trim())} className="pr-btn-accent-outline disabled:opacity-50 disabled:cursor-not-allowed">
              {importing ? 'Reading recipe…' : 'Fill in the form'}
            </button>
            {importMsg && (
              <p role="status" className="text-sm text-pr-lede m-0 mt-3">
                {importMsg}
              </p>
            )}
          </section>
        )}

        <h3 className={SECTION}>Details</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="rb-title" className={LABEL}>
              Title
            </label>
            <input id="rb-title" value={draft.title} onChange={(e) => set('title', e.target.value)} className={FIELD} />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[180px]">
              <label htmlFor="rb-type" className={LABEL}>
                Dish type
              </label>
              <select
                id="rb-type"
                value={draft.dish_type}
                onChange={(e) => set('dish_type', e.target.value as Recipe['dish_type'])}
                className={FIELD}
              >
                {DISH_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-28">
              <label htmlFor="rb-servings" className={LABEL}>
                Servings
              </label>
              <input
                id="rb-servings"
                type="number"
                min={1}
                max={99}
                value={draft.servings}
                onChange={(e) => set('servings', e.target.value)}
                className={FIELD}
              />
            </div>
          </div>
        </div>

        <h3 className={SECTION}>Ingredients</h3>
        <div className="flex flex-col gap-2">
          <div className="hidden sm:grid grid-cols-[72px_88px_1fr_28px] gap-2 text-[11px] font-plex-mono text-pr-muted">
            <span>amount</span>
            <span>unit</span>
            <span>ingredient</span>
          </div>
          {draft.ingredients.map((ing, i) => (
            <div key={i} className="grid grid-cols-[64px_76px_1fr_28px] sm:grid-cols-[72px_88px_1fr_28px] gap-2 items-center">
              <input aria-label={`Ingredient ${i + 1} amount`} placeholder="1/2" value={ing.amount} onChange={(e) => setIngredient(i, 'amount', e.target.value)} className={FIELD} />
              <input aria-label={`Ingredient ${i + 1} unit`} placeholder="cup" value={ing.unit} onChange={(e) => setIngredient(i, 'unit', e.target.value)} className={FIELD} />
              <input aria-label={`Ingredient ${i + 1} name`} placeholder="ingredient" value={ing.name} onChange={(e) => setIngredient(i, 'name', e.target.value)} className={FIELD} />
              <button
                aria-label={`Remove ingredient ${i + 1}`}
                onClick={() => set('ingredients', draft.ingredients.filter((_, j) => j !== i))}
                className="text-pr-muted hover:text-red-500 text-lg leading-none"
              >
                ×
              </button>
            </div>
          ))}
          <button onClick={() => set('ingredients', [...draft.ingredients, blankIngredient()])} className="self-start text-xs font-plex-mono text-pr-muted underline hover:text-pr-fg-strong mt-1">
            + add ingredient
          </button>
        </div>

        <h3 className={SECTION}>Steps</h3>
        <textarea
          aria-label="Steps, one per line"
          value={draft.steps}
          onChange={(e) => set('steps', e.target.value)}
          rows={8}
          placeholder="One step per line"
          className={`${FIELD} resize-y`}
        />

        <h3 className={SECTION}>Extras</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="rb-tags" className={LABEL}>
              Tags <span className="text-pr-muted font-normal">(comma-separated)</span>
            </label>
            <input id="rb-tags" value={draft.tags} onChange={(e) => set('tags', e.target.value)} placeholder="chicken, mexican, quick" className={FIELD} />
          </div>
          <div>
            <label htmlFor="rb-notes" className={LABEL}>
              Notes
            </label>
            <textarea id="rb-notes" value={draft.notes} onChange={(e) => set('notes', e.target.value)} rows={3} className={`${FIELD} resize-y`} />
          </div>
          <div>
            <label htmlFor="rb-source" className={LABEL}>
              Source
            </label>
            <input id="rb-source" value={draft.source} onChange={(e) => set('source', e.target.value)} placeholder="Mom's recipe card" className={FIELD} />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-500 mt-5 mb-0">
            {error}
          </p>
        )}
        <div className="flex gap-3 mt-6">
          <button onClick={save} disabled={saving} className="pr-btn-accent-outline disabled:opacity-50">
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Save recipe'}
          </button>
          <button onClick={onClose} className="pr-btn-secondary">
            Cancel
          </button>
        </div>
      </aside>
    </div>
  );
}
