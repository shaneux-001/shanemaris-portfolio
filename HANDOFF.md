# Handoff

A single source of truth for what this project is, how it works, and what needs doing next. **Read this top-to-bottom before making any changes.** Last updated: 2026-04-30.

---

## Project context

### Stack — exact versions matter

| What                  | Version       | Notes                                                    |
|-----------------------|---------------|----------------------------------------------------------|
| Next.js               | **16.2.4**    | App Router. **Not** the Next.js you may know — see AGENTS.md. |
| React                 | 19.2.4        |                                                          |
| Tailwind CSS          | **^4** (v4)   | Via `@tailwindcss/postcss`. Theme conventions differ from v3. |
| TypeScript            | ^5            |                                                          |
| Hosting               | Vercel        | Project: `shanemaris-portfolio`, auto-deploys from `main` |
| Custom domain         | shanemaris.com|                                                          |
| Fonts                 | Inter + Playfair Display | Loaded via `next/font/google` in `app/layout.tsx` |
| Icons                 | **`@phosphor-icons/react@^2.1.7`** | Migrated from deprecated `phosphor-react@^1.4.1` this session |

### Critical version gotchas (these have already broken the site once)

1. **Tailwind v4** does NOT read `tailwind.config.ts` the same way v3 did. Theme tokens go in CSS via `@theme` blocks, not in the JS config. Custom utility classes like `bg-accent`, `text-muted` will silently produce no styles if you assume v3 conventions.
2. **Next.js 16** has breaking changes from older versions. APIs, conventions, and file structure differ from anything in pretrained model knowledge. `node_modules/next/dist/docs/` has the actual current docs — read before assuming.
3. **`text-base` is a Tailwind built-in** for `font-size: 1rem`. Do NOT use it as a color utility, even after the theme is wired up. Use `var(--color-base)` directly or rename the token.
4. **Phosphor + RSC boundary:** `@phosphor-icons/react/dist/ssr` icons can be **rendered** inline in server components, but they CANNOT be **passed as props** to client components (the forwardRef object isn't serializable across the boundary). The main `@phosphor-icons/react` import uses `createContext`, so it CANNOT be imported in a server component at all. Solution: client components that need icon flexibility (e.g. `NavLink.tsx`) own their own icon imports and accept a string key from the server. See `components/NavLink.tsx` for the pattern.

### File map

```
app/
  globals.css          ← FULL design token set (v0.2 of the kit)
  layout.tsx           ← root layout + header (Mark + wordmark + NavLink x3)
  page.tsx             ← home — CTAs use inline-JS underglow (already 'use client')
  about/page.tsx       ← eyebrows + icons, expertise chips with icons, HoverLink CTAs
  contact/page.tsx     ← form, posts to /api/contact — submit button has inline underglow
  resume/page.tsx      ← uses HoverLink + HoverAnchor for hover effects
  work/
    page.tsx           ← project list — SERVER COMPONENT; reads taglines from MD
    [slug]/page.tsx    ← case study detail — SERVER COMPONENT; meta row uses Phosphor icons
    heart-design-system/ ← multi-chapter case study (still 'use client', not yet migrated)
  labs/page.tsx        ← Konami-gated experimental section (NOT yet aligned to kit — low priority)
  api/contact/route.ts ← contact form handler

components/
  Mark.tsx             ← NEW · 3×3 grid logo as React component using currentColor
  NavLink.tsx          ← NEW · header nav link, owns its icon imports (string-key prop)
  HoverLink.tsx        ← UPDATED · adds hoverEffect: 'opacity' | 'highlight' | 'underglow'
  HoverAnchor.tsx      ← NEW · same API as HoverLink but for plain <a> (downloads, mailto:, external)
  ProjectCardGrid.tsx  ← UPDATED · v2 hover (tint + border) + tag pill scaffolding
  PasswordGate.tsx
  LabsHeader.tsx
  ParticleBackground*.tsx ← three canvas variants for /labs

content/
  work/                ← case study MDs (unchanged this session)

lib/
  projects.ts          ← UPDATED · adds optional tags?: string[] per ProjectConfig
  parseProjectMd.ts    ← server-side MD file parser (no new deps)
  password.ts          ← password validation; reads from env vars
  readTime.ts          ← read time estimates
  projectContent.ts    ← DEPRECATED; safe to delete after build verified
  konami.ts

public/
  logo-{16,32,64,128}.svg, apple-touch-icon.svg, og-image.svg
  Shane_Maris_Resume.docx

ui-kit.html            ← standalone visual exploration doc (open in browser, NOT a build target)
HANDOFF.md             ← this file
AGENTS.md              ← Next.js 16 warning, auto-loaded by Claude
CLAUDE.md              ← imports AGENTS.md
```

### Tools available locally

```bash
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (catches TS + build-time errors)
npm run lint     # eslint
git              # source control — manual commits only
```

Vercel: dashboard for deployment management, redeploy/rollback in UI. **No CLI tools auto-deploy.**

---

## How I work — and how I want models to work with me

I write changes locally. I review them with `npm run dev` before committing. I commit only what I've verified. I push when I'm ready to deploy.

### Rules for any Claude session reading this

1. **Never run `git commit` or `git push` for me.** Suggest the commands; let me run them.
2. **Always coach me through local review before suggesting a commit.** Tell me what to look at on what page.
3. **Tell me what version-sensitive thing you're touching** before you touch it (Tailwind v4, Next 16, font loading, Phosphor RSC boundary, etc.).
4. **One change at a time when refactoring.** No "while I'm here, I also …" sprees. Those are how the site got broken.
5. **Don't assume v3 Tailwind, old Next.js, or older React conventions.** When in doubt, ask me to confirm or check the docs.
6. **If something doesn't work**, the safety net is `git stash --include-untracked && git reset --hard <last-good-sha>`. Recent good SHAs: `61cb569`, `7dbe3dc`.
7. **Don't tweak-and-commit every little thing.** I'd rather review a coherent batch of work and commit it together than 12 micro-commits.

### Content editing workflow

Case study content lives in `content/work/*.md`. **Edit those files — not the TypeScript.** Format:

```
---
tagline: "Short card description (shown on /work grid)"
eyebrow: Lead UX Designer · Southwest Airlines
role: Lead UX Designer
timeline: 2022–2023
platform: "Web · southwest.com"
readTime: 4 minutes
---

Opening summary paragraph (shows above the first section heading).

## Section Heading

Section body text.
```

After editing an MD file, run `npm run dev` and check the relevant `/work/[slug]` page. No build step, no TypeScript — the server component reads the file at request time.

### How I plan to use different model tiers

- **Haiku / Sonnet** — copy and content updates, MD file edits, simple changes, planning, review walkthroughs, **QA passes** (see checklist at the bottom of this file). Good for short focused tasks.
- **Opus** — multi-file refactors, design-system work, debugging weird bugs, complex planning. The expensive one — only when I really need it.

If you're a smaller model and I'm asking for a multi-file architectural change, push back. Suggest I plan it with you, then hand the plan off to Opus.

### Safety net

Recent good SHAs:
- `61cb569` — QA pass: fix lint errors, add Design Principles section to About ← **current main**
- `7dbe3dc` — Add Phosphor Icons (legacy v1; superseded this session)

---

## Current state of the codebase (what's actually shipped vs. what's in the working tree)

**Trust this section over the UI kit when you're making changes.**

`main` is still at `61cb569`. The UI kit alignment work described below is sitting in the working tree, **not yet committed**. Run `git status` for the live picture.

### Design tokens (`app/globals.css`)

Full v0.2 token set is wired. Core palette:

```css
--color-base:           #F7F5F2  /* warm paper, page bg */
--color-ink:            #1C1B17  /* primary text */
--color-muted:          #6B655F  /* secondary text · WCAG-fixed (was #7A7470) */
--color-accent:         #7B5EA7  /* primary · plum · CTAs, eyebrows */
--color-accent-2:       #B8442B  /* secondary · terracotta · tag pills, warnings */

--color-surface:        #FFFFFF
--color-divider:        #E8E4DE
--color-control-border: #6B655F
--color-hairline:       #E8E4DE  /* legacy alias */
--color-error:          #B4452F  /* WCAG-fixed (was #D95F4B) */
```

Plus accent / accent-2 tints (`--accent-tint-08/10/15`, `--accent2-tint-08/10/15`), spacing scale (`--s-1` … `--s-32`), radii (`--radius-sm/md/lg`), motion (`--motion-fast/default/slow`, `--ease-default`), and elevation shadows (`--shadow-underglow-strong`, `--shadow-underglow-soft`, `--shadow-focus-ring`). All values mirror `ui-kit.html` v0.2.

A `:root.theme-dark` mirror block defines dark-mode token values. **No toggle UI yet** — adding `theme-dark` to `<html>` will flip the palette, but we don't expose that yet.

### Type

- `var(--font-inter)` — sans, locked at the `<html>` root so all elements inherit
- `var(--font-playfair)` — serif, default for h1–h6 via globals.css
- `var(--font-sans)` / `var(--font-serif)` — semantic aliases that map to the two faces above
- Loaded by `next/font/google` in `app/layout.tsx`

### Style approach today

- **Inline styles via `style={{...}}`** on every element
- **Tokens referenced as `var(--color-...)` / `var(--accent-tint-08)` / `var(--radius-sm)` etc.**
- **No Tailwind utility classes used yet** — the v4 theme isn't wired up, classes silently produce no output

When you write new code, match this pattern. Don't introduce Tailwind utility classes until v4 is properly configured.

### Server vs. client components

`app/work/page.tsx` and `app/work/[slug]/page.tsx` are **server components** (no `'use client'`). They read MD files via `lib/parseProjectMd.ts` using Node's `fs`. Interactive bits are delegated to client components: `components/HoverLink.tsx`, `components/ProjectCardGrid.tsx`. Server-component icon usage imports from `@phosphor-icons/react/dist/ssr` and renders inline. **Do not add `'use client'` back to the work pages.**

`app/about/page.tsx` and `app/resume/page.tsx` are also server components. They use HoverLink/HoverAnchor for hover effects (no inline JS handlers, since those need client).

### Interaction patterns (live in source)

Three hover effects, all reading from CSS tokens so dark mode flips them automatically:

- **Underglow** — soft accent bloom + 1px lift on hover. Used on **every CTA button** site-wide. Pulls `var(--shadow-underglow-strong)` (filled) or `var(--shadow-underglow-soft)` (outline).
- **Highlight sweep** — accent-tint block floods up from the bottom on hover. Used on **every text link** (back-to-work, social links, download resume, chapter back-links).
- **Color shift** — muted → accent on hover, no sweep. Used on **header nav** only (matches kit's `nav-link-icon` pattern).

Wired via:
- `components/HoverLink.tsx` — `hoverEffect="opacity"|"highlight"|"underglow"` (default `'opacity'`, callers untouched)
- `components/HoverAnchor.tsx` — same API for plain `<a>` (downloads, mailto:, external)
- `components/NavLink.tsx` — color-shift, owns icon imports via string key
- Inline `onMouseEnter`/`onMouseLeave` for the few elements that aren't anchors (e.g. contact form `<button>`)

### Icon usage (Phosphor v2)

Applied per the kit's documented patterns:
- **Eyebrow + icon lockups** — every section eyebrow on `/work`, `/work/[slug]`, `/about`, `/contact` has a small duotone icon (Briefcase, Sparkle, Stack, Envelope, ShareNetwork, etc.). Icon size: 14px duotone.
- **Case study meta row** (`/work/[slug]`) — Clock + read time, CalendarBlank + timeline, Monitor + platform.
- **Expertise chips** (`/about`) — each chip has a duotone icon (Stack, Gear, Devices, Compass, Users, DeviceMobile) tinted accent or muted per role.
- **External-link arrow** — `ArrowUpRight` after social links on `/contact`.
- **Header nav** — Briefcase / User / Envelope at 16px regular weight.

### Component additions

- **`components/Mark.tsx`** — the 3×3 plum-gradient logo as a React component using `currentColor`. Wired into the header next to the wordmark. The `/public/logo-*.svg` favicons are unchanged (handoff bear trap rule).
- **`components/HoverAnchor.tsx`** — sibling of HoverLink for plain `<a>` elements (downloads, mailto:, external URLs) where `next/link` is the wrong fit.
- **`components/NavLink.tsx`** — header nav link with built-in icon support via string key (sidesteps the Phosphor RSC boundary issue).

### Project registry (`lib/projects.ts`)

Now supports an optional `tags?: string[]` per project. When provided, `ProjectCardGrid` renders tag pills (first uses primary accent, rest use accent-2). Empty by default — populate per project to see pills appear.

Portfolio projects (shown on `/work`):
- `heart-design-system` (featured)
- `homepage-v2`, `my-account-redesign`, `native-app-homepage`
- `vision-decommission`, `ife-starling`
- `mobile-check-in`, `homepage-redesign`, `change-cancel-experience`, `enhanced-reaccom`

Labs projects (Konami-gated): `design-system-v2-explorations`, `accessibility-roi-research`, `design-ops-thinking-pieces`, `project-oasis`.

### Password / environment variables

Unchanged. Two env vars required:
- `NEXT_PUBLIC_PORTFOLIO_PASSWORD` — master password for labs
- `NEXT_PUBLIC_OASIS_PASSWORD` — Project Oasis–specific password

### `ui-kit.html`

Standalone HTML at the project root. Open it directly in a browser — no build step. After this session, the kit and the codebase are far more aligned than before, but the kit is still ahead in places (e.g. dark-mode toggle UI, two-color identity riffs, design-fiction explorations). Treat the kit as "what could be" / target — most of the kit is now reflected in source, but not all of it.

### Custom domain & hosting

- `shanemaris.com` → Vercel
- Auto-deploys on every push to `main`
- Manual redeploys from Vercel dashboard

---

## Last session summary

**Date:** 2026-04-30 — UI kit pull-through (Opus, multi-phase).

The portfolio has been brought into alignment with `ui-kit.html` v0.2. The session was split into 6 phases plus follow-up fixes, all worked locally, no commits. TS clean, lint clean, 5 pre-existing warnings (not from this work).

**Phase 1 — Tokens.** `app/globals.css` gained the kit's full token set: 9 colors (incl. accent-2 terracotta, surface, divider, control-border, error), accent + accent-2 tints (3 each), 14-step spacing scale, 3 radii, motion durations + easing, underglow shadow tokens, focus-ring shadow, plus a `:root.theme-dark` mirror block. Muted upgraded to WCAG-fixed `#6B655F`. Existing 4-token names stayed backwards-compatible.

**Phase 2 — Magic-number sweep.** Replaced every inline `rgba(123, 94, 167, 0.x)` with `var(--accent-tint-0x)` and every `#E8E4DE` with `var(--color-hairline)` across 11 files. Also `#D95F4B` → `var(--color-error)`. Pure renaming, zero visual change. Canvas/particle code intentionally left as literals (canvas API doesn't read CSS vars without `getComputedStyle` plumbing).

**Phase 3 — Mark + brand.** New `components/Mark.tsx` — the 3×3 plum-gradient grid as a React component using `currentColor` so it inherits whatever color is set on the parent. Wired into the header next to the wordmark per the kit's identity lockup. Favicons in `/public/` left untouched.

**Phase 4 — Iconography.** Migrated `phosphor-react@^1.4.1` (deprecated v1) → `@phosphor-icons/react@^2.1.7`. Applied the kit's four documented patterns: eyebrow + icon lockups, expertise chips with icons, case study meta row (clock/calendar/monitor), and external-link arrow indicators. Picked up the RSC boundary issue with `/dist/ssr` vs main package — see "Critical version gotchas" #4 above.

**Phase 5 — Interactions.** Re-extended HoverLink with `hoverEffect: 'opacity' | 'highlight' | 'underglow'`. Default stays `'opacity'`, all existing callers untouched. Shadows reference `var(--shadow-underglow-*)` so dark mode flips them automatically. Created `HoverAnchor.tsx` for plain `<a>` cases.

**Phase 6 — Patterns.** Upgraded `ProjectCardGrid` to the kit's project-card-v2: 1.5rem padding, calmer hover (background tint + accent border, no opacity drop), optional tag pills (first = primary accent, rest = accent-2). Added `tags?: string[]` to `ProjectConfig` — empty by default, populate per project to see pills.

**Follow-up fixes (same session):**
- Applied **underglow to every button** site-wide: home CTAs, /work featured CTA, footer CTAs, contact form submit, /resume CTA, all 4 Heart DS chapter Next/Previous/Back buttons.
- Applied **highlight sweep to every text link** site-wide: top back-to-work links, contact social links, download resume, /work/[slug] not-found inline link, all 4 chapter "Back to Heart DS" links.
- **Header nav rewrite**: created `components/NavLink.tsx`. All three (Work / About / Contact) now consistent muted → accent on hover (was: Contact accent, Work/About muted). Each gets a Phosphor icon (Briefcase / User / Envelope at 16px regular).
- **Eyebrow flex bug**: every section eyebrow `<p>` was using `display: 'inline-flex'`, which caused the eyebrow on `/work/[slug]` to render on the same line as the back-to-work link. Changed all 7 eyebrow `<p>` elements to `display: 'flex'` + `width: 'fit-content'` (block-level flex container, sized to content).
- **Phosphor RSC boundary fix**: solved a runtime error where `app/layout.tsx` (server) was importing icons from `/dist/ssr` and passing them as props to `NavLink` (client) — the forwardRef can't cross the boundary. Fix was to have `NavLink` own its icon imports via a string-key map. See "Critical version gotchas" #4.

**Files changed:** 21 modified, 3 new (`Mark.tsx`, `HoverAnchor.tsx`, `NavLink.tsx`).

**Status:** TS clean (`tsc --noEmit` passes), lint clean (0 errors, 5 pre-existing warnings — not from this work, not blocking). **Not yet committed** — see QA checklist below before pushing.

---

**Previous session (2026-04-29) — interactions + iconography exploration (NOT shipped):**

A prior session prematurely added underglow + highlight-sweep code directly to source before the design-system foundation was in place. That work was reverted at the start of the 2026-04-30 session and the same patterns were re-implemented properly on top of the new token + interaction layer. The exploration that informed the decisions remains in `ui-kit.html` (sections 05.5 Icons and 05.7 Interactions & elevation).

**Previous session (2026-04-29) — QA + deploy:** Design Principles section added to `/about`; full lint pass; build verified; commit `61cb569` pushed and deployed.

**Previous session (2026-04-26) — content + architecture:** Password security fix, project registry overhaul, content system migration to MD files, server component conversion of work pages.

---

## To-do

Order is intent, not strict priority — pick what fits the available time / model tier.

### 1. Run the QA checklist below, then commit and push the UI kit alignment

See the checklist at the bottom of this file. If everything passes, the suggested commit is one cohesive message — see "Suggested commit" below.

### 2. Finalize Design Principles copy

Filler text is live in the 4-column grid on `/about`. When you've landed on your real principles, update the array in `app/about/page.tsx` — each entry has a `title` and `copy` field. Add more cards to the array if you go beyond 4; the grid will need a column count adjustment.

### 3. Populate project tags

`lib/projects.ts` now supports `tags?: string[]` per project. Empty by default. Populate per-project tags (e.g. `["Web", "Account"]`, `["Mobile", "iOS", "Android"]`) to render pill rows on the v2 project cards. First tag uses primary accent, rest use accent-2.

### 4. Set environment variables (if not already done)

Confirm both vars are in `.env.local` and Vercel dashboard:
- `NEXT_PUBLIC_PORTFOLIO_PASSWORD=...`
- `NEXT_PUBLIC_OASIS_PASSWORD=...`

### 5. Add imagery to case studies

Each `content/work/*.md` file has image placeholder divs. When you find assets, drop them in `public/work/[slug]/` and update the MD content or the page template. Per-project guidance:

- `homepage-v2` — before/after screenshots, Figma exports, HDS component sticker sheets
- `my-account-redesign` — before/after, A/B test variant mockups, CTA explorations
- `ife-starling` — dark mode mockups, light/dark side-by-side
- `vision-decommission` — Vision vs HDS comparison, migration tracker output
- `mobile-check-in` — Leapfrog era vs Vision side-by-side
- `homepage-redesign` — 2014 rebrand before/after (Wayback Machine)
- `native-app-homepage` — App Store screenshots, phone-frame Figma exports

### 6. Project Oasis labs page

`project-oasis` is registered in `labsProjects` and has a content MD file, but there is **no routed page yet**. Build the page when ready — follow the same pattern as other labs project pages.

### 7. UI kit — clean Open Questions section

`ui-kit.html` section 08 still references decided/rolled-back explorations. Reset to a fresh list. Keep all other kit content.

### 8. Dark mode toggle UI

Tokens are wired (`:root.theme-dark` block in globals.css). Add a UI affordance (likely in the header) to toggle the class on `<html>` and persist preference. Out of scope this session.

### 9. Labs / particle / canvas alignment

`app/labs/page.tsx`, `app/particle-demo/page.tsx`, `app/particle-test/page.tsx`, and `components/ParticleBackground*.tsx` still use literal `rgba(123, 94, 167, 0.x)` because canvas paint doesn't read CSS vars without `getComputedStyle` plumbing. Optional follow-up: add a small utility that reads tokens at runtime and feeds them to canvas.

### 10. WCAG 2.1 accessibility pass

`--color-muted` was upgraded to `#6B655F` (4.5:1 on base, passes AA). Other potential issues: contrast of accent-2 on tints, focus indicators consistency, keyboard nav order. Audit and document failures before changing tokens.

### 11. ~~Interactions / iconography / tokens / mark~~ — done this session

---

## Don't do these (specific bear traps)

1. **Don't refactor inline styles to Tailwind utility classes.** Tailwind v4's theme isn't wired up. Classes will silently fail.
2. **Don't use `text-base` as a color utility** — it's a built-in font-size in Tailwind. Always use `var(--color-base)` for the color.
3. **Don't commit, push, or deploy on my behalf.** Suggest commands; I run them.
4. **Don't introduce new tokens** without first updating `app/globals.css` AND verifying they render in `npm run dev`.
5. **Don't touch the SVG logos** in `/public/` unless I ask. Current state is intentional. The in-page Mark component (`components/Mark.tsx`) is the one to use for in-app brand surfaces.
6. **Don't assume Next.js conventions you've seen before** — Next 16 has breaking changes. See AGENTS.md.
7. **Don't add `'use client'` to `app/work/page.tsx` or `app/work/[slug]/page.tsx`.** These are server components by design — they need to be to read MD files via `fs`. If you need interactivity on those pages, create a new client sub-component.
8. **Don't edit `lib/projectContent.ts`** — deprecated stub. All content lives in `content/work/*.md`.
9. **Don't import from `@phosphor-icons/react` (main) in a server component.** That package uses `createContext` and will crash module evaluation. Use `@phosphor-icons/react/dist/ssr` for inline-rendered icons in server components, or push the icon usage down into a client component.
10. **Don't pass a Phosphor forwardRef icon component as a prop from a server component to a client component.** Even with `/dist/ssr`, the forwardRef object isn't serializable across the RSC boundary. If a client component needs configurable icons, have it own its imports and accept a string key — see `components/NavLink.tsx`.

---

## Quick verification checklist before I commit

```bash
npm run dev          # visual check at http://localhost:3000 — every page I changed
npm run build        # catches TypeScript + production-only errors
npm run lint         # catches obvious code issues
git status           # confirm what changed
git diff --stat      # size sanity check
git diff <file>      # review specific changes
```

When I'm satisfied:

```bash
git add -A           # or specific files
git commit -m "..."  # I write the message
git push             # triggers Vercel deploy
```

### Suggested commit (if QA passes)

A single coherent commit. Example message:

```
Pull UI kit v0.2 through to source: tokens, mark, icons, interactions

- Add full design token set to globals.css (colors, accent-2, tints,
  radii, spacing, motion, shadows, dark-mode mirror; WCAG-fixed muted)
- Sweep magic-number rgbas + #E8E4DE across 11 files to named tokens
- Add components/Mark.tsx (3x3 grid logo using currentColor) + wire to header
- Migrate phosphor-react v1 → @phosphor-icons/react v2; apply kit icon
  patterns (eyebrow lockups, meta rows, expertise chips, nav)
- Extend HoverLink with hoverEffect; add HoverAnchor for plain <a>;
  add NavLink for header (string-key icon to sidestep RSC boundary)
- Apply underglow to every CTA, highlight sweep to every text link
- Upgrade ProjectCardGrid to v2 (calm hover, optional tag pills); add
  tags?: string[] to lib/projects.ts
```

---

## QA checklist — for a smaller model to pick up

**Goal:** verify the working tree is safe to commit and push, with no regressions.

**Mode you're in:** read-only verification. **Do not refactor, "improve," or fix lint warnings unless they're errors.** Pre-existing warnings are documented and not blocking. If something looks broken, **report it** rather than fixing it on the spot — Shane will decide what to do.

**Steps in order:**

### A. Static checks (no browser yet)

Run from the project root:

```bash
npx tsc --noEmit
```
Expect: **0 errors**, no output. If anything errors, stop and report.

```bash
npm run lint
```
Expect: **0 errors, 5 warnings**. The warnings should be in `app/labs/page.tsx` (`PasswordGate`, `idx`), `app/api/contact/route.ts` (`error`), and `components/PasswordGate.tsx` (`Link`, `projectSlug`). All pre-existing — do not touch.

```bash
npm run build
```
Expect: **build succeeds**, all routes compile, TypeScript clean. One non-blocking warning (`metadataBase not set`) is pre-existing and acceptable. If the build fails, stop and report the actual error.

```bash
git status
```
Expect: 21 modified files plus 3 new files (`components/Mark.tsx`, `components/HoverAnchor.tsx`, `components/NavLink.tsx`). HANDOFF.md modified.

### B. Browser walkthrough

Start dev:

```bash
npm run dev
```

Hard-refresh `http://localhost:3000` (Cmd+Shift+R). Open the browser dev tools Console — **flag any red errors** (warnings are usually fine).

For each page below: load it, check the **layout**, then **hover the listed elements** and confirm the listed effect.

#### `/` (home)
- Layout: header shows the 3×3 plum mark next to "Shane Maris" wordmark. Nav reads Work / About / Contact, all in muted grey.
- Hover **"View my resume"** button → soft purple glow appears below + button lifts ~1px (underglow effect).
- Hover **"About me"** outline button → faint accent tint fills the bg + same lift + softer glow.
- Hover any **nav link** (Work / About / Contact) → text shifts from grey to plum (no underglow, no sweep).

#### `/work`
- Layout: "Featured Case Study" eyebrow has a small briefcase icon to its left.
- Hover **"Read Full Case Study"** button → underglow.
- Hover any **project card** in the grid below → card gets a faint accent tint background + accent-tint border, lifts slightly. NO opacity drop.

#### `/work/heart-design-system`
- Layout: page loads, no broken sections, no console errors.
- Hover the chapter cards → existing card hover (translate up).

#### `/work/heart-design-system/chapter-1` through `chapter-4`
- Layout: top **"← Back to Heart DS"** sits on its own line above the eyebrow/title.
- Hover **"← Back to Heart DS"** → accent-tint block sweeps up from the bottom (highlight sweep).
- Hover **"Next Chapter →"** / **"Previous Chapter"** / **"Back to Overview"** buttons → underglow.

#### `/work/[any other slug]` — e.g. `/work/my-account-redesign`
- Layout: top **"← Back to work"** sits on its own line, eyebrow appears below it on its own line (NOT inline next to the back link).
- Eyebrow has a small briefcase duotone icon.
- Meta row directly below the title shows clock + read time, calendar + timeline, monitor + platform — each as a single inline group with the icon to the left.
- Hover **"← Back to work"** at the top → highlight sweep.
- Scroll to the bottom — hover **"Back to work"** CTA in the footer → underglow.

#### `/about`
- Layout: three section eyebrows ("About", "Design Principles", "Experience", "Expertise") each have a small duotone icon to the left.
- Expertise section: 6 chips — each has a small duotone icon (Stack / Gear / Devices / Compass / Users / DeviceMobile) tinted accent or muted.
- Hover the **"Get in touch"** CTA at the top of the page → underglow.
- Hover the **"Get in touch"** CTA at the bottom of the page → underglow.

#### `/contact`
- Layout: "Contact" eyebrow has an envelope icon. "Find me online" eyebrow has a share icon.
- Social links show: LinkedIn (with arrow-up-right), Twitter (with arrow-up-right), envelope + email address.
- Hover the **submit button** ("Send message") → underglow.
- Hover **LinkedIn** / **Twitter** / **email** social links → highlight sweep behind the text.

#### `/resume`
- Layout: page loads, header + sections render normally.
- Hover **"Download resume"** link → highlight sweep.
- Scroll to bottom — hover **"Get in touch"** CTA → underglow.

#### `/labs` (Konami-gated; skip if you don't have access)
- Just confirm no console errors. This page is intentionally NOT aligned to the kit yet.

### C. What to flag

After the walkthrough, report **only** if you see any of:
- **TS errors** from `tsc --noEmit`
- **Lint errors** (not warnings)
- **Build failure** from `npm run build`
- **Red runtime errors in browser console** on any page above
- **Broken layout** — overlap, content cut off, text on wrong line (especially anywhere an eyebrow ends up sharing a line with another element)
- **Hover effect missing** on any of the buttons / text links listed above
- **Hover effect on the wrong element** — e.g. a nav link doing the highlight sweep instead of color shift
- **Visual regression** on any page that wasn't supposed to change (test the one or two paragraphs of body text on case studies, the resume layout, etc.)

If everything passes: report "QA clean — ready to commit" and quote the suggested commit message above.

If something fails: report exactly what you saw, on which page, with which action. Do not attempt to fix unless the failure is a clear, isolated typo. Architectural decisions are Opus-tier.
