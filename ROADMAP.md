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
- [ ] Typography audit — **MANUAL**.
- [ ] Spacing/rhythm audit — **MANUAL**.

**P2:**
- [ ] Case-study navigation polish (orientation, prev/next, return-to-overview) — unchanged from before.

**Explicit guardrails from the report, worth repeating:** never invent metrics/quotes/stories/people-management examples or executive scope to close a gap; never pretend Manager/Sr Manager experience is VP scope; mark anything needing Shane's real input `NEEDS_OWNER_INPUT` and anything needing a real browser look `MANUAL_VERIFY` rather than generating plausible filler either way. Fix P0 before P1 before P2. Nothing in this section should be implemented until Shane asks for it — stored here for the next QA pass.

---

## Needs manual verification

These are cases where an old doc claims something is DONE, but either the underlying code has since changed, or a current doc says otherwise. Don't trust either claim blind — check the live site/dashboard directly.

- [ ] **Vercel environment variables.** The May roadmap claims `RESEND_API_KEY`, `NEXT_PUBLIC_PORTFOLIO_PASSWORD`, `NEXT_PUBLIC_OASIS_PASSWORD` were confirmed set in Vercel + `.env.local`, and records a `/labs` password value as of that date. HANDOFF.md's more recent notes still list this as unconfirmed. Only Shane can check the Vercel dashboard directly — confirm all three are still set with values that match `.env.local`, and decide whether the recorded `/labs` password needs rotating (it's 4+ months old).
- [ ] **Contact form live-send test.** May roadmap claims this was tested and confirmed delivered via Resend. But `app/api/contact/route.ts` was rewritten in September (honeypot added, validation added, and a real bug fixed — the Resend SDK returns `{data, error}` rather than throwing, so a failed send used to get reported as success). The May test was against code that no longer exists. Send yourself a real test message through the live form and confirm it arrives.
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
- [ ] **Resume date: 2011 vs. 2012 for the earliest SWA role.** May roadmap claims this was corrected to accurate month/year across the board. Then the whole resume was rewritten from scratch in the September fact-check audit (governed by `resume-source/Resume_Audit_Rules.md`), which locked in **Aug 2011** as the Contractor role's start — and HANDOFF.md's own notes from that audit still flag this exact date as "unclear if still wanted." Needs a direct answer from Shane: is Aug 2011 correct, or should it be 2012? (Don't confuse with the *Lead UX Designer* Mar–Dec 2022 range — that one Shane already confirmed separately as correct.)

## Still open (no conflicting claim, just not done)

**From tonight's session (2026-09-06), Shane's own calls to make:**
- [x] ~~Dark-mode **hover** ghost effect (nav links, secondary button)~~ — fixed 2026-09-07, commit `75a2cb1`. Applied the same bigger held-then-settles magnitude used for the on-load fix, scoped to exclude the primary CTA (already tuned separately). Verified via real `:hover` state in the browser.
- [ ] Whether the downloadable `.md` resume should get the same spacing/breathing-room pass the PDF got (it was explicitly scoped PDF-only at the time).
- [ ] Custom brand fonts (Archivo / IBM Plex Mono) in the generated PDF resume — currently falls back to Helvetica/Courier after a `fontkit` crash on the downloaded TTFs. Only worth revisiting if exact typography match actually matters.
- [x] ~~Change the contact form success message from "I'll reply within a day" to something more realistic~~ — done 2026-09-07 (`180b49c`, revised to "2-3 business days" in `ca8a517` after "48 hours" felt too robotic).
- [ ] **Review 3 Expertise icon picks by hand.** Icons came back to the Expertise chips 2026-09-07 (`ac788d2`), all confirmed to actually exist in the installed Phosphor package — but 3 of the 13 are a best-guess fit, not a confident obvious match, since "governance" and "adoption" don't have one universally-obvious glyph: **Figma Governance** → `ShieldCheck`, **Design System Governance** → `Blueprint`, **AI Adoption** → `TrendUp`. Worth a manual look through the Phosphor library (`node_modules/@phosphor-icons/react/dist/csr/` has the full list, 1512 icons) to see if something fits better — swap in `components/press/Expertise.tsx`.

**Content/assets — infrastructure is done, files just aren't there yet:**
- [ ] **Full image punch list** — see [`IMAGE-SPEC.md`](IMAGE-SPEC.md) (refreshed 2026-09-07 with exact filenames/dimensions read straight from the code, not estimated). Priority 1 (Heart Design System, Proof Before Progress, Figma Enterprise Migration, Home, About): 35 images. Priority 2 (the 9 hidden case studies, once ready to unhide): 36 images. Shane's planning to pull these directly from Figma this evening; ask about the pipeline/workflow before assuming a particular export process.
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

---

## Shane's additions

_(Add new items here as they come up — this section is yours.)_
