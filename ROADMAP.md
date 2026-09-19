# Roadmap — single source of truth

**Last updated: 2026-09-19.** This file is the ONE place tracking what's left to do on this project, and the entry point for picking this up cold — see the "Doc map" section below for everything else and what it's for. It supersedes:
- `HANDOFF.md` — retired 2026-09-19. Its task-list role was already dead (this file replaced it months ago); its architecture/gotchas/file-map reference content moved to the new `TECH-OVERVIEW.md`, corrected against the live codebase rather than carried forward stale.
- The Cowork artifact **"Shane Portfolio Roadmap"** (`~/Documents/Claude/Artifacts/shane-portfolio-roadmap/`) — last touched May 1, targeted a June 22 launch that's long past, and several of its own "DONE" claims turned out to be stale once the September redesign rebuilt large parts of the site. A stale banner has been added to it.
- `IMAGE-SPEC.md` — trimmed 2026-09-19 to Priority 2 only (the 9 hidden case studies). Priority 1 is done (Heart DS, Proof Before Progress, Figma Enterprise Migration, Home, About all have real photography live) so that section was deleted rather than left with stale numbers and a wrong file extension (`.jpg` — the real files are `.png`).

**Why this exists:** work happened in two bursts — April 19 through May 11 (foundation, then a big content/QA push), then a ~4-month gap, picking back up 2026-09-05. During the restart, some stale context from the spring got pulled in and briefly overwrote edits from the day before; that's been caught and fixed, but it's why this consolidation exists — one place, one history, so it doesn't happen again.

---

## 2026-09-09 through 2026-09-13 — case study deepening + real photography

**The big one:** `CASE-STUDY-QUESTIONS.md` (44 questions, written 2026-09-09) is fully answered. All three live case studies (Heart Design System, Proof Before Progress, Figma Enterprise Migration) were substantially rewritten around the real answers — richer origin stories, corrected timelines (a real HDS Ch2/Ch3/Ch4 sequencing contradiction was found and fixed), named vendors/tools where safe (Knapsack, Zeroheight, Figma, Sketch, etc.), real numbers (the 1:17–18 designer-to-engineer ratio), and — the actual point of the exercise — genuine people-leadership beats that survived fact-checking without fabricating anything: advocating for a teammate whose work was being undermined, deliberately delegating a naming-convention call and owning the imperfect outcome, coaching a contractor on native-platform strategy from day one. See "Add People-Leadership Evidence" below for how this affects that P0 item's status. Raw source material and the full approved draft are gitignored in `private/` (see that directory's own banner comments) — never committed, per the standing rule that this is a public repo and some of what went into these answers is real internal detail that can't appear publicly even genericized.

**Also shipped:** all three case studies now have real, exported photography (transparent PNGs, sized to each image's own natural aspect ratio rather than a forced crop) — Heart Design System is fully wired (13/13 slots), Proof Before Progress has all 4 chapter heroes, Figma Enterprise Migration has 5 of 8 slots filled with the remaining 3 a deliberate "no image" decision rather than a gap (missing slots now render nothing, with a small spacer for rhythm, instead of a dev placeholder box). Home's lead-case-study card and About's portrait were also re-exported with real transparency. New shared `CaseStudyImage` component (grounding border, optional caption support — infrastructure built, no caption text written yet) and `linkifyText` util (turns markdown `[label](url)` / bare URLs into real clickable links) now back every case study page. Also fixed: stale purple `favicon.ico`, a new button variant so "NEXT CHAPTER" doesn't visually compete with the footer "SAY HELLO" CTA, and body-copy centering under hero images on every chapter-style page (including `app/work/[slug]/page.tsx`, which the first pass at that fix missed since it was scoped to the chapter files directly in front of the fix rather than searched for across every matching layout — worth remembering for future structural fixes: grep for every instance of a pattern before calling it done, not just the files currently in view).

**Verified still open, checked directly against the live code 2026-09-13** (not assumed from an old doc): homepage `<h1>` is still "I design systems that scale." / "Building the foundations product teams rely on at Southwest Airlines." — the Leadership Proposition reframe has NOT happened. `/about`'s `PRINCIPLES` array is still the same 5 generic design-philosophy statements ("One bite at a time," "Constraints force creativity," "Less is more," "Design works for everyone," "Build tools not rules") — the Generic Principles → Leadership Beliefs item has NOT happened. No case study has a ROLE/PROBLEM/SCALE/WHAT CHANGED-style orientation block — case-study scanability (P1) has NOT happened. `next/image` has zero usages anywhere in the codebase — the Lighthouse/performance pass has NOT started.

---

## 2026-09-13 through 2026-09-19 — quality-gate closeout + repo cleanup

All four quality-gate P0 items and every P1 item except the "systems
thinking on the site itself" feature (deliberately deferred — a real
enhancement, not a gap) are now done — see the "Quality gate" checklist
below for full detail on each with commits. Highlights: homepage/About
headlines reframed away from "systems" as the primary identity; About's
5 generic principles replaced with 5 real leadership beliefs and a new
"WHAT I'M GOOD AT" section, both grounded only in facts already
published elsewhere (no invented stories); a ROLE/PROBLEM/SCALE/WHAT
CHANGED orientation block added to all 3 case studies; every `<img>`
migrated to `next/image` (confirmed via a real Lighthouse run:
Performance 99, Accessibility 100, Best Practices 96, SEO 100); a
human-narrative pass cut 2 generic "could be written by any designer"
sentences; case-study navigation made consistent (symmetric footers,
matching back-link naming) across Heart DS and Proof Before Progress.

**2026-09-19 — "v1" checkpoint + doc consolidation.** Before starting
the first real Labs project ("The Recipe Box," on hold since 2026-09-08
pending exactly this), did a full repo audit and cleanup: deleted a
stale fully-merged branch, removed Project Oasis (never wired up, not
ready to be public, was sitting as clutter — see the "Hidden case
studies" checklist above for the *other* 9 hidden case studies, which
are real backlog and were left alone), fixed 4 unused-var lint
warnings, and tagged the result `v1.0.0` as a named rollback point.
Also retired `HANDOFF.md` (see "Doc map" below) — its task-list role
was already dead, its architecture reference moved to the new
`TECH-OVERVIEW.md`, corrected against the live codebase rather than
carried forward stale. Two private `session-handoff-*.md` snapshots
were found to duplicate this file's own job; decided not to keep
generating new ones (see "Working agreements" below).

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

**Mechanism for gathering that input, started 2026-09-09, fully answered:** [`CASE-STUDY-QUESTIONS.md`](CASE-STUDY-QUESTIONS.md) — a 44-question punch list across all 3 live case studies (Heart Design System, Proof Before Progress, Figma Enterprise Migration) plus a dedicated cross-cutting "people-leadership hunt" section, written to prod for real specifics without inventing anything. Shane answered the full list; the real, fact-checked examples that survived (advocacy for an undermined teammate, delegating a naming-convention call and owning the outcome, coaching a contractor's native-platform strategy) are now live in the case-study copy — see the 2026-09-09–2026-09-13 section above for detail. Some raw answers were deliberately excluded even genericized (a colleague's PIP status, a specific claim about another manager's conduct and reassignment) — those boundaries are marked inline in the gitignored `private/case-study-raw-answers.md`, not repeated here.

**P0:**
- [x] ~~Add People-Leadership Evidence~~ — **partially resolved 2026-09-13, re-score before fully closing.** The case-study half of this is done (see above) — real examples now live in Heart Design System, Proof Before Progress, and Figma Enterprise Migration. The report's ask was broader than case studies alone though ("across About/case studies/Resume/beliefs") — `/about`'s principles and the resume haven't been touched with this lens yet. Worth a fresh quality-gate pass to see how much this alone moved the People-Leadership Evidence score before deciding whether About/Resume need the same treatment.
- [x] ~~Reframe the Leadership Proposition~~ — done 2026-09-13. Homepage `<h1>` changed from "I design systems that scale" to **"I help design teams stop rebuilding the same things twice."** — outcome-first, ties directly to the real Heart Design System story instead of an abstract systems claim, and doesn't overclaim formal-management scope ("help," not "manage"/"lead a team of"). Lede changed from "Building the foundations product teams rely on at Southwest Airlines" to "The foundations design teams rely on at Southwest Airlines" (audience corrected to design teams, and "Building" dropped to stop it echoing "stop rebuilding" right above it).
- [x] ~~Rebalance "Systems Leader" vs. "Design Leader"~~ — done 2026-09-13, commit `5f1ad3b`. Site-wide title/description (`layout.tsx`), homepage eyebrow, About's `<h1>` ("I lead the teams that build great design systems"), Work page lede ("Design leadership at Southwest Airlines"), and the resume subtitle (page + `MASTER_RESUME.md` + `resume-pdf-content.ts`, PDF/MD regenerated) all flip from "Design Ops & Systems" to "Design Systems & Ops Leader" / leadership-first language. Shared `Expertise` grid reordered so Cross-Team Leadership, Mentoring, and Stakeholder Management lead instead of trailing behind Design Ops/tooling entries. Confirms the "Prompt Engineering" drop was directionally correct (report's own acceptance criteria: "not presented as a top-level leadership competency" — already resolved further, since it's now removed entirely, commit `ac788d2`).
- [x] ~~Replace Generic Principles With Leadership Beliefs~~ — done 2026-09-13, commit `72c8aff`. `/about`'s "HOW I WORK" section (renamed "HOW I LEAD") now has 5 beliefs — Own the call, Coach the approach, Earn trust don't police it, Data over feelings, Protect your people — each grounded in a real, already fact-checked moment from the case studies (naming-convention delegation, contractor coaching, the trust-over-policing governance line from Proof Before Progress, the audit-pushback/data-first pattern, and the generalized advocacy-and-escalation beat) rather than invented. Supersedes the reorder-only work done 2026-09-06.

**P1:**
- [x] ~~Case-study scanability~~ — done 2026-09-14, commit `4bc62db`. New `CaseStudyOrientation` component (ROLE/PROBLEM/SCALE/WHAT CHANGED, 4 lines, no cards) on all 3 case studies; markdown-driven ones gated behind 3 new optional frontmatter fields so it stays invisible on unstarted projects.
- [x] ~~Preserve the human narrative~~ — done 2026-09-14, commit `e92b57c`. Re-read all 9 chapter files plus the Figma markdown against the anti-AI test; found and cut exactly 2 generic design-systems truisms in Heart DS (ch2's "easy to believe in when business is good," ch4's "components are the easy part" — the latter also just restated the blockquote above it). Everything else already passed the test.
- [x] ~~Reduce repetitive cinematic copy ~25–30%~~ — done 2026-09-14, commit `5a3e2f8`. Pattern turned out concentrated almost entirely in Heart Design System chapter 4 (Proof Before Progress and Figma Enterprise Migration were already tight prose); cut 2 pure-flourish lines there, left both blockquote thesis statements intact.
- [x] ~~Preserve specificity~~ — verified 2026-09-14. Checked all three figures after this week's trims/reorganization: 2,706 seats (Figma Enterprise Migration), $150K vendor decision (Proof Before Progress landing/ch4/resume/About), NPS 21.43→52 (ch4) all still visible right next to the decisions they justify. No changes needed.
- [x] ~~Fix the funnel~~ — mostly done 2026-09-07, commit `34bb2a7` (button "GET IN TOUCH" → "SAY HELLO"). Report calls this "a smaller issue than originally assessed" for this target level and lists "Let's talk" among its own directional examples too — either is fine per the report. "Want to work together?" (the heading) and the Contact page's own H1 ("Get in touch") still unchanged.
- [x] ~~About page rebuild~~ — partially done 2026-09-14, commits `27b8eb1`/`92e447a`. Reordered so HOW I LEAD comes right after the intro; added a new WHAT I'M GOOD AT section (4 items, each sourced from an already-published fact, no invented stories) answering "what org problems are they unusually good at." Did not adopt the report's suggested Build the team/practice/system 3-part framing — that needs new material only Shane can supply.
- [ ] Make the portfolio demonstrate systems thinking on the site itself (token docs, component anatomy, etc.) — unchanged from before.
- [x] ~~Visual AI-slop audit~~ — spot-checked 2026-09-13/14 at 1440/1280/768/390px and in light theme across Home/About/Work/Resume/case studies — no defects found. Still flagged **MANUAL** for Shane's own subjective read (this was an AI-assisted pass, not a substitute).
- [x] ~~Typography audit~~ — done 2026-09-09, commit `2f4808b`. Font stack changed from Inter + Archivo + IBM Plex Mono + Playfair Display to just Archivo + IBM Plex Mono — Inter and Playfair are both individually common "looks AI-generated" tells, and the safe-body+serif-accent combo was its own recognizable template formula. Compared options in a live Artifact against real site content before deciding. Also found and fixed a real bug live on production since 2026-09-05: a circular CSS custom-property alias silently collapsed every heading/eyebrow to Inter sitewide — see the commit for the full story.
- [x] ~~Spacing/rhythm audit~~ — spot-checked 2026-09-13/14 alongside the AI-slop pass, same breakpoints/themes — no defects found. Still flagged **MANUAL** for Shane's own look.

**P2:**
- [x] ~~Case-study navigation polish~~ — done 2026-09-14, commit `c60bdc2`. Chapter 1 of both Heart DS and Proof Before Progress now has a symmetric two-button footer (← BACK TO OVERVIEW / NEXT CHAPTER →) instead of a lone NEXT CHAPTER button; PBP's final chapter now returns to its own overview instead of jumping to the main /work index (matching HDS); PBP's top-of-page back link now names the case study, matching HDS's pattern instead of the generic "BACK TO OVERVIEW".

**Explicit guardrails from the report, worth repeating:** never invent metrics/quotes/stories/people-management examples or executive scope to close a gap; never pretend Manager/Sr Manager experience is VP scope; mark anything needing Shane's real input `NEEDS_OWNER_INPUT` and anything needing a real browser look `MANUAL_VERIFY` rather than generating plausible filler either way. Fix P0 before P1 before P2. Nothing in this section should be implemented until Shane asks for it — stored here for the next QA pass.

---

## Needs manual verification

These are cases where an old doc claims something is DONE, but either the underlying code has since changed, or a current doc says otherwise. Don't trust either claim blind — check the live site/dashboard directly.

- [x] ~~Vercel environment variables.~~ — resolved 2026-09-08: Shane checked the dashboard directly. All 3 present with correct names — `RESEND_API_KEY` (Production + Preview, marked sensitive/write-only, added Apr 20), `NEXT_PUBLIC_PORTFOLIO_PASSWORD` and `NEXT_PUBLIC_OASIS_PASSWORD` (All Environments, last touched May 1). Both password values confirmed to match `.env.local` exactly. Rotation is moot for now — traced the actual code and **nothing is currently password-protected on the live site** (true as of 2026-09-08; since then Project Oasis — the only thing that would have used `NEXT_PUBLIC_OASIS_PASSWORD` — was removed entirely 2026-09-19, and `app/labs/page.tsx`'s dead `<PasswordGate>` import was cleaned up the same day). `NEXT_PUBLIC_PORTFOLIO_PASSWORD` is still sitting ready for whenever something real gets gated; `NEXT_PUBLIC_OASIS_PASSWORD` is now fully orphaned in Vercel — harmless to leave, safe to delete from the dashboard whenever convenient. Revisit rotation once something real is actually gated, not before.
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
- [x] ~~Full image punch list~~ — **effectively done as of 2026-09-13** for Priority 1; `IMAGE-SPEC.md` was trimmed 2026-09-19 to drop its now-done, stale Priority 1 section entirely — treat the status here as current. Heart Design System: 13/13 real slots filled (note the actual final slot count is 13, not the 17 IMAGE-SPEC estimated — the landing page switched to a link-list layout, which dropped the need for chapter-thumbnail images entirely). Proof Before Progress: 4/4 chapter heroes filled; no section-image slots exist in the current code (never built — only heroes were ever wired for PBP). Figma Enterprise Migration: 5 of 8 slots filled (hero, sections 1/2/3/5); sections 4/6/7 are a deliberate "no image" decision, not a gap — the template renders nothing for a missing slot rather than a placeholder. Home's lead-case-study card and About's portrait were both re-exported this week with real transparency (previous versions from 2026-09-08 had gotten deleted at some point; re-created). Priority 2 (9 hidden case studies) remains not started, explicitly deferred, unchanged.
- [x] ~~Home's lead-case-study card and About's portrait weren't wired to `fs.existsSync`~~ — both fixed 2026-09-07, commits `51f2ee3` (Home, required extracting the Konami-code listener into its own client component so the page could become a server component) and `f62bf1d` (About, new `.pr-about-intro-grid` two-column layout). Both verified end-to-end with a real test file before/after.
- [ ] A commissioned/illustrated portrait for the About page — external dependency, was flagged back in May as something to start early since it's the longest lead time; never started.

**Site-wide QA/hardening — never done or only spot-checked:**
- [x] ~~Full responsive/mobile QA pass across the entire site at 375/768/1280px~~ — done 2026-09-07. Checked all 11 pages (Home, About, Resume, Work, Contact, Labs, a case-study `[slug]` page, HDS landing + a chapter, Proof Before Progress landing) at all 3 breakpoints — 33 checks, zero horizontal overflow anywhere. Header wraps cleanly to two rows at 375px with no overlap. The 2×2 chapter grids (HDS, Proof Before Progress) and the Expertise chip grid both collapse to a single column correctly. Contact form fields all fit within mobile width. Two things found, not fixed yet — see below.
- [x] ~~The 3 `npm audit` high-severity vulnerabilities~~ — patched 2026-09-07, commit `1e3ad41`. Turned out to be a minor patch bump (Next.js `16.2.4` → `16.3.4`, package.json was just pinned exact instead of a caret range), not the risky major jump it looked like. 0 vulnerabilities remaining, clean build + smoke test.
- [x] ~~Performance / Lighthouse pass~~ — done 2026-09-14, commit `ad7e5c5`. Added `lib/imageDimensions.ts` (PNG-header reader, no new dependency) since every image lives in `public/` with no build-time asset pipeline. Shane ran Lighthouse on the live site post-deploy: **Performance 99, Accessibility 100, Best Practices 96, SEO 100** — FCP/LCP/Speed Index all 0.5s, TBT 120ms, CLS 0 (confirms the width/height migration eliminated image-driven layout shift). Well past the 90+ target — fully closed.
- [x] ~~Privacy policy~~ — decided against, 2026-09-09, deliberate call not an oversight: the contact form (name/email/message → Resend, no accounts, no cookies, no tracking) is minimal enough that this isn't a real GDPR/CCPA-triggering footprint, having one is common to skip at this scale, and Shane's own read is that an unnecessary boilerplate policy page reads MORE like an AI-generated-template tell than skipping it does — plus real liability risk sits in stating something inaccurate in a policy nobody's making him write. Cookie consent only becomes relevant if analytics gets added (see below) — revisit then, not before.
- [ ] Stakeholder feedback review — external reads (a hiring-manager perspective, HR, a peer), distinct from Shane's own proofread/slop-detection pass which he's doing separately.

**Post-launch / lower priority, carried forward from the May roadmap, untouched since:**
- [ ] Analytics setup (GA4 or a privacy-friendly alternative like Plausible/Fathom) — track page views, form submissions, resume downloads.
- [x] ~~Project Oasis labs page~~ — removed 2026-09-19, as part of buttoning up the repo before Labs work starts. Wasn't ready to be written up and was sitting as unused clutter (no route, never wired up) — `labsProjects` registry entry, `content/work/project-oasis.md`, and the unused `getOasisPassword()` helper in `lib/password.ts` were all deleted. Revisit as a fresh entry if/when there's real content for it.
- [ ] Ultra-wide layout optimization (e.g. Samsung G9 Odyssey, 32:9) — max-width/layout adjustments for extreme aspect ratios.
- [ ] Performance monitoring + error tracking (Sentry or similar), uptime monitoring — once there's real traffic to monitor.
- [ ] Launch announcement strategy — message for LinkedIn/email/personal network, a short list of people to share with before any public post.
- [ ] Blog content strategy + LinkedIn posting cadence — ongoing thought-leadership backlog, not urgent.

**Small flagged-but-not-acted-on items:**
- [ ] The Press Room design system's tracked-out all-caps eyebrow labels were flagged by `Resume_Audit_Rules.md`'s own "AI-generated-design tells" checklist during the Sept 5 audit. That design came from Shane's own Claude Design work, not something to unilaterally change — just worth knowing it was flagged, in case it comes up during his own slop-detection pass.
- [ ] The old PressMark "broken in dark mode" report (Phase 3, spring) — self-resolved or was a visual misread, hasn't reproduced since. Reopen only if it shows up again during a real QA pass.
- [x] ~~`/labs` has no page-specific `<title>`/meta description~~ — fixed 2026-09-07, commit `63dcaf4`. Added `app/labs/layout.tsx` following the `/contact` pattern.

## Hidden case studies — pick-up-later checklist (not gated for v1)

Nine `portfolioProjects` entries in `lib/projects.ts` are `hidden: true` —
real, intentional backlog (unlike Project Oasis, which was removed
2026-09-19 for being unready clutter). Not required for v1; listed here as
a menu to pick from whenever there's appetite for a second wave of case
studies. Image counts are from `IMAGE-SPEC.md`'s Priority 2 table (hero +
section images needed to un-hide each one).

- [ ] `homepage-v2` — "Responsive Homepage" (Leadership, DesignOps, Design System, Responsive) — 4 images (1 hero + 3 section)
- [ ] `native-app-homepage` — "Native App Homepage" (Native, iOS, Android) — 4 images (1 hero + 3 section)
- [ ] `vision-decommission` — "Vision Decommission" (Leadership, DesignOps, Design System, Web, Responsive, Mobile, Native) — 4 images (1 hero + 3 section)
- [ ] `ife-starlink` — "IFE Starlink Portal" (Leadership, DesignOps, Design System) — 4 images (1 hero + 3 section)
- [ ] `my-account-redesign` — "My Account Redesign" (DesignOps, Design System, Responsive, UX) — 4 images (1 hero + 3 section)
- [ ] `mobile-check-in` — "Check-in Flow Redesign" (Mobile, Web, UX) — 3 images (1 hero + 2 section)
- [ ] `homepage-redesign` — "Homepage Redesign (2014)" (Rebrand, Web, Mobile, UX) — 3 images (1 hero + 2 section)
- [ ] `change-cancel-experience` — "Change & Cancel Experience" (Web, UX) — 4 images (1 hero + 3 section)
- [ ] `enhanced-reaccom` — "Enhanced Reaccom Program" (Web, Mobile, UX) — 4 images (1 hero + 3 section)

Each already has a `content/work/[slug].md` file with real copy — un-hiding
is a matter of setting `hidden: false` (or removing the flag) once real
photography exists for that project, same pattern as the three live case
studies.

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
| `ROADMAP.md` (this file) | **Live** | The only place task status, backlog, and working agreements are tracked. Add new items here. Start here when picking this project back up. |
| `TECH-OVERVIEW.md` | **Live**, added 2026-09-19 (replaces `HANDOFF.md`) | Stack info, critical gotchas, file map, style approach, bear traps. Pure architecture reference — no task status, changes rarely. |
| Cowork artifact "Shane Portfolio Roadmap" | **Stale, banner added** | Historical snapshot of the May plan only. Do not use for current status. |
| `IMAGE-SPEC.md` | **Live, trimmed to Priority 2 only, 2026-09-19** | Priority 1 (the 3 live case studies + Home + About) is done and was deleted from this file rather than left stale. What remains is production detail (exact filenames/aspect ratios) for the 9 hidden case studies — see "Hidden case studies" checklist above for status. |
| `resume-source/MASTER_RESUME.md` | **Live** — renamed from `Shane_Maris_Resume.md` 2026-09-08 to signal it's canonical | Single source of truth for resume wording. `scripts/resume-pdf-content.ts` (PDF + .md downloads) and `app/resume/page.tsx` (live page, hand-duplicated content) are both manual, one-way copies of this file — re-sync by hand after any edit here, nothing auto-propagates. |
| `resume-source/Resume_Audit_Rules.md` | **Live** | Fact-check governance for all resume/case-study content — locked-content rules, hard boundaries (no formal direct reports, HDS is customer-facing only, no Jetstream mentions), naming conventions, voice rules. Check before writing anything content-adjacent, regardless of which page it's for. |
| `CASE-STUDY-QUESTIONS.md` | **Closed, added 2026-09-09, fully answered** | Punch list of prodding questions for Shane to answer, aimed at deepening the 3 live case studies and specifically surfacing real people-leadership evidence. Answered in full; the case studies themselves now reflect the answers that passed fact-checking (see the 2026-09-09–2026-09-13 section above). Historical record of the questions, not a live to-do. |
| `private/case-study-raw-answers.md`, `private/case-study-drafts.md`, `private/case-study-image-manifest.md` | **Live, gitignored — never commit** | Raw unfiltered answers, the approved-copy draft workspace, and a per-image content-brief manifest — kept local-only since some answers include real internal/colleague detail that can never appear in a public repo, even genericized. Inline boundary markers note what's permanently excluded. |
| `private/session-handoff-*.md` | **Historical, gitignored — no new ones going forward** | Point-in-time snapshots from before this doc consolidation (2026-09-19). Superseded by `ROADMAP.md`'s own dated history entries + "Working agreements" section below — left in place as-is, not actively maintained. |

---

## Working agreements

How Shane wants this project actually worked on — collected from
explicit corrections and confirmations across sessions, consolidated
here 2026-09-19 (previously scattered across gitignored
`private/session-handoff-*.md` snapshots that duplicated this file's
job; no new ones going forward).

- **Commit locally as logical chunks land; never push without an
  explicit go-ahead** ("push it live," "push it," or similarly
  unambiguous) — every push to `main` auto-deploys to production within
  minutes, with no review step in between. This is the single most
  important standing rule for how this repo gets worked on.
- **Verify in the actual rendered page, not just the diff.** Shane
  iterates fast and reviews visually — use the local dev server /
  Browser pane to confirm a change looks and works right before calling
  it done, especially for anything visual or content-facing.
- **When making a structural/pattern fix, grep for every other instance
  of that pattern before calling it done** — not just the files already
  in view. A real miss this month: a centering fix and later a nav-link
  fix each first landed only on the files directly being edited and
  missed another file with the identical layout pattern; both were
  caught, but the lesson is to search first.
- **When Shane gives a direct correction, verify against the literal
  artifact** (the actual file, the actual rendered page, his actual
  words) rather than re-arguing from reasoning. When he says drop a
  topic, drop it.
- **Never invent leadership stories, metrics, or people-management
  scope to close a gap** — mark anything needing his real input rather
  than generating plausible filler. Every leadership claim on this site
  traces to something he actually confirmed.
- **For copy/positioning decisions, bring real options with honest
  tradeoffs**, not one polished answer — he wants to steer a direction,
  not approve/reject a single take.
- **For anything substantial (new features, doc/architecture
  restructuring, multi-step cleanup) — audit and present a plan before
  executing.** Small, well-scoped fixes don't need this; genuine scope
  or judgment calls do.

---

## Shane's additions

_(Add new items here as they come up — this section is yours.)_

---

## In progress — "The Recipe Box" → Labs (`labs/recipe-box` branch)

**Gate cleared 2026-09-19** — the core portfolio pass (all P0/P1 quality-gate items, plus a full repo cleanup and `v1.0.0` tag) is done. Picked up 2026-09-19; building on the `labs/recipe-box` branch, off the `v1.0.0` tag.

**What it is:** a personal recipe archive + meal-planning tool Shane built for his family — started as digitizing old recipe cards (including a handwritten one from his mom) and meal-kit recipes, and grew into a real tool. Source data/UI came in as a self-contained HTML prototype (`master_recipes.json` + `recipe_box.html`, ~90 recipes) built iteratively through an earlier Claude conversation. Shane wants to showcase it in `/labs` to demonstrate he builds and experiments on his own time, outside of work.

**Scope confirmed 2026-09-19 — supersedes the prompt below on one key point:** the AI planning is a live **in-app chat feature**, not Shane chatting with Claude in a separate conversation. Concretely: a server-side Route Handler calls the Claude API (key never shipped to the client), gated behind a signed-cookie session (not the site's existing `NEXT_PUBLIC_*` client-side password pattern — real API cost is at stake here) with Upstash-backed rate limiting as a backstop against bugs/abuse. The recipe library, meal-pairing heuristic, shopping-list builder, and pantry-diffing logic from the prototype are being reused/ported; the AI's job is limited to picking/pairing meals from the existing library (returning structured `{main, side, reason}` per meal) and taking free-text "what's in the fridge" input — the deterministic JS still does the ingredient math. v1 is single-shot (describe fridge → get a plan → refine), not a full multi-turn chat thread. Pantry state persists via Upstash, keyed to the session, so it's available from any device.

**Resolved 2026-09-19:** Project Oasis was removed (wasn't ready, was sitting as unused clutter) — The Recipe Box is now simply the first real Labs entry, no need to decide how it coexists with anything else.

**Superseded by the scope note above, kept verbatim for history — the prompt Shane generated in another session, which described the AI planning as happening via a separate conversation with Claude rather than an in-app call:**

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
