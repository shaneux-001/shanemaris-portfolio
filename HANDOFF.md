# Handoff

A single source of truth for what this project is, how it works, and what needs doing next. **Read this top-to-bottom before making any changes.** Last updated: 2026-04-26.

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

### Critical version gotchas (these have already broken the site once)

1. **Tailwind v4** does NOT read `tailwind.config.ts` the same way v3 did. Theme tokens go in CSS via `@theme` blocks, not in the JS config. Custom utility classes like `bg-accent`, `text-muted` will silently produce no styles if you assume v3 conventions.
2. **Next.js 16** has breaking changes from older versions. APIs, conventions, and file structure differ from anything in pretrained model knowledge. `node_modules/next/dist/docs/` has the actual current docs — read before assuming.
3. **`text-base` is a Tailwind built-in** for `font-size: 1rem`. Do NOT use it as a color utility, even after the theme is wired up. Use `var(--color-base)` directly or rename the token.

### File map

```
app/
  globals.css          ← design tokens (CSS vars)
  layout.tsx           ← root layout + header + font loading
  page.tsx             ← home
  about/page.tsx
  contact/page.tsx     ← form, posts to /api/contact
  resume/page.tsx
  work/
    page.tsx           ← project list — SERVER COMPONENT; reads taglines from MD files
    [slug]/page.tsx    ← case study detail — SERVER COMPONENT; reads full content from MD files
    heart-design-system/  ← multi-chapter case study (still 'use client', not yet migrated)
  labs/page.tsx        ← Konami-gated experimental section
  api/contact/route.ts ← contact form handler

components/
  HoverLink.tsx        ← 'use client' wrapper for opacity hover on links
  ProjectCardGrid.tsx  ← 'use client' grid of project cards with hover effects
  PasswordGate.tsx     ← used by /labs projects
  LabsHeader.tsx
  ParticleBackground*.tsx ← three canvas variants for /labs

content/
  work/
    homepage-v2.md
    my-account-redesign.md
    native-app-homepage.md
    vision-decommission.md
    ife-starling.md
    mobile-check-in.md
    homepage-redesign.md
    change-cancel-experience.md
    enhanced-reaccom.md
    project-oasis.md   ← labs / password-gated; not yet a routed page

lib/
  projects.ts          ← project slug registry (portfolio + labs)
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

### Tools available to me locally

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
3. **Tell me what version-sensitive thing you're touching** before you touch it (Tailwind v4, Next 16, font loading, etc.).
4. **One change at a time when refactoring.** No "while I'm here, I also …" sprees. Those are how the site got broken.
5. **Don't assume v3 Tailwind, old Next.js, or older React conventions.** When in doubt, ask me to confirm or check the docs.
6. **If something doesn't work**, the safety net is `git stash --include-untracked && git reset --hard <last-good-sha>`. Recent good SHAs: `7dbe3dc`, `6f0e39e`.

### Content editing workflow

Case study content lives in `content/work/*.md`. **Edit those files — not the TypeScript.** Format is:

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

## Another Section

More text.
```

After editing an MD file, run `npm run dev` and check the relevant `/work/[slug]` page. No build step, no TypeScript — the server component reads the file at request time.

### How I plan to use different model tiers

- **Haiku / Sonnet** — copy and content updates, MD file edits, simple changes, planning, review walkthroughs. Good for short focused tasks.
- **Opus** — multi-file refactors, design-system work, debugging weird bugs, complex planning. The expensive one — only when I really need it.

If you're a smaller model and I'm asking for a multi-file architectural change, push back. Suggest I plan it with you, then hand the plan off to Opus.

---

## Current state of the codebase (what's actually shipped)

**Trust this section, not the UI kit, when you're making changes.**

### Colors (in `app/globals.css`)

```css
--color-base:   #F7F5F2  /* warm paper, page bg */
--color-ink:    #1C1B17  /* primary text */
--color-muted:  #7A7470  /* secondary text — NOTE: 4.23:1 on base, fails AA at small sizes */
--color-accent: #7B5EA7  /* brand plum, CTAs, eyebrows */
```

Just these four. No accent-2, no divider, no error, no surface, no dark mode tokens. **The kit shows what could be added later — it's not what's there now.**

### Type

- `var(--font-inter)` — sans, locked at the `<html>` root so all elements inherit
- `var(--font-playfair)` — serif, default for h1–h6 via globals.css
- Loaded by `next/font/google` in `app/layout.tsx` — provides the `--font-inter` and `--font-playfair` CSS variables

### Style approach today

- **Inline styles via `style={{...}}`** on every element
- **Tokens referenced as `var(--color-...)` strings**
- **No Tailwind utility classes used yet** — the v4 theme isn't wired up, classes silently produce no output

When you write new code, match this pattern. Don't introduce Tailwind utility classes until v4 is properly configured.

### Server vs. client components

`app/work/page.tsx` and `app/work/[slug]/page.tsx` are **server components** (no `'use client'`). They read MD files via `lib/parseProjectMd.ts` using Node's `fs`. Interactive bits (hover effects) are delegated to `components/HoverLink.tsx` and `components/ProjectCardGrid.tsx`, which are client components. **Do not add `'use client'` back to the work pages.**

Most other pages (labs, heart-DS chapters, etc.) are still client components.

### Password / environment variables

Passwords are NOT in source code. Two env vars are required:

- `NEXT_PUBLIC_PORTFOLIO_PASSWORD` — master password for labs
- `NEXT_PUBLIC_OASIS_PASSWORD` — Project Oasis–specific password

Set both in `.env.local` (already gitignored) and in Vercel → Settings → Environment Variables. If these are unset, the labs password gate will accept an empty string.

Note: `NEXT_PUBLIC_*` vars are embedded in the client bundle at build time. This is "keep-casual-visitors-out" security, not cryptographic. Sufficient for a portfolio gate.

### Project registry (`lib/projects.ts`)

Portfolio projects (shown on `/work`):
- `heart-design-system` (featured)
- `homepage-v2` — Responsive Homepage (HDS launch, lead UXD)
- `my-account-redesign` — My Account (HDS consumer + A/B testing)
- `native-app-homepage` — Native App Homepage (first native HDS rollout)
- `vision-decommission` — Vision Decommission (ongoing)
- `ife-starling` — IFE Starling dark mode theme
- `mobile-check-in` — Check-in Flow Redesign (Leapfrog → Vision)
- `homepage-redesign` — Homepage 2014 (rebrand)
- `change-cancel-experience`
- `enhanced-reaccom`

Labs projects (Konami-gated):
- `design-system-v2-explorations`
- `accessibility-roi-research`
- `design-ops-thinking-pieces`
- `project-oasis` — unannounced, uses `NEXT_PUBLIC_OASIS_PASSWORD`

### `ui-kit.html`

A standalone HTML file at the project root. Open it directly in a browser — no build step needed. It's an exploration / target doc with token ideas, dark mode previews, Figure component spec, two-color riffs, and an accessibility audit. **Most of what's in there isn't implemented in the codebase.** Treat the kit as "what could be" — design fiction, not source.

### Custom domain & hosting

- `shanemaris.com` → Vercel
- Auto-deploys on every push to `main`
- Manual redeploys from Vercel dashboard

---

## Last session summary

**Date:** 2026-04-26 (evening — content + architecture session).

**What was done:**

**Password security fix**
- Removed hardcoded `'heart2024'` from `lib/password.ts` and `lib/projects.ts`.
- Master password now reads from `process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD`.
- Project Oasis uses a separate `process.env.NEXT_PUBLIC_OASIS_PASSWORD`.
- Action required before committing: add both vars to `.env.local` and Vercel dashboard.

**Project registry overhaul (`lib/projects.ts`)**
- Removed all hardcoded passwords from project entries.
- Added three new portfolio slugs: `vision-decommission`, `native-app-homepage`, `ife-starling`.
- Added `project-oasis` to `labsProjects` (password-gated, separate env var).
- Renamed / clarified existing slug titles to match real project names.

**Content system: MD files replace TypeScript**
- Created `content/work/` with 10 markdown files — one per project.
- Created `lib/parseProjectMd.ts`: server-side parser using Node's `fs` (no new npm packages).
- `lib/projectContent.ts` is now a deprecated stub — safe to delete after verifying build.

**Server component conversion**
- `app/work/page.tsx` → server component; reads taglines from MD files.
- `app/work/[slug]/page.tsx` → server component; reads full case study content from MD files; uses `await params` instead of `use(params)`.
- Created `components/HoverLink.tsx` — client component wrapping hover opacity on links.
- Created `components/ProjectCardGrid.tsx` — client component for the work grid hover effects.

**Working tree state (not yet committed):**
- `M lib/password.ts`
- `M lib/projects.ts`
- `M lib/readTime.ts`
- `M lib/projectContent.ts` (now just a deprecated stub)
- `M app/work/page.tsx`
- `M app/work/[slug]/page.tsx`
- `?? lib/parseProjectMd.ts`
- `?? components/HoverLink.tsx`
- `?? components/ProjectCardGrid.tsx`
- `?? content/work/*.md` (10 files)
- `?? HANDOFF.md` (this file)

**Before committing, verify:**
```bash
npm run dev     # check /work grid and 2–3 case study pages
npm run build   # must pass clean — server/client boundary is the main risk
npm run lint
```

---

## To-do

Order is intent, not strict priority — pick what fits the available time / model tier.

### 1. Verify the build is clean (do this first next session)

```bash
npm run build
```

The server/client component split introduced in this session is the most likely source of a build error. If `build` throws about `fs` or `path` in a client context, trace the import chain and fix before anything else.

### 2. Set environment variables

Before any commit: add to `.env.local` and Vercel dashboard:
- `NEXT_PUBLIC_PORTFOLIO_PASSWORD=...`
- `NEXT_PUBLIC_OASIS_PASSWORD=...`

### 3. Add imagery to case studies

Each `content/work/*.md` file has image placeholder divs in the rendered page. When you find assets on your hard drive, drop them in `public/work/[slug]/` and update the MD content or the page template to reference them. Per-project guidance on what to look for:

- `homepage-v2` — before/after screenshots, Figma exports, HDS component sticker sheets
- `my-account-redesign` — before/after, A/B test variant mockups, CTA explorations
- `ife-starling` — dark mode mockups, light/dark side-by-side of the same component
- `vision-decommission` — Vision vs HDS component comparison, migration tracker/audit output
- `mobile-check-in` — Leapfrog era vs Vision side-by-side on the same check-in step
- `homepage-redesign` — 2014 rebrand before/after (Wayback Machine has the pre-2014 version)
- `native-app-homepage` — App Store screenshots, phone frames with Figma designs

### 4. Project Oasis labs page

`project-oasis` is registered in `labsProjects` and has a content MD file, but there is **no routed page yet**. The labs section links to `/labs/project-oasis` which 404s. Build the page when ready — follow the same pattern as other labs project pages.

### 5. Font: light vs dark mode parity

Carry-over from prior session. Light mode is rendering some text with the wrong font family vs dark mode. Likely fixed by the globals.css font lock — verify visually with `npm run dev` before marking done.

### 6. UI kit — clean Open Questions section

`ui-kit.html` has a stale "Open questions" section with checkmarks for rolled-back explorations. Reset to a fresh list. Keep all other kit content.

### 7. WCAG 2.1 accessibility pass

`--color-muted` at #7A7470 hits only 4.23:1 on base — fails AA at small text sizes (4.5:1 required). Audit, document failures, propose token-level fix before changing anything.

### 8. Interactions / animations

Explore button ripples, refined hover states, light/glass/glow effects. Prototype in `ui-kit.html` first, then port winners to source.

---

## Don't do these (specific bear traps)

1. **Don't refactor inline styles to Tailwind utility classes.** Tailwind v4's theme isn't wired up. Classes will silently fail.
2. **Don't use `text-base` as a color utility** — it's a built-in font-size in Tailwind. Always use `var(--color-base)` for the color.
3. **Don't commit, push, or deploy on my behalf.** Suggest commands; I run them.
4. **Don't introduce new tokens** without first updating `app/globals.css` AND verifying they render in `npm run dev`.
5. **Don't touch the SVG logos** in `public/` unless I ask. Current state is intentional.
6. **Don't assume Next.js conventions you've seen before** — Next 16 has breaking changes. See AGENTS.md.
7. **Don't add `'use client'` to `app/work/page.tsx` or `app/work/[slug]/page.tsx`.** These are server components by design — they need to be to read MD files via `fs`. If you need interactivity on those pages, create a new client sub-component.
8. **Don't edit `lib/projectContent.ts`** — it's a deprecated stub. All content lives in `content/work/*.md`.

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
