# Handoff

Read this before touching anything. **To-do list lives in the Cowork roadmap artifact** ("Shane Portfolio Roadmap") — this file is project brief + session history only.

The roadmap artifact is a Cowork artifact stored at `~/Documents/Claude/Artifacts/shane-portfolio-roadmap/index.html` — it is **not** in the portfolio folder. Open it via the Cowork artifacts panel, not the filesystem.

Last updated: 2026-05-01.

---

## Stack

| What | Version | Notes |
|---|---|---|
| Next.js | **16.2.4** | App Router. Breaking changes from older versions — see AGENTS.md |
| React | 19.2.4 | |
| Tailwind CSS | **^4** (v4) | Via `@tailwindcss/postcss`. Theme NOT wired — see style approach below |
| TypeScript | ^5 | |
| Icons | `@phosphor-icons/react@^2.1.7` | v2, migrated from deprecated v1 |
| Hosting | Vercel | Project: `shanemaris-portfolio`, auto-deploys from `main` |
| Domain | shanemaris.com | |
| Fonts | Inter + Playfair Display | Loaded via `next/font/google` in `app/layout.tsx` |

---

## Critical gotchas — these have already broken the site

1. **Tailwind v4 theme is NOT wired.** Do not use utility classes (`bg-accent`, `text-muted`, etc.) — they silently produce nothing. All styles use `style={{}}` with `var(--color-...)` CSS variables. See `app/globals.css` for the full token set.

2. **`text-base` is Tailwind's font-size utility** (`font-size: 1rem`). Never use it as a color. Use `var(--color-base)` for the base color.

3. **Next.js 16 has breaking changes** from older versions. Don't assume conventions from pretrained knowledge. `node_modules/next/dist/docs/` has the real docs.

4. **Phosphor + RSC boundary.** `@phosphor-icons/react/dist/ssr` can render inline in server components, but the forwardRef object cannot be passed as a prop to a client component. The main `@phosphor-icons/react` import uses `createContext` and cannot be imported in a server component at all. Pattern: client components that need flexible icons accept a string key and own their own icon imports — see `components/NavLink.tsx`.

---

## File map

```
app/
  globals.css          ← full design token set v0.2 (colors, tints, spacing, radii, motion, shadows, dark-mode block)
  layout.tsx           ← root layout + header (Mark + wordmark + NavLink ×3)
  page.tsx             ← home (use client — CTAs use inline underglow)
  about/page.tsx       ← server component; eyebrow+icon lockups, expertise chips, HoverLink CTAs
  contact/page.tsx     ← server component; form posts to /api/contact
  resume/page.tsx      ← server component; HoverLink + HoverAnchor for hover effects
  work/
    page.tsx           ← SERVER COMPONENT — reads taglines from MD via fs. Do NOT add 'use client'.
    [slug]/page.tsx    ← SERVER COMPONENT — reads case study MD. Do NOT add 'use client'.
    heart-design-system/ ← multi-chapter case study (still 'use client')
  labs/page.tsx        ← Konami-gated; NOT aligned to design kit (low priority)
  api/contact/route.ts ← contact form API handler

components/
  Mark.tsx             ← 3×3 plum-gradient grid logo using currentColor
  NavLink.tsx          ← header nav link; string-key icon prop sidesteps RSC boundary
  HoverLink.tsx        ← hoverEffect: 'opacity' | 'highlight' | 'underglow' (default 'opacity')
  HoverAnchor.tsx      ← same API as HoverLink for plain <a> (downloads, mailto:, external)
  ProjectCardGrid.tsx  ← v2 hover (tint + border, no opacity drop) + optional tag pills
  PasswordGate.tsx
  LabsHeader.tsx
  ParticleBackground*.tsx ← canvas variants for /labs; use literal rgba() (canvas can't read CSS vars)

content/work/          ← case study MD files — edit these, not the TypeScript
lib/
  projects.ts          ← project registry; ProjectConfig has optional tags?: string[]
  parseProjectMd.ts    ← server-side MD parser
  password.ts          ← reads from env vars
  projectContent.ts    ← DEPRECATED — safe to delete after build verified

public/
  logo-{16,32,64,128}.svg, apple-touch-icon.svg, og-image.svg ← DO NOT TOUCH
  Shane_Maris_Resume.docx

ui-kit.html            ← standalone visual kit; open in browser, not a build target
HANDOFF.md             ← this file
AGENTS.md              ← Next.js 16 warnings; auto-loaded by Claude
CLAUDE.md              ← imports AGENTS.md
```

---

## Style approach

- **All styles via `style={{...}}`** with CSS custom properties — `var(--color-...)`, `var(--accent-tint-08)`, `var(--radius-sm)`, etc.
- **No Tailwind utility classes** — v4 theme isn't wired, they silently fail.
- Token set v0.2 in `app/globals.css`: 9 colors, 6 accent/accent-2 tints, 14-step spacing scale, 3 radii, motion durations + easing, shadow tokens. A `:root.theme-dark` mirror block is wired — adding that class to `<html>` flips the palette. No toggle UI yet.

---

## Server/client boundaries

`app/work/page.tsx`, `app/work/[slug]/page.tsx`, `app/about/page.tsx`, and `app/resume/page.tsx` are server components. They read MD files via Node `fs`. Never add `'use client'` to the work pages — push any interactivity into sub-components.

---

## Interaction patterns

Three hover effects, all reading from CSS tokens:

| Effect | Where used | Component |
|---|---|---|
| **Underglow** — accent bloom + 1px lift | Every CTA button site-wide | `HoverLink hoverEffect="underglow"` or inline `onMouseEnter` |
| **Highlight sweep** — tint block floods up from bottom | Every text link site-wide | `HoverLink hoverEffect="highlight"` or `HoverAnchor` |
| **Color shift** — muted → accent, no animation | Header nav only | `NavLink` |

---

## Bear traps

1. Don't refactor inline styles to Tailwind — Tailwind v4 theme isn't wired. Classes silently produce nothing.
2. Don't use `text-base` as a color utility — it's a built-in font-size. Use `var(--color-base)`.
3. **Never commit or push on Shane's behalf.** Suggest commands; he runs them.
4. Don't introduce tokens without updating `app/globals.css` first and verifying in `npm run dev`.
5. Don't touch SVGs in `/public/`. Use `components/Mark.tsx` for in-app brand surfaces.
6. Don't assume Next.js conventions from pretrained knowledge — see AGENTS.md.
7. Don't add `'use client'` to work pages. See server/client section above.
8. Don't edit `lib/projectContent.ts` — deprecated stub.
9. Don't import `@phosphor-icons/react` (main) in a server component — uses `createContext`, will crash. Use `/dist/ssr` for inline rendering, or push to a client component.
10. Don't pass a Phosphor forwardRef icon as a prop from server to client component. See gotcha #4 and `components/NavLink.tsx`.
11. **Don't create `content/work/heart-design-system.md`** — HDS uses dedicated TSX routes at `app/work/heart-design-system/`. The `[slug]` catch-all never fires for it. Content lives directly in the chapter page components.
12. **Image wiring pattern**: server components use `fs.existsSync` + conditional `<img>`; client components use `position: absolute` img with `onError` fallback. Never use `fs` in a client component.

---

## Safety net

```bash
git stash --include-untracked && git reset --hard <sha>
```

Recent good SHAs:
- `61cb569` — QA pass: fix lint errors, add Design Principles section to About ← **last known good main**

---

## Session history

### 2026-05-01 — Image wiring + HDS chapter route + asset spec

**What changed:** Image infrastructure fully wired. All placeholder divs replaced with real `<img>` slots across every page. HDS chapter route identified and handled separately from the MD-based system.

- **IMAGE-SPEC.md** (new): Complete image asset spec — 48 assets across all pages, per-page checklists with exact filenames and dimensions. Updated mid-session to include 17 HDS chapter assets (4 thumbs, 4 heroes, 9 section images).
- **`public/work/`** directory structure: Scaffolded 11 slug subdirectories with `.gitkeep` files — all slugs match IMAGE-SPEC.md and Figma file structure.
- **Image wiring — server components** (`app/work/page.tsx`, `app/work/[slug]/page.tsx`): `fs.existsSync` checks at request time. Placeholder divs replaced with conditional `<img>` tags — no dev-server restart needed when dropping images into folders.
- **Image wiring — client components** (`components/ProjectCardGrid.tsx`): Added `imageSrc?: string` prop; server passes value down, client renders `<img>` or placeholder. `imageSrc` computed via `fs.existsSync` in parent server component.
- **HDS chapter pages** (`app/work/heart-design-system/` + `chapter-{1-4}/`): Client components — used `position: absolute` + `onError` fallback pattern instead of `fs.existsSync`. Placeholder text always renders behind image; img hides itself on load error.
- **HDS chapter image naming convention**: `chapter-N-thumb.jpg` (640×429), `chapter-N-hero.jpg` (1600×896), `chapter-N-section-M.jpg` (1568×1045). All in `public/work/heart-design-system/`.
- **Figma Portfolio Assets** (`kQ2iOICG2spTgHEIvYm4ph`): 5 new sections added — HDS landing thumbs + chapters 1–4, each with correctly sized frames labeled with exact export filenames.
- **SVG logo fix**: Illustrator stripped fills from 9 scale rects in logo-16/32/64 and apple-touch-icon. Restored graduated plum fills matching logo-128.svg reference.
- **ife-starling → ife-starlink rename**: Full sweep across `content/work/`, `lib/projects.ts`, `lib/readTime.ts`. File renamed via git mv. IMAGE-SPEC.md updated.
- **Bear trap added**: HDS case study does NOT use the MD system. Content lives in `app/work/heart-design-system/chapter-{1-4}/page.tsx`. The `[slug]` catch-all never fires for that route.

**Commits**: Multiple — all pushed to `main` and live on Vercel.

---

### 2026-04-30 — UI kit v0.2 pull-through (Opus) + QA + doc consolidation

**What changed:** The portfolio was brought into full alignment with `ui-kit.html` v0.2. 21 files modified, 3 new components. TypeScript clean, lint clean (5 pre-existing warnings, not blocking).

- **Tokens** (`app/globals.css`): full v0.2 token set — 9 colors (accent-2 terracotta, surface, divider, control-border, error), accent + accent-2 tints, spacing scale, radii, motion, shadow tokens, dark-mode mirror block. Muted upgraded from `#7A7470` → `#6B655F` (WCAG-fixed).
- **Magic-number sweep**: replaced `rgba(123,94,167,x)` and `#E8E4DE` literals with named tokens across 11 files. Canvas/particle code left as literals intentionally.
- **Mark component** (`components/Mark.tsx`): 3×3 plum-gradient grid logo using `currentColor`. Wired into header next to wordmark.
- **Phosphor migration**: `phosphor-react@^1.4.1` (deprecated v1) → `@phosphor-icons/react@^2.1.7`. Applied kit icon patterns: eyebrow lockups, expertise chips, case study meta row, external-link arrows, header nav icons.
- **Interaction system**: Extended `HoverLink` with `hoverEffect` prop. Created `HoverAnchor.tsx`. Applied underglow to every CTA button, highlight sweep to every text link site-wide.
- **`NavLink.tsx`**: new component for header nav; string-key icon prop sidesteps RSC boundary; muted → accent on hover.
- **`ProjectCardGrid` v2**: calmer hover (tint + border, no opacity drop), optional tag pills. Added `tags?: string[]` to `ProjectConfig` in `lib/projects.ts`.
- **Doc consolidation**: roadmap artifact updated (Brand Identity + Interaction System checked off; new items added). HANDOFF.md slimmed to this lean brief.

**Commit status**: QA passed (browser walkthrough + static checks). Commit and push may still be pending — run `git status` to confirm.

---

### 2026-04-29 — QA + deploy

Added Design Principles section to `/about`, full lint pass, build verified. Committed `61cb569`, pushed, deployed.

---

### 2026-04-26 — Content + architecture

Password security fix, project registry overhaul, content system migrated to MD files, server component conversion of `/work` pages.

---

## To-do

**See the Cowork roadmap artifact** ("Shane Portfolio Roadmap") — it's the authoritative, prioritized list. Summary of open P1 items as of 2026-04-30:

- Confirm env vars in Vercel + `.env.local`
- Resume date correction: SWA 2011 → 2012 (web + DOCX)
- Contact form end-to-end test
- SEO + Open Graph (metadataBase warning is pre-existing)
- Responsive / mobile QA
- Accessibility audit (WCAG 2.1 AA)
- Stakeholder feedback pass before launch
