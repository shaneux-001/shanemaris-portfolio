# Roadmap — single source of truth

**Last updated: 2026-09-06.** This file is now the ONE place tracking what's left to do on this project. It supersedes:
- `HANDOFF.md`'s old `## To-do` section (now just points here — the rest of HANDOFF.md, the architecture/gotchas/file-map reference material, is still accurate and stays where it is)
- The Cowork artifact **"Shane Portfolio Roadmap"** (`~/Documents/Claude/Artifacts/shane-portfolio-roadmap/`) — last touched May 1, targeted a June 22 launch that's long past, and several of its own "DONE" claims turned out to be stale once the September redesign rebuilt large parts of the site. A stale banner has been added to it.
- Parts of `IMAGE-SPEC.md` — the asset infrastructure it describes is still accurate, but its exact dimensions are wrong in places now (see the Images section below). A stale banner has been added there too, pointing back here.

**Why this exists:** work happened in two bursts — April 19 through May 11 (foundation, then a big content/QA push), then a ~4-month gap, picking back up 2026-09-05. During the restart, some stale context from the spring got pulled in and briefly overwrote edits from the day before; that's been caught and fixed, but it's why this consolidation exists — one place, one history, so it doesn't happen again.

---

## Quality gate (AI-slop / positioning audit)

An external audit skill scored the live site **2026-09-05**: full report stored verbatim at [`qa/quality-gate-2026-09-05.md`](qa/quality-gate-2026-09-05.md) — read it in full before acting on anything below, this is just the condensed version.

**Score: 73/100 — Conditional Pass. Target: 85+/100.** This is meant to be re-run after changes to check for improvement — when that happens, save the new report as `qa/quality-gate-<date>.md` (don't overwrite this one) and update this section with the new score.

| Area | Score | Priority |
|---|---|---|
| AI Slop Fingerprint / Aesthetic Intent | 76 (pass, visual verification pending) | P1 |
| PM Hat / Information Architecture | 82 (pass) | P0 |
| Text & Copy | 79 (pass) | P0 |
| Leadership / Candidate Positioning | 67 (conditional pass) | P0 |

**⚠️ Decide during QA mode — two direct conflicts with recent work, not resolved yet:**
- [ ] **Keep or drop "Prompt Engineering" from top-level Expertise?** The audit's P0 "Sharpen Leadership Positioning" item recommends removing it unless strategically justified — but it was *added* to the Expertise/Skills list two nights ago (2026-09-05) at Shane's explicit request, replacing two other skills. Don't silently revert; needs a decision on whether the audit's positioning argument outweighs the original reason for adding it.
- [ ] **Reorder or rewrite the `/about` principles?** The audit's P0 "Replace Generic Principles" item flags the exact five current principles (including "Build tools not rules," "One bite at a time," "Constraints force creativity," "Less is more," "Design works for everyone") as generic/interchangeable and recommends replacing them with 3–4 specific, evidence-backed beliefs — a content rewrite, not the reordering done on 2026-09-06. That reorder work would likely get superseded entirely if this item is tackled.

**P0 (do first, if/when this gets tackled):**
- [ ] Executive Evidence Layer — compact mandate/scale/constraint/role/decisions/outcome/unresolved summary above the long-form narrative on Heart Design System, Figma Enterprise Migration, and Proof Before Progress.
- [ ] Sharpen Leadership Positioning — one primary leadership proposition instead of several competing identities; see the Prompt Engineering conflict above.
- [ ] Fix the Conversion Funnel — "Want to work together?" reads as freelancer/consultant framing rather than Director/VP hiring intent; audit suggests contextual CTAs instead (e.g. "Discuss a leadership role").
- [ ] Replace Generic Principles With Defensible Beliefs — see the conflict above.

**P1:**
- [ ] Copy/AI-writing lint pass (em dashes, "not just X but Y," "delve," "seamless," etc. — reduce dramatic short-sentence constructions ~30%).
- [ ] Preserve specificity — make sure existing hard metrics (2,706 seats, $150K vendor decision, NPS 21.43→52, etc.) stay visible and near the decisions they support; don't let a copy pass water them down.
- [ ] Make the portfolio demonstrate the systems thesis (e.g. expose some real system logic — token docs, component anatomy — somewhere on the site itself).
- [ ] Visual AI-slop audit — **MANUAL**, needs a real browser at ~1440/1280/768/390px in both themes (gradients, glow, glassmorphism, bento grids, card-in-card, uniform spacing, etc.).
- [ ] Typography audit — **MANUAL**.
- [ ] Spacing/rhythm audit — **MANUAL**.

**P2:**
- [ ] About page cleanup — reframe expertise as strategic capabilities, not a flat keyword list.
- [ ] Case-study navigation polish (orientation, prev/next, return-to-overview).

**Explicitly NOT requested yet:** the audit's own instructions say fix P0 before P1 before P2, prefer small intentional changes over redesign-by-template, never invent metrics/quotes/history to close evidence gaps, and mark anything needing Shane's subjective input as `NEEDS_OWNER_INPUT` rather than generating plausible filler. Nothing in this section should be implemented until Shane asks for it — stored here for the next QA pass.

---

## Needs manual verification

These are cases where an old doc claims something is DONE, but either the underlying code has since changed, or a current doc says otherwise. Don't trust either claim blind — check the live site/dashboard directly.

- [ ] **Vercel environment variables.** The May roadmap claims `RESEND_API_KEY`, `NEXT_PUBLIC_PORTFOLIO_PASSWORD`, `NEXT_PUBLIC_OASIS_PASSWORD` were confirmed set in Vercel + `.env.local`, and records a `/labs` password value as of that date. HANDOFF.md's more recent notes still list this as unconfirmed. Only Shane can check the Vercel dashboard directly — confirm all three are still set with values that match `.env.local`, and decide whether the recorded `/labs` password needs rotating (it's 4+ months old).
- [ ] **Contact form live-send test.** May roadmap claims this was tested and confirmed delivered via Resend. But `app/api/contact/route.ts` was rewritten in September (honeypot added, validation added, and a real bug fixed — the Resend SDK returns `{data, error}` rather than throwing, so a failed send used to get reported as success). The May test was against code that no longer exists. Send yourself a real test message through the live form and confirm it arrives.
- [ ] **Accessibility audit (WCAG 2.1 AA).** May roadmap claims this was done — focus-visible ring, contact form label associations, tag-pill contrast, Safari focus-ring fix. All of that was against the OLD design system (old tag pills, old `.project-card` classes) which no longer exists — the entire UI was rebuilt in the September Press Room redesign. None of those specific fixes necessarily carried over. Needs a fresh audit against the current site.
- [ ] **Resume date: 2011 vs. 2012 for the earliest SWA role.** May roadmap claims this was corrected to accurate month/year across the board. Then the whole resume was rewritten from scratch in the September fact-check audit (governed by `resume-source/Resume_Audit_Rules.md`), which locked in **Aug 2011** as the Contractor role's start — and HANDOFF.md's own notes from that audit still flag this exact date as "unclear if still wanted." Needs a direct answer from Shane: is Aug 2011 correct, or should it be 2012? (Don't confuse with the *Lead UX Designer* Mar–Dec 2022 range — that one Shane already confirmed separately as correct.)

## Still open (no conflicting claim, just not done)

**From tonight's session (2026-09-06), Shane's own calls to make:**
- [ ] Dark-mode **hover** ghost effect (nav links, secondary button) still reads as nearly invisible — same 2.5px/320ms magnitude issue the on-load heading effect had before it got bumped. Apply the same kind of fix, or leave it?
- [ ] Whether the downloadable `.md` resume should get the same spacing/breathing-room pass the PDF got (it was explicitly scoped PDF-only at the time).
- [ ] Custom brand fonts (Archivo / IBM Plex Mono) in the generated PDF resume — currently falls back to Helvetica/Courier after a `fontkit` crash on the downloaded TTFs. Only worth revisiting if exact typography match actually matters.
- [ ] Change the contact form success message from "I'll reply within a day" to 48 hours (`app/contact/page.tsx:141`) — Shane's current bandwidth doesn't support the same-day-ish promise.

**Content/assets — infrastructure is done, files just aren't there yet:**
- [ ] Real thumbnail *images* for Heart Design System's and Proof Before Progress's chapter cards (both now 2×2 grids, 16:9 slots) — still showing the diagonal-stripe placeholder. Drop files into `public/work/heart-design-system/` / `public/work/proof-before-progress/` with the existing `chapter-N-thumb.jpg` naming and they pick up automatically.
- [ ] Hero + section images for the other case studies under `content/work/*.md` (Figma Enterprise Migration has content live; the 9 hidden "HDS adoption stories" — homepage-v2, native-app-homepage, vision-decommission, ife-starlink, my-account-redesign, mobile-check-in, homepage-redesign, change-cancel-experience, enhanced-reaccom — have content + registry entries but are hidden until this is done and content's been polished).
- [ ] A commissioned/illustrated portrait for the About page — external dependency, was flagged back in May as something to start early since it's the longest lead time; never started.

**Site-wide QA/hardening — never done or only spot-checked:**
- [ ] Full responsive/mobile QA pass across the *entire* site at 375px/768px/1280px+ (tonight's changes were spot-checked individually as they shipped, not a systematic full-site pass).
- [ ] The 3 remaining `npm audit` high-severity vulnerabilities — fixing requires `--force`, which would bump Next.js `16.2.4` outside the stated version range. Flagged only, no action taken.
- [ ] Performance / Lighthouse pass — site still uses plain `<img>` tags everywhere, never migrated to `next/image`. Target Lighthouse 90+, check Core Web Vitals once real images are in place.
- [ ] Privacy policy — needed since the contact form collects name + email and none exists today. Cookie consent only becomes relevant if analytics gets added (see below).
- [ ] Stakeholder feedback review — external reads (a hiring-manager perspective, HR, a peer), distinct from Shane's own proofread/slop-detection pass which he's doing separately.

**Post-launch / lower priority, carried forward from the May roadmap, untouched since:**
- [ ] Analytics setup (GA4 or a privacy-friendly alternative like Plausible/Fathom) — track page views, form submissions, resume downloads.
- [ ] Project Oasis labs page — has `content/work/project-oasis.md` and a `labsProjects` registry entry (`lib/projects.ts`), but no route built yet (would be Konami-gated, under `/labs`).
- [ ] Ultra-wide layout optimization (e.g. Samsung G9 Odyssey, 32:9) — max-width/layout adjustments for extreme aspect ratios.
- [ ] Performance monitoring + error tracking (Sentry or similar), uptime monitoring — once there's real traffic to monitor.
- [ ] Launch announcement strategy — message for LinkedIn/email/personal network, a short list of people to share with before any public post.
- [ ] Blog content strategy + LinkedIn posting cadence — ongoing thought-leadership backlog, not urgent.

**Small flagged-but-not-acted-on items:**
- [ ] The Press Room design system's tracked-out all-caps eyebrow labels were flagged by `Resume_Audit_Rules.md`'s own "AI-generated-design tells" checklist during the Sept 5 audit. That design came from Shane's own Claude Design work, not something to unilaterally change — just worth knowing it was flagged, in case it comes up during his own slop-detection pass.
- [ ] The old PressMark "broken in dark mode" report (Phase 3, spring) — self-resolved or was a visual misread, hasn't reproduced since. Reopen only if it shows up again during a real QA pass.

## Superseded — no longer applicable, kept only for historical record

Everything below was marked "DONE" in the May roadmap, but the underlying work it refers to was fully replaced by the September Press Room redesign. Not open tasks — just noted so nobody goes looking for the old versions of these:

- Old Interaction System (underglow CTAs, highlight-sweep links, `ProjectCard` v2 hover, uniform terracotta tag pills) — replaced by the Press Room `Ghost`/`pr-cta`/`pr-hoverable` system.
- Old Dark Mode Toggle (footer sun/moon icon) — replaced by `PressThemeToggle`.
- Old Design Principles copy + 3-column grid on `/about` — rewritten again and reflowed (2-column, reordered) in the September work.
- Old Case Study Rewrites (May fact-check pass) — superseded by the September fact-check audit against `resume-source/Resume_Audit_Rules.md`, which is the current authority.
- Tag pills as visual chips on `/work` — `/work` is now a flat typographic list with no pill/badge markup at all; tags render as plain joined text.

## Timeline

The May roadmap targeted **launch June 22, 2026** with a week-by-week schedule through mid-June. That date has passed. No new target date has been set — worth deciding whether to pick a new one or keep this open-ended given Shane's reduced availability right now, rather than carrying the old dates forward silently.

## Doc map (for future reference, human or Claude)

| Doc | Status | What it's actually for now |
|---|---|---|
| `ROADMAP.md` (this file) | **Live** | The only place task status is tracked. Add new items here. |
| `HANDOFF.md` | **Live**, but its old `## To-do` section is stale — replaced with a pointer to this file | Stack info, critical gotchas, file map, style approach, bear traps, safety-net SHAs, and the phase-by-phase session history changelog. Still accurate technical/architectural reference. |
| Cowork artifact "Shane Portfolio Roadmap" | **Stale, banner added** | Historical snapshot of the May plan only. Do not use for current status. |
| `IMAGE-SPEC.md` | **Partially stale, banner added** | The `fs.existsSync`-based image-wiring pattern and file-naming convention it documents are still accurate. Its exact dimensions are wrong for: (1) the `/work` index — no longer has a card grid, so those image slots don't apply anymore; (2) Heart Design System's and Proof Before Progress's chapter thumbnails — spec says 4:3, actual current layout is 16:9. Needs a refresh pass once image-gathering actually starts. |

---

## Shane's additions

_(Add new items here as they come up — this section is yours.)_
