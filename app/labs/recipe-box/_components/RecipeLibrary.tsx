'use client';

import { useMemo, useState } from 'react';
import type { Recipe } from '@/lib/labs/recipeBox/recipes';

const DISH_TYPES: Recipe['dish_type'][] = ['full meal', 'single dish', 'side dish', 'condiment/side', 'appetizer'];

export default function RecipeLibrary({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState('');
  const [dishType, setDishType] = useState<string | null>(null);
  const [selected, setSelected] = useState<Recipe | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (dishType && r.dish_type !== dishType) return false;
      if (!q) return true;
      const haystack = [r.title, ...(r.tags ?? []), ...r.ingredients.map((i) => i.name)].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [recipes, query, dishType]);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, ingredients, or tags…"
          className="flex-1 min-w-[220px] font-plex-mono text-sm px-3 py-2 rounded border border-pr-rule bg-pr-surface text-pr-fg-strong outline-none focus-visible:border-pr-fg-strong"
        />
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setDishType(null)}
            className={`text-xs font-plex-mono px-2.5 py-1.5 rounded border ${!dishType ? 'bg-pr-fg-strong text-pr-bg border-pr-fg-strong' : 'border-pr-rule text-pr-muted'}`}
          >
            all
          </button>
          {DISH_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setDishType(dishType === t ? null : t)}
              className={`text-xs font-plex-mono px-2.5 py-1.5 rounded border ${dishType === t ? 'bg-pr-fg-strong text-pr-bg border-pr-fg-strong' : 'border-pr-rule text-pr-muted'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-pr-muted font-plex-mono mb-3">
        {filtered.length} of {recipes.length} recipes
      </p>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {filtered.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className="pr-card text-left"
          >
            <span className="block font-plex-mono text-[11px] text-pr-muted mb-1">{r.dish_type}</span>
            <h3 className="font-archivo text-base font-bold text-pr-fg-strong m-0 mb-1.5 leading-snug">{r.title}</h3>
            <div className="flex flex-wrap gap-1">
              {(r.tags ?? []).slice(0, 3).map((t) => (
                <span key={t} className="text-[11px] font-plex-mono text-pr-muted border border-pr-rule rounded px-1.5 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selected && <RecipeDetailPanel recipe={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function RecipeDetailPanel({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const markdown = useMemo(() => {
    const ing = recipe.ingredients.map((i) => `- ${[i.amount, i.unit, i.name].filter(Boolean).join(' ')}`).join('\n');
    const steps = (recipe.steps ?? []).map((s, i) => `${i + 1}. ${s}`).join('\n');
    return `# ${recipe.title}\n\n${recipe.servings ? `Serves ${recipe.servings}\n\n` : ''}## Ingredients\n${ing}\n\n## Steps\n${steps}${recipe.notes ? `\n\n## Notes\n${recipe.notes}` : ''}`;
  }, [recipe]);

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full overflow-y-auto bg-pr-surface border-l border-pr-rule p-6"
      >
        <button onClick={onClose} className="pr-btn-secondary mb-4">
          Close
        </button>
        <span className="block font-plex-mono text-[11px] text-pr-muted mb-1">{recipe.dish_type}</span>
        <h2 className="font-archivo text-2xl font-bold text-pr-fg-strong m-0 mb-1">{recipe.title}</h2>
        {recipe.servings && <p className="text-sm text-pr-muted mb-4">Serves {recipe.servings}</p>}

        <h3 className="font-archivo text-sm font-bold text-pr-fg-strong uppercase tracking-wide mt-5 mb-2">
          Ingredients
        </h3>
        <ul className="text-sm text-pr-fg leading-relaxed pl-4 list-disc">
          {recipe.ingredients.map((i, idx) => (
            <li key={idx}>{[i.amount, i.unit, i.name].filter(Boolean).join(' ')}</li>
          ))}
        </ul>

        {recipe.steps && recipe.steps.length > 0 && (
          <>
            <h3 className="font-archivo text-sm font-bold text-pr-fg-strong uppercase tracking-wide mt-5 mb-2">
              Steps
            </h3>
            <ol className="text-sm text-pr-fg leading-relaxed pl-4 list-decimal">
              {recipe.steps.map((s, idx) => (
                <li key={idx} className="mb-1.5">
                  {s}
                </li>
              ))}
            </ol>
          </>
        )}

        {recipe.notes && (
          <p className="text-sm text-pr-lede italic mt-4">{recipe.notes}</p>
        )}

        <button onClick={downloadMarkdown} className="pr-btn-secondary mt-6">
          Download as Markdown
        </button>
      </aside>
    </div>
  );
}
