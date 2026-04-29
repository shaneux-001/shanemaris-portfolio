# Staging notes — local-only review

Changes are **staged** in your working tree (not committed, not pushed). Verify with `npm run dev` before committing.

## What was wrong

Sonnet's Tailwind refactor introduced one critical bug across 14 buttons in 10 files: it used `text-base` to mean "set text color to `var(--color-base)`" — but **`text-base` is a built-in Tailwind utility for `font-size: 1rem`**. So every primary button on the site rendered with no explicit text color, inheriting `text-ink` (dark) on the plum/lifted-plum background. Light-mode result: dark text on plum = barely readable. Dark-mode result: dark text on lifted plum = even worse.

## What got fixed

In all 10 files below, `bg-accent text-base` → `bg-accent text-[var(--color-base)]`. The arbitrary-value bracket syntax sidesteps the built-in collision and actually targets the color token.

- `app/page.tsx` (View my resume)
- `app/about/page.tsx` (Get in touch — 2 places)
- `app/contact/page.tsx` (Send message)
- `app/resume/page.tsx` (Get in touch)
- `app/work/page.tsx` (Read Full Case Study)
- `app/work/[slug]/page.tsx` (Back to work)
- `app/work/heart-design-system/chapter-1/page.tsx` (Next Chapter)
- `app/work/heart-design-system/chapter-2/page.tsx` (Previous + Next)
- `app/work/heart-design-system/chapter-3/page.tsx` (Previous + Next)
- `app/work/heart-design-system/chapter-4/page.tsx` (Previous + Back to Overview)

## What was NOT changed

- `bg-base` is **fine** — Tailwind has no built-in `bg-base` utility, so it correctly maps to `var(--color-base)` for backgrounds.
- The `rgba(123, 94, 167, …)` literals in `app/labs/page.tsx`, `components/LabsHeader.tsx`, and the three `ParticleBackground*.tsx` files are inside `<canvas>` 2D-context calls (`ctx.fillStyle`, `ctx.strokeStyle`). CSS variables don't work in canvas context — these would need to be lifted via `getComputedStyle()` if you want them token-driven. They're not bugs, just not theme-following. Leave for a later pass.
- An `app/resume/Untitled` file shows up in `git status` — looks like it might have been accidentally added (zero-byte file, no extension). Probably safe to delete: `git rm app/resume/Untitled`.

## Naming gotcha to remember

The `base` color name in `tailwind.config.ts` collides with Tailwind's built-in `text-base` font-size utility. Workarounds:

1. **Use arbitrary syntax for text** — `text-[var(--color-base)]` (what we did).
2. **Use `bg-base`** for backgrounds (no collision there).
3. **Rename the token** — if you later decide to rename `base` → `paper` in the config, update the handoff doc and run `text-base` → `text-paper` everywhere it actually means the color. Not done now to keep the existing token name.

## Verification before push

```bash
# 1. Build clean?
npm run build

# 2. Visual check
npm run dev
# Open http://localhost:3000
# Toggle light/dark/auto via the header button on every page
# Confirm: button text is light on plum (light mode), dark on lifted plum (dark mode)

# 3. When happy, commit:
git add -u
git rm app/resume/Untitled  # if it's the empty file you don't want
git commit -m "Fix text-base/var(--color-base) collision in button color across 14 instances"

# 4. Push when ready
git push
```

## State check

- TypeScript: clean (`tsc --noEmit` passes).
- `text-base` remaining: 0.
- All token references intact in `globals.css` and `tailwind.config.ts`.
- Dark mode wiring intact (system query + `.theme-dark` override + no-FOUC script).
- `<Figure />` and `<ThemeToggle />` components present.
- `UI-KIT-HANDOFF.md` present.
