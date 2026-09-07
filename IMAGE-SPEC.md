# Image Asset Punch List
**shanemaris.com · Refreshed 2026-09-07** (previous version generated 2026-05-01, now stale — rebuilt from a fresh audit of the actual current code, not carried forward)

Every dimension/aspect ratio below was read directly out of the component code (`aspect-[...]` classes), not estimated. Alt text shown for each slot is either already hardcoded in the code or generated dynamically from the case study's real content — use it as a content brief for what that image should actually show.

## How the wiring works

Every slot below uses the same pattern: the page checks `fs.existsSync()` for the exact filename at request time. Drop a correctly-named file into the folder, refresh the page — no dev-server restart, no code change, no deploy needed to see it locally. Filenames must match **exactly** (case-sensitive, `.jpg` extension expected by the code as written). (Home's lead-case-study card and About's portrait weren't wired to this pattern as of the first version of this refresh — both fixed 2026-09-07, commits `51f2ee3` and `f62bf1d`.)

Export at 2× the listed pixel size for retina displays. JPG at 80–85% quality or WebP at 80% — code currently expects `.jpg`, so convert before dropping in.

---

## Priority 1 — Live pages (visible on the site right now)

### Heart Design System — `public/work/heart-design-system/`

Landing page (`/work/heart-design-system`) — 4 chapter thumbnails, aspect **16:9**, ~1280×720px (`aspect-video`):
- [ ] `chapter-1-thumb.jpg` — "Chapter 1 — The Long Game"
- [ ] `chapter-2-thumb.jpg` — "Chapter 2 — Staying Alive"
- [ ] `chapter-3-thumb.jpg` — "Chapter 3 — The Moment It Clicked"
- [ ] `chapter-4-thumb.jpg` — "Chapter 4 — No Straight Lines"

Each chapter page — 1 hero, aspect **1.6:1**, ~1600×1000px:
- [ ] `chapter-1-hero.jpg`
- [ ] `chapter-2-hero.jpg`
- [ ] `chapter-3-hero.jpg`
- [ ] `chapter-4-hero.jpg`

Chapter section images, aspect **3:2** (`aspect-[1.5/1]`), ~1600×1067px — count varies per chapter:
- [ ] `chapter-1-section-1.jpg` — "Screenshot — Design artifact"
- [ ] `chapter-1-section-2.jpg` — "Process — Deck screenshot"
- [ ] `chapter-2-section-1.jpg` — "Lippincott Foundations — Color System"
- [ ] `chapter-2-section-2.jpg` — "Team Foundation — Early Partnership"
- [ ] `chapter-2-section-3.jpg` — "Multi-platform Expansion — iOS & Android"
- [ ] `chapter-3-section-1.jpg` — "Before / After — Gift Card Flow"
- [ ] `chapter-3-section-2.jpg` — "Component Library — Token Usage"
- [ ] `chapter-4-section-1.jpg` — "Org Chart — Stakeholder Map"
- [ ] `chapter-4-section-2.jpg` — "Resilience — Navigation Through Crisis"

**17 images total.**

### Proof Before Progress — `public/work/proof-before-progress/`

Landing page — 4 chapter thumbnails, aspect **16:9**, ~1280×720px:
- [ ] `chapter-1-thumb.jpg` — "The Belief"
- [ ] `chapter-2-thumb.jpg` — "The Reset"
- [ ] `chapter-3-thumb.jpg` — "The Vendor Path Not Taken"
- [ ] `chapter-4-thumb.jpg` — "The Weekend and the Proof"

Each chapter page — 1 hero, aspect **1.6:1**, ~1600×1000px (no section images — these 4 chapters don't have any section-image slots in the code):
- [ ] `chapter-1-hero.jpg`
- [ ] `chapter-2-hero.jpg`
- [ ] `chapter-3-hero.jpg`
- [ ] `chapter-4-hero.jpg`

**8 images total.**

### Figma Enterprise Migration — `public/work/figma-enterprise-migration/`

1 hero, aspect **16:9** (`aspect-[1/0.56]`), ~1600×900px:
- [ ] `hero.jpg` — "Figma Enterprise Migration — Hero"

7 section images (the MD has 8 `##` sections; the code renders an image *between* sections, not after the last one, so it's always section-count minus 1), aspect **3:2** (`aspect-[1.5/1]`), ~1600×1067px:
- [ ] `section-1.jpg` — appears after "The Axure detour"
- [ ] `section-2.jpg` — after "Forced into real versioning"
- [ ] `section-3.jpg` — after "Building the case"
- [ ] `section-4.jpg` — after "Procurement"
- [ ] `section-5.jpg` — after "Confirmation at Config"
- [ ] `section-6.jpg` — after "From 20 seats to an enterprise tool"
- [ ] `section-7.jpg` — after "Onboarding across the company"

**8 images total.**

### Home page — `public/`

1 image, aspect **4:3**, ~1600×1200px:
- [ ] `work/heart-design-system/heart-ds-hero.jpg` — lead-case-study card, links through to Heart Design System

### About page — `public/`

1 portrait, aspect **4:5**, ~1600×2000px:
- [ ] `about-portrait.jpg` — sits beside the intro copy, collapses above/below it on mobile

---

## Priority 2 — Hidden case studies (`public/work/[slug]/`)

These 9 have real content (`content/work/[slug].md`) and a registry entry already, just marked `hidden: true` in `lib/projects.ts` pending content polish + images. Same pattern as Figma Enterprise Migration above — 1 `hero.jpg` (16:9) + (section count − 1) `section-N.jpg` files (3:2) each.

| Slug | Sections | Section images needed |
|---|---|---|
| `homepage-v2` | 4 | 3 |
| `native-app-homepage` | 4 | 3 |
| `vision-decommission` | 4 | 3 |
| `ife-starlink` | 4 | 3 |
| `my-account-redesign` | 4 | 3 |
| `mobile-check-in` | 3 | 2 |
| `homepage-redesign` | 3 | 2 |
| `change-cancel-experience` | 4 | 3 |
| `enhanced-reaccom` | 4 | 3 |

**9 heroes + 27 section images = 36 images**, once these are ready to un-hide. Lower priority than Priority 1 — don't start here unless Priority 1 is done and there's appetite to also unhide new case studies.

---

## Total scope

- **Priority 1 (do this first):** 35 images across Heart Design System, Proof Before Progress, Figma Enterprise Migration, Home, and About.
- **Priority 2 (later, optional):** 36 images across 9 currently-hidden case studies.

---

## Dimension reference

| Use | Aspect ratio | Recommended export size (2×) | Tailwind class (source of truth) |
|---|---|---|---|
| Chapter/case-study thumbnail (landing grids) | 16:9 | 1280×720px | `aspect-video` |
| Chapter/case-study hero | 1.6:1 | 1600×1000px | `aspect-[1.6/1]` (HDS/PBP chapters) or `aspect-[1/0.56]` (≈16:9, `[slug]` hero) |
| Between-section image | 3:2 | 1600×1067px | `aspect-[1.5/1]` |
| Home lead-case-study card | 4:3 | 1600×1200px | `aspect-[4/3]` |
| About portrait | 4:5 | 1600×2000px | `aspect-[4/5]` |
