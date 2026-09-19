# Image asset spec — hidden case studies (Priority 2 only)

**Trimmed 2026-09-19.** Priority 1 (Heart Design System, Proof Before
Progress, Figma Enterprise Migration, Home, About) is done — real
photography is live everywhere, wired via `lib/imageDimensions.ts` +
`next/image` (all files are `.png`, not `.jpg` as an earlier version of
this doc said). See `ROADMAP.md`'s "Hidden case studies" checklist for
status/next-steps; this file now only holds the production detail that
checklist doesn't (exact filenames, aspect ratios, alt text) for
whenever one of the 9 hidden case studies gets picked up.

## How the wiring works

Same pattern as the live case studies: the page checks `fs.existsSync()`
for the exact filename at request time. Drop a correctly-named `.png`
into `public/work/<slug>/`, refresh the page — no dev-server restart, no
code change needed. Filenames must match **exactly** (case-sensitive).

Export at 2× the listed pixel size for retina displays.

---

## Priority 2 — Hidden case studies (`public/work/[slug]/`)

Each of these 9 has real content (`content/work/[slug].md`) and a
registry entry already, just marked `hidden: true` in `lib/projects.ts`
pending photography. Same pattern as the live `[slug]`-based case
studies — 1 `hero.png` + (section count − 1) `section-N.png` files.

Recommended export sizes below are a consistency guideline, not an
enforced Tailwind class — `CaseStudyImage` renders at each image's real
exported dimensions (no forced aspect-ratio box), so exporting
consistently sized images per case study is what keeps the page looking
intentional, not a code requirement.

| Slug | Sections | Hero (~16:9, ~1600×900px) | Section images (~3:2, ~1600×1067px) |
|---|---|---|---|
| `homepage-v2` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `native-app-homepage` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `vision-decommission` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `ife-starlink` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `my-account-redesign` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `mobile-check-in` | 3 | `hero.png` | `section-1.png` … `section-2.png` |
| `homepage-redesign` | 3 | `hero.png` | `section-1.png` … `section-2.png` |
| `change-cancel-experience` | 4 | `hero.png` | `section-1.png` … `section-3.png` |
| `enhanced-reaccom` | 4 | `hero.png` | `section-1.png` … `section-3.png` |

**9 heroes + 27 section images = 36 images total**, once these are ready
to un-hide. Alt text for each slot is generated dynamically from the
case study's own section headings — no manual alt-text list to maintain.
