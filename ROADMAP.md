# Roadmap — single source of truth

**Last updated: 2026-09-06.** This file is now the ONE place tracking what's left to do on this project. It supersedes:
- `HANDOFF.md`'s old `## To-do` section (now just points here — the rest of HANDOFF.md, the architecture/gotchas/file-map reference material, is still accurate and stays where it is)
- The Cowork artifact **"Shane Portfolio Roadmap"** (`~/Documents/Claude/Artifacts/shane-portfolio-roadmap/`) — last touched May 1, targeted a June 22 launch that's long past, and several of its own "DONE" claims turned out to be stale once the September redesign rebuilt large parts of the site. A stale banner has been added to it.
- `IMAGE-SPEC.md` was refreshed 2026-09-07 and is now the accurate, current image punch list (was previously flagged stale here — that's resolved now).

**Why this exists:** work happened in two bursts — April 19 through May 11 (foundation, then a big content/QA push), then a ~4-month gap, picking back up 2026-09-05. During the restart, some stale context from the spring got pulled in and briefly overwrote edits from the day before; that's been caught and fixed, but it's why this consolidation exists — one place, one history, so it doesn't happen again.

---

## Quality gate (AI-slop / positioning audit)

**Active report (2026-09-07):** recalibrated to the correct target (Design Manager / Senior Design Manager, not Director/VP) — full text at [`qa/quality-gate-2026-09-07-manager-recalibration.md`](qa/quality-gate-2026-09-07-manager-recalibration.md), read it in full before acting on anything below, this is just the condensed version. Supersedes the original 2026-09-05 report ([`qa/quality-gate-2026-09-05.md`](qa/quality-gate-2026-09-05.md), kept only for historical record — it was scored against the wrong job-target level).

**Score: 84/100 — STRONG PASS for primary target. Target after remediation: 90+/100.** Re-run after changes and save future reports as `qa/quality-gate-<date>-<label>.md` (don't overwrite this one), updating this section with the new score.

**Strategic rule, stated explicitly in the report:** do not optimize this site to look like large-enterprise VP experience. Position as *"an experienced design leader who understands the systems, teams, and infrastructure behind high-performing product design organizations."* Design Systems/Ops should stay the **edge**, not become the **cage**. Role-fit verdicts range from "exceptional fit" (Design Systems/Ops Manager) down to "portfolio does not currently establish required scope" (VP Product Design, large enterprise) — the site already reads as a strong Manager/Sr Manager candidate as-is.

**Second, independent report (2026-09-09):** a narrative hiring-manager-style review, stored verbatim at [`qa/executive-hiring-review-2026-09-09.md`](qa/executive-hiring-review-2026-09-09.md) — stored per Shane's instruction ("capture this for polish, I think it's in a decent spot"), **not implemented, same hold as everything else in this section.** Written to a different rubric than the report above, so don't try to merge the two scorecards mechanically. Headline points: verdict is "Advance" but flags the same People-Leadership gap as the primary report (independent confirmation); pushes hardest on restructuring case studies around judgment/decisions rather than chronology, and reframing the homepage thesis toward "I build the systems that let design orgs scale" rather than "I design systems that scale." **Calibration flag:** the report's own closing line says its most aggressive recommendations (executive/CDO-level thesis, "argument for hiring you as a transformation leader") should be treated as mandatory only if targeting Director/VP — Shane is targeting Manager-level (see the strategic rule above), so weigh this report's suggestions accordingly, don't apply them at face value. One likely false positive already checked: the report reads "WorkWorkWork"/"VIEW RESUMEVIEW RESUMEVIEW RESUME" as suspicious repetition — this is almost certainly just the tool reading raw DOM text, which includes both the wide-row and narrow-row responsive variants that `.pr-row-wide`/`.pr-row-narrow` toggle via CSS visibility (a real visitor only ever sees one) — verify visually before treating as a real issue.

**Companion data point, same evening:** [slop-detect.com](https://slop-detect.com) scored the live site **5/100 ("Clean," grade A, 1 of 27 patterns flagged)** — solid outside confirmation that tonight's font-stack and copy work is landing.

| Dimension | Score | Status |
|---|---|---|
| Specificity / Evidence | 94 | Exceptional — preserve |
| Design Systems / Ops Leadership | 93 | Exceptional — preserve |
| Organizational Thinking | 91 | Strong — preserve |
| IA / User Journey | 87 | Strong pass |
| Product Judgment | 85 | Strong — preserve |
| Leadership Signal | 85 | Strong pass for target |
| Copy / Sincerity | 84 | Strong pass |
| AI Slop / Aesthetic Intent | 80 | Pass |
| Executive Scanability | 73 | Needs work |
| Positioning Clarity | 72 | Needs work |
| **People-Leadership Evidence** | **64** | **Primary gap** |

**⚠️ The P0 item that needs Shane, not just code — read before touching anything else here:** People-Leadership Evidence is the headline gap (proves systems/tooling/governance leadership far more than leadership of *people* — coaching, delegating, developing others, handling conflict/underperformance). The report is explicit: **do not fabricate a management case study or invent people-leadership moments — mark anything missing `NEEDS_OWNER_INPUT` instead of generating plausible filler.** This lines up exactly with what Shane said directly in this session (no solid direct-management experience beyond one contractor relationship) — so real examples may genuinely be thin. Before touching this item, ask Shane what real coaching/delegation/conflict moments exist to surface, rather than assuming or writing around the gap.

**P0:**
- [ ] **Add People-Leadership Evidence** — see the callout above. Needs ≥3 real examples (coaching, delegation, conflict/prioritization) surfaced across About/case studies/Resume/beliefs — `NEEDS_OWNER_INPUT` if the material isn't there.
- [ ] **Reframe the Leadership Proposition** — homepage's "I design systems that scale" reads as Design Systems architect before Design Manager. Report's directional (not mandatory) example: *"I build the teams and systems behind better product design."* Needs to connect people + systems + product quality without overclaiming VP/Director scope.
- [ ] **Rebalance "Systems Leader" vs. "Design Leader"** — across Home/About/Work/Resume/Expertise, "Design Leader who happens to be unusually strong at systems" should read as the primary identity, not "the Figma/Systems/Ops person." Confirms the "Prompt Engineering" drop was directionally correct (report's own acceptance criteria: "not presented as a top-level leadership competency" — already resolved further, since it's now removed entirely, commit `ac788d2`).
- [ ] **Replace Generic Principles With Leadership Beliefs** — same underlying item as before (the 5 current `/about` principles are still flagged as generic), refined direction: 3–4 beliefs revealing how Shane thinks about teams, systems, quality, autonomy, adoption, constraints, and management specifically — not just design philosophy. Supersedes the reorder-only work done 2026-09-06.

**P1:**
- [ ] Case-study scanability — compact ROLE/PROBLEM/SCALE/WHAT CHANGED orientation block above the long-form narrative on Heart Design System, Figma Enterprise Migration, Proof Before Progress (readable in ~45–60s), without becoming a "seven-card executive dashboard." Same intent as the old "Executive Evidence Layer" item, lighter-weight framing.
- [ ] Preserve the human narrative — the candid admissions/failures/unresolved-outcomes voice is the site's strongest trust signal; explicit anti-AI test in the report: *"could this sentence have been written by any designer about any project?"* — if yes, cut or sharpen it.
- [ ] Reduce repetitive cinematic copy ~25–30% (short dramatic one-line conclusions, "It wasn't X. It was Y." pattern) — don't remove all personality, just the repetition.
- [ ] Preserve specificity — same as before (2,706 seats, $150K vendor decision, NPS 21.43→52, etc. stay visible near their decisions).
- [x] ~~Fix the funnel~~ — mostly done 2026-09-07, commit `34bb2a7` (button "GET IN TOUCH" → "SAY HELLO"). Report calls this "a smaller issue than originally assessed" for this target level and lists "Let's talk" among its own directional examples too — either is fine per the report. "Want to work together?" (the heading) and the Contact page's own H1 ("Get in touch") still unchanged.
- [ ] About page rebuild — should answer "what kind of leader," "how do they lead people," "what orgs problems are they unusually good at," "what do they believe," structured perhaps as Build the team / Build the practice / Build the system (report's own suggestion, not mandatory) — only if it matches Shane's real experience.
- [ ] Make the portfolio demonstrate systems thinking on the site itself (token docs, component anatomy, etc.) — unchanged from before.
- [ ] Visual AI-slop audit — **MANUAL**, 1440/1280/768/390px, both themes.
- [x] ~~Typography audit~~ — done 2026-09-09, commit `2f4808b`. Font stack changed from Inter + Archivo + IBM Plex Mono + Playfair Display to just Archivo + IBM Plex Mono — Inter and Playfair are both individually common "looks AI-generated" tells, and the safe-body+serif-accent combo was its own recognizable template formula. Compared options in a live Artifact against real site content before deciding. Also found and fixed a real bug live on production since 2026-09-05: a circular CSS custom-property alias silently collapsed every heading/eyebrow to Inter sitewide — see the commit for the full story.
- [ ] Spacing/rhythm audit — **MANUAL**.

**P2:**
- [ ] Case-study navigation polish (orientation, prev/next, return-to-overview) — unchanged from before.

**Explicit guardrails from the report, worth repeating:** never invent metrics/quotes/stories/people-management examples or executive scope to close a gap; never pretend Manager/Sr Manager experience is VP scope; mark anything needing Shane's real input `NEEDS_OWNER_INPUT` and anything needing a real browser look `MANUAL_VERIFY` rather than generating plausible filler either way. Fix P0 before P1 before P2. Nothing in this section should be implemented until Shane asks for it — stored here for the next QA pass.

---

## Needs manual verification

These are cases where an old doc claims something is DONE, but either the underlying code has since changed, or a current doc says otherwise. Don't trust either claim blind — check the live site/dashboard directly.

- [x] ~~Vercel environment variables.~~ — resolved 2026-09-08: Shane checked the dashboard directly. All 3 present with correct names — `RESEND_API_KEY` (Production + Preview, marked sensitive/write-only, added Apr 20), `NEXT_PUBLIC_PORTFOLIO_PASSWORD` and `NEXT_PUBLIC_OASIS_PASSWORD` (All Environments, last touched May 1). Both password values confirmed to match `.env.local` exactly. Rotation is moot for now — traced the actual code and **nothing is currently password-protected on the live site**: `/labs/project-oasis` has no route built (the only `labsProjects` entry, and it's `hidden: true`), and `app/labs/page.tsx` imports `<PasswordGate>` but never renders it — dead code. Both env vars are just sitting ready for whenever something real gets gated. Revisit rotation once that happens, not before.
- [x] ~~Contact form live-send test.~~ — resolved 2026-09-08: Shane tested the live form directly, message arrived with the correct (current) success message, and no spam increase since the honeypot fix went live. Confirmed against the current `app/api/contact/route.ts`, not the stale May-era claim.
- [x] ~~Accessibility audit (WCAG 2.1 AA).~~ — done 2026-09-07 against the *current* Press Room system (the May roadmap's "done" claim was against the old design system, since fully replaced). Used the release-quality checklist from `qa/quality-gate-2026-09-05.md` §15 as the backbone. Results:
  - **Tap targets under 44px** — fixed earlier same day, commit `cd34d62`.
  - **Stale old-system focus ring** — real bug found: `/resume`'s inline LinkedIn/slides/webinar links fell through to a leftover `*:focus-visible` rule using the OLD static plum token (`--color-accent`, never theme-aware since it needs a `.theme-dark` class the Press Room toggle doesn't use), instead of the current `--pr-focus` token everything else gets. Confirmed via real keyboard Tab focus, not just computed-style inspection. Fixed with a Press-Room-scoped override, commit `d037677`.
  - **Heading hierarchy skips** — 4 real gaps found and fixed, commit `697a969`: `SectionLabel` (About + Resume) was a `<div>`, not a heading — About had exactly one heading total for the whole page; Resume jumped H1→H3 with nothing at H2. Both converted to `<h2>`. Proof Before Progress and Labs both had chapter/project-card titles at H3 with nothing at H2 (unlike Heart Design System's landing, which already chains H1→H2→H3 correctly) — bumped both to H2.
  - **Text contrast** — computed WCAG contrast ratios for every actively-used text/background token pair in both themes (not spot-checked, calculated the actual ratios). Everything meaningful clears 4.5:1 AA, including the muted/lede tones (dark muted-on-bg: 5.31, light: 4.81 — both pass with room). Only `--pr-disabled-fg` falls under 4.5:1, which is WCAG-exempt (disabled state).
  - **Alt text** — every `<img>` in the codebase already has descriptive, non-generic alt text (verified by reading each one, not just checking presence).
  - **Links not identified by color alone** — `.pr-text-link` doesn't even use a distinct color (matches body text), relies entirely on a `border-bottom`; the ad-hoc resume links pair accent color with a border-bottom too. Passes.
  - **Keyboard traps / custom controls** — every `onClick` handler in the codebase is on a real `<button>`, zero custom div-as-button patterns found.
  - **prefers-reduced-motion** — already implemented site-wide (`.pr-root * { animation: none !important; }`), no fix needed.
  - **Theme control accessible name/state, persistence** — already correct (`role="switch"`, `aria-checked`, `aria-label`, intentional localStorage persistence).
  - **Not fully verified**: actual screen-reader testing (can't simulate one from here) and literal 200% browser zoom (approximated via the responsive pass's 375px-and-up overflow testing, which found nothing, but that's not a perfect substitute).
- [x] ~~Resume date: 2011 vs. 2012 for the earliest SWA role.~~ — resolved 2026-09-08: **Aug 2011 is correct.** Shane confirmed directly — contracted as a UXD for ~7 months starting August 2011, converting to a Web Designer FTE role in late February 2012. Matches what's already in `MASTER_RESUME.md` (Contractor: Aug 2011–Feb 2012; Web Designer starts Feb 2012) — no content change needed, just resolves the open question.

## Still open (no conflicting claim, just not done)

**From tonight's session (2026-09-06), Shane's own calls to make:**
- [x] ~~Dark-mode **hover** ghost effect (nav links, secondary button)~~ — fixed 2026-09-07, commit `75a2cb1`. Applied the same bigger held-then-settles magnitude used for the on-load fix, scoped to exclude the primary CTA (already tuned separately). Verified via real `:hover` state in the browser.
- [ ] Whether the downloadable `.md` resume should get the same spacing/breathing-room pass the PDF got (it was explicitly scoped PDF-only at the time).
- [x] ~~Custom brand fonts (Archivo / IBM Plex Mono) in the generated PDF resume~~ — done 2026-09-08, commit `254315f`. The 2026-09-05 crash wasn't a real font-glyph issue — a handful of unused, corrupted composite glyphs sat at the tail end of the original Google Fonts TTF exports, and react-pdf's font embedding walks the whole glyph table regardless of what text is used. Subsetted the fonts with fontTools (basic Latin + em/en dash, middot, curly quotes, ellipsis) to drop the dead glyphs — fixed. A misregistration effect on the eyebrow labels was tried and reverted (hurt readability).
- [x] ~~Change the contact form success message from "I'll reply within a day" to something more realistic~~ — done 2026-09-07 (`180b49c`, revised to "2-3 business days" in `ca8a517` after "48 hours" felt too robotic).
- [x] ~~Review 3 Expertise icon picks by hand.~~ — resolved 2026-09-08: Shane reviewed `ShieldCheck` (Figma Governance), `Blueprint` (Design System Governance), and `TrendUp` (AI Adoption) — fine as-is, no swap needed.

**From 2026-09-08's session, resume overhaul:**
- [x] ~~Full resume review pass~~ — done 2026-09-08, commits `d31e2c1`/`b63d50f`. Renamed the master to `resume-source/MASTER_RESUME.md` to signal it's canonical (was `Shane_Maris_Resume.md`); deleted a stale pre-audit-rules `.docx` export (`unpacked_resume/`) that still had banned "lead and mentor UX design team" language. Rewrote the Summary (decade-plus career vs. decade of leadership ambiguity) and every Experience bullet in the current role per Shane's own edit pass; caught and fixed one real audit-rule violation his edit introduced ("future UX design team" → reverted), and clarified the rule itself (bans claiming to *be the manager*, not referencing the team's existence/growth). Propagated 1:1 to `app/resume/page.tsx`, `scripts/resume-pdf-content.ts`, and regenerated the PDF/MD. Found and fixed one live contradiction during a full-site sweep: `content/work/figma-enterprise-migration.md`'s seat-count origin story didn't match the corrected resume figure. Also dropped "Executive Communication" from the shared `Expertise` chip grid (`/about` + `/resume`) to match.
- [x] ~~Resume date: 2011 vs. 2012~~ — resolved, see "Needs manual verification" above (duplicate entry, cleaned up 2026-09-09).
- [x] ~~Whether the RZF/agency-partnership story should become a new bullet~~ — resolved 2026-09-08, commit `88d03e1`: Shane confirmed UX Designer role, agency name is Razorfish (not "RZF"). Added to `MASTER_RESUME.md` and `app/resume/page.tsx`, deliberately left out of the condensed one-pager (space-constrained, Shane's call to keep it master-only for now).

**Content/assets — infrastructure is done, files just aren't there yet:**
- [ ] **Full image punch list** — see [`IMAGE-SPEC.md`](IMAGE-SPEC.md) (refreshed 2026-09-07 with exact filenames/dimensions read straight from the code, not estimated). Priority 1: 35 images total, **2 of 35 done** — Home's lead-case-study card and About's portrait pulled from Figma and committed 2026-09-08 (`65ad322`, `28fcceb`; portrait is a real photo with a cyan/magenta gradient background, Home card is an intentional placeholder logo/wordmark treatment, swap when a real showcase exists). Remaining 33: Heart Design System (17), Proof Before Progress (8), Figma Enterprise Migration (8). Priority 2 (9 hidden case studies, once ready to unhide): 36 images, not started, explicitly deferred. Figma file has a live art-direction/idea-list punch list built for the Priority 1 remainder — see the file linked from this session's Figma work.
- [x] ~~Home's lead-case-study card and About's portrait weren't wired to `fs.existsSync`~~ — both fixed 2026-09-07, commits `51f2ee3` (Home, required extracting the Konami-code listener into its own client component so the page could become a server component) and `f62bf1d` (About, new `.pr-about-intro-grid` two-column layout). Both verified end-to-end with a real test file before/after.
- [ ] A commissioned/illustrated portrait for the About page — external dependency, was flagged back in May as something to start early since it's the longest lead time; never started.

**Site-wide QA/hardening — never done or only spot-checked:**
- [x] ~~Full responsive/mobile QA pass across the entire site at 375/768/1280px~~ — done 2026-09-07. Checked all 11 pages (Home, About, Resume, Work, Contact, Labs, a case-study `[slug]` page, HDS landing + a chapter, Proof Before Progress landing) at all 3 breakpoints — 33 checks, zero horizontal overflow anywhere. Header wraps cleanly to two rows at 375px with no overlap. The 2×2 chapter grids (HDS, Proof Before Progress) and the Expertise chip grid both collapse to a single column correctly. Contact form fields all fit within mobile width. Two things found, not fixed yet — see below.
- [x] ~~The 3 `npm audit` high-severity vulnerabilities~~ — patched 2026-09-07, commit `1e3ad41`. Turned out to be a minor patch bump (Next.js `16.2.4` → `16.3.4`, package.json was just pinned exact instead of a caret range), not the risky major jump it looked like. 0 vulnerabilities remaining, clean build + smoke test.
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
- [x] ~~`/labs` has no page-specific `<title>`/meta description~~ — fixed 2026-09-07, commit `63dcaf4`. Added `app/labs/layout.tsx` following the `/contact` pattern.

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
| `IMAGE-SPEC.md` | **Live, refreshed 2026-09-07** | The current, accurate image punch list — every dimension read from the actual component code. Update this (not a new doc) as image needs change. |
| `resume-source/MASTER_RESUME.md` | **Live** — renamed from `Shane_Maris_Resume.md` 2026-09-08 to signal it's canonical | Single source of truth for resume wording. `scripts/resume-pdf-content.ts` (PDF + .md downloads) and `app/resume/page.tsx` (live page, hand-duplicated content) are both manual, one-way copies of this file — re-sync by hand after any edit here, nothing auto-propagates. |

---

## Shane's additions

_(Add new items here as they come up — this section is yours.)_

---

## Future project (on hold) — "The Recipe Box" → Labs

**Not for tonight, and not until the core portfolio pass is finished.** Stored here per Shane's explicit instruction (2026-09-08) — do not start this until he asks, even if it looks like quick/easy work.

**What it is:** a personal recipe archive + meal-planning tool Shane built for his family — started as digitizing old recipe cards (including a handwritten one from his mom) and meal-kit recipes, and grew into a real tool. Built as a single self-contained HTML file (no backend, no build step, offline-capable) through an extended conversation with Claude in another session. Shane wants to showcase it in `/labs` specifically to demonstrate he builds and experiments on his own time, outside of work.

**Source file:** `/Users/e103138/Downloads/folio-work-sept5/recipe-box/recipe_box.html` — the standalone app referenced in the prompt below. Confirm it's still at that path (or ask Shane for the current copy) before starting; it may have been iterated on since 2026-09-08.

**Related, already tracked elsewhere in this roadmap:** `/labs` currently shows an empty-state message — `project-oasis` has content and a registry entry but no route built yet (see "Still open → Post-launch / lower priority" above). Worth deciding, when this is picked up, whether The Recipe Box becomes the first real Labs entry or sits alongside Project Oasis once that's also built.

**The prompt Shane generated in another session (kept verbatim for whoever picks this up):**

> I want to add a project to the "Labs" section of my portfolio. This is a
> side project I built — a personal recipe manager and meal-planning tool
> called "The Recipe Box" — and I want to showcase it there to show that I
> build and experiment on my own time, outside of work.
>
> First, look at how my portfolio is structured and how existing Labs (or
> Projects) entries are built — the framework, styling conventions, content
> format, and whether entries link out, embed an iframe, show screenshots,
> or something else. Match whatever pattern is already established. If
> there's no Labs section yet, look at how other sections are built and
> follow the same conventions to create one.
>
> About the project (use this to write the description/copy — rewrite it in
> whatever voice/length fits my site, this is just the raw material):
>
> "The Recipe Box" is a personal recipe archive and meal-planning tool I
> built for my family. It started as a way to digitize old recipe cards
> (including a handwritten one from my mom) and meal-kit recipes we'd
> collected, and grew into something more useful:
>
> - A searchable, filterable recipe library (currently ~90 recipes) with
>   inline add/edit — built as a single self-contained HTML file, no
>   backend, no build step, works offline in any browser
> - A meal-planning flow that generates a week of dinner suggestions,
>   pairing mains with sides that actually make sense together
> - A calendar view for scheduling meals across multiple weeks at once
> - A lightweight pantry tracker that cross-references upcoming meals
>   against what's on hand, to cut down on food waste and duplicate
>   grocery trips
> - A "share as markdown" export so I can send a single recipe to family
>   or friends who trade recipes with me
>
> The interesting part, worth highlighting: the app itself is a fast, fully
> client-side tool for the hands-on parts (searching, browsing, editing
> while cooking), but the actual planning intelligence lives in conversation
> with Claude directly — I describe what's in the fridge, what we're in the
> mood for, and get a plan reasoned through in real time, rather than a
> fixed algorithm. The whole thing (data modeling, the UI, the meal-planning
> logic) was built iteratively through conversation with Claude, going from
> "digitize some recipe cards" to a real working tool over a single
> extended session.
>
> I'm attaching the current recipe_box.html file (the standalone app) for
> you to work with — figure out the best way to host/embed/link it given
> how the rest of my site handles similar content.
>
> Please:
> 1. Review the existing site structure and conventions
> 2. Add a new Labs entry for this project, written in a tone that matches
>    the rest of my site
> 3. Make the app itself accessible from that entry (embedded, linked, or
>    downloadable — whichever fits the site's existing patterns)
> 4. Update any navigation/index needed so the entry is actually reachable
