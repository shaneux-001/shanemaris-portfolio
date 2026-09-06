# Portfolio Quality Gate --- shanemaris.com

**Purpose:** Implementation-ready status check for the portfolio.\
**Overall audit score:** **73/100**\
**Current verdict:** **Conditional Pass**\
**Target:** **85+/100**

> **Audit constraint:** The original audit verified public site
> structure, copy, links, hierarchy, and discoverable pages, but did not
> reliably verify pixel-level rendered CSS in both themes. Visual checks
> marked **MANUAL** must be validated in a real browser. Images were
> intentionally absent and should not currently count as defects.

## 1. Scorecard

  ------------------------------------------------------------------------
  Area                             Score Status           Priority
  ---------------- --------------------- ---------------- ----------------
  AI Slop                             76 PASS --- visual  P1
  Fingerprint /                          verification     
  Aesthetic Intent                       pending          

  PM Hat /                            82 PASS             P0
  Information                                             
  Architecture                                            

  Text & Copy                         79 PASS             P0

  Leadership /                        67 CONDITIONAL PASS P0
  Candidate                                               
  Positioning                                             

  **Overall**                     **73** **CONDITIONAL    ---
                                         PASS**           
  ------------------------------------------------------------------------

The site should improve through sharper positioning, executive
scanability, stronger evidence architecture, and more intentional
design---not by adding gradients, cards, effects, buzzwords, or content
volume.

## 2. P0 --- Executive Evidence Layer

**Problem:** Strong evidence is buried inside chronological case-study
narratives.

Add a compact executive summary near the top of every major case study
containing:

-   **Mandate** --- what needed to change.
-   **Scale** --- team/product/user/seat/organizational scope.
-   **Constraint** --- primary organizational, financial, technical, or
    staffing limitation.
-   **My Role** --- what Shane personally owned versus influenced.
-   **Key Decisions** --- 2--4 consequential decisions.
-   **Outcome** --- quantified results where evidence exists.
-   **Unresolved** --- what remains imperfect, incomplete, or unknown.
-   **Deep Dive CTA** --- path into the full narrative.

### Acceptance criteria

-   [ ] Heart Design System has an executive summary.
-   [ ] Figma Enterprise Migration has an executive summary.
-   [ ] Proof Before Progress has an executive summary.
-   [ ] Summary precedes long-form narrative.
-   [ ] Summary can be scanned without opening another page.
-   [ ] Existing metrics are surfaced rather than converted into vague
    claims.
-   [ ] Candidate ownership is distinguishable from team/company
    outcomes.
-   [ ] At least one meaningful constraint is visible per case study.
-   [ ] Unresolved issues are disclosed where applicable.
-   [ ] Existing long-form storytelling remains available.

**Do not:** turn this into seven identical glass cards; invent metrics;
imply individual ownership of team outcomes; or replace the narrative
with a generic UX-school case-study template.

## 3. P0 --- Sharpen Leadership Positioning

**Problem:** The site proves Design Systems / Design Ops leadership more
strongly than broad VP-level Design leadership, while several competing
identities dilute the positioning.

Current signals include Design Ops, Design Systems, Product/UX, Figma
administration, AI tooling, prompt engineering, and generic "work
together" language.

**Direction:** Establish one primary leadership proposition and
subordinate secondary capabilities to it.

A useful strategic direction---not mandatory copy---is:

> Transforms fragmented design practices into durable organizational
> infrastructure that helps teams ship better work at scale.

### Acceptance criteria

-   [ ] Homepage communicates a specific leadership proposition above
    the fold.
-   [ ] Proposition communicates organizational impact, not merely "I
    design systems that scale."
-   [ ] Design Systems / Design Ops remain obvious strengths.
-   [ ] AI appears as a capability/problem space, not identity
    inflation.
-   [ ] "Prompt Engineering" is removed from top-level executive
    expertise unless strategically justified.
-   [ ] About, Resume, Work, and homepage describe a coherent candidate.
-   [ ] Site clearly signals the leadership roles it is intended to win.
-   [ ] Positioning does not imply broad VP experience the case studies
    cannot substantiate.

## 4. P0 --- Fix the Conversion Funnel

**Problem:** "Want to work together?" reads as freelancer/consultant
positioning rather than Director/VP hiring intent.

Potential contextual actions include "Discuss a leadership role," "View
resume," "Connect on LinkedIn," "Start a conversation," and "Explore the
work." Do not blindly use all of them.

### Acceptance criteria

-   [ ] Primary CTA matches leadership-job intent.
-   [ ] Case-study endings provide a useful next action.
-   [ ] Resume is easy to reach.
-   [ ] Contact path remains obvious.
-   [ ] No important journey ends in a vague dead end.
-   [ ] "Want to work together?" is removed or retained only where
    consulting intent is explicit.
-   [ ] CTA hierarchy does not overwhelm case-study content.

## 5. P0 --- Replace Generic Principles With Defensible Beliefs

**Problem:** Principles such as "One bite at a time," "Constraints force
creativity," "Less is more," and "Design works for everyone" are broadly
interchangeable design-industry statements.

Replace them with 3--4 specific beliefs that can be defended with
portfolio evidence.

Directional examples only---do not copy automatically:

-   Design systems fail when treated only as component libraries.
-   Adoption is a product problem, not merely a governance problem.
-   If a system requires constant policing, the system itself may be
    wrong.
-   Infrastructure should make desired behavior easier than undesired
    behavior.

### Acceptance criteria

-   [ ] Maximum 3--4 primary beliefs.
-   [ ] Each is specific enough that another experienced leader could
    disagree.
-   [ ] Each connects to evidence elsewhere in the portfolio.
-   [ ] Generic design aphorisms are removed.
-   [ ] Plain language is used.
-   [ ] No motivational-poster copy.

## 6. P1 --- Copy / AI-Writing Lint

**Problem:** Copy avoids most obvious LLM buzzwords, but repeated
cinematic constructions risk becoming a formula.

Reduce dramatic short-sentence conclusions by roughly 30%. Prefer direct
conclusions where facts are already strong.

### Flag for review

-   excessive em dashes
-   repeated one-line dramatic paragraphs
-   "not just X, but Y"
-   "more than X"
-   "it wasn't X, it was Y"
-   "revolutionizing"
-   "transformative"
-   "seamless/seamlessly"
-   "empowering"
-   "delve"
-   "unlock"
-   "reimagine"
-   unsupported "innovative"
-   generic "human-centered" claims
-   unnecessary AI terminology

### Acceptance criteria

-   [ ] No "delve."
-   [ ] No "revolutionizing" unless quoting.
-   [ ] No clusters of marketing buzzwords.
-   [ ] Em dashes are not the dominant construction.
-   [ ] Dramatic two-sentence conclusions are used sparingly.
-   [ ] Concrete decisions, constraints, nouns, and outcomes dominate
    over adjectives.
-   [ ] Candid admissions and unresolved outcomes are preserved.

## 7. P1 --- Preserve Specificity

Specificity is one of the strongest anti-slop signals on the current
site. Existing examples include **2,706 seats**, **\$20K secured through
AOP**, **20 workspaces**, a **\$150K/year vendor decision**, **NPS from
21.43 to 52**, and **one engineer / one weekend**.

### Acceptance criteria

-   [ ] Existing verified metrics remain visible.
-   [ ] Metrics sit near the decisions/outcomes they substantiate.
-   [ ] Exact useful figures are not weakened into vague phrases.
-   [ ] No unsupported metric is introduced.
-   [ ] Qualitative claims include context/evidence.
-   [ ] Failures, pauses, incomplete work, and unresolved issues are not
    rewritten away.

## 8. P1 --- Make the Portfolio Demonstrate the Systems Thesis

Use the site itself as evidence of systems thinking. Possible
implementations include semantic token documentation, light/dark token
mapping, component anatomy, accessibility decisions, interaction
rationale, content-model explanation, or a reusable case-study schema.

### Acceptance criteria

-   [ ] At least one part of the site exposes meaningful system logic.
-   [ ] Light/dark modes use semantic tokens rather than arbitrary
    duplicated values.
-   [ ] Component behavior is internally consistent.
-   [ ] Accessibility decisions are documented where relevant.
-   [ ] System documentation explains reasoning, not merely CSS values.
-   [ ] Feature does not distract normal visitors.
-   [ ] Implementation reinforces the Design Systems leadership
    proposition.

## 9. P1 --- Visual AI-Slop Audit --- MANUAL

Test at minimum at \~1440px, \~1280px, \~768px, and \~390px in **both
light and dark themes**.

### Flag/fail when several dominate without conceptual justification

-   [ ] Purple/indigo-to-blue AI/SaaS gradients.
-   [ ] Neon blue/purple accents on generic dark backgrounds.
-   [ ] Excessive glow.
-   [ ] Gratuitous glassmorphism.
-   [ ] Blurred translucent cards.
-   [ ] Card-inside-card-inside-grid layouts.
-   [ ] Every section centered.
-   [ ] Identical vertical spacing for every section.
-   [ ] Excessive rounded rectangles.
-   [ ] Bento grids without IA justification.
-   [ ] Hierarchy created mainly by container decoration.
-   [ ] Identical treatment for content of different importance.
-   [ ] Generic generated illustrations used decoratively.
-   [ ] Dark mode is merely a color inversion.

### Pass conditions

-   [ ] Hierarchy follows content importance.
-   [ ] Spacing responds to narrative rhythm.
-   [ ] Not every idea is enclosed in a card.
-   [ ] Asymmetry is intentional where useful.
-   [ ] Decorative treatments have a reason to exist.
-   [ ] Typography creates recognizable voice.
-   [ ] Both themes feel authored.
-   [ ] Focus/hover/active/disabled/visited states work in both themes.
-   [ ] Contrast meets accessibility expectations.
-   [ ] Mobile retains hierarchy instead of simply stacking desktop
    modules.

## 10. P1 --- Typography Audit --- MANUAL

-   [ ] Determine actual primary/body/display typefaces.
-   [ ] If using Inter/Roboto or another common default, verify
    composition makes it intentional.
-   [ ] Headline/body treatments are meaningfully differentiated.
-   [ ] Long-form body measure is comfortable.
-   [ ] Line-height and paragraph spacing suit reading rather than a
    uniform spacing formula.
-   [ ] Uppercase eyebrow labels provide useful hierarchy.
-   [ ] Repeated text motifs such as "Work Work Work" have a defensible
    purpose.

**Rule:** A common font is not automatically a failure. Fail only when
the typography feels interchangeable and unintentional.

## 11. P1 --- Spacing / Rhythm Audit --- MANUAL

-   [ ] Major transitions receive more breathing room than minor ones.
-   [ ] Related evidence is visually grouped.
-   [ ] Long-form case studies have varied but systematic rhythm.
-   [ ] Metrics/outcomes receive stronger emphasis than supporting
    prose.
-   [ ] Empty space communicates hierarchy.
-   [ ] Mobile spacing is independently tuned where necessary.

## 12. P2 --- About Page Cleanup

Reframe expertise as strategic capabilities rather than keyword
inventory. Reconsider equal weighting of Design Ops, Design Systems,
Figma Enterprise Administration, Figma Governance, Design System
Governance, AI Tooling Strategy, AI Adoption, and Prompt Engineering.

### Acceptance criteria

-   [ ] Expertise is grouped into strategic capabilities.
-   [ ] Executive capabilities appear before implementation/tool skills.
-   [ ] Redundant governance terminology is consolidated.
-   [ ] About page explains what organizational problems the candidate
    can own.
-   [ ] Tool expertise remains available but does not define the
    candidate.

## 13. P2 --- Case-Study Navigation

-   [ ] Overview gives enough information to decide whether to continue.
-   [ ] Chapter navigation communicates current position.
-   [ ] Previous/next navigation exists where useful.
-   [ ] Returning to case-study overview is easy.
-   [ ] Returning to Work is easy.
-   [ ] Deep-linked chapters retain sufficient context.
-   [ ] Long pages provide orientation without noisy sticky UI.

## 14. Image Readiness

Images were intentionally absent during the audit. **Do not score
missing imagery as a failure until assets are supplied.**

When added:

-   [ ] Every image advances the argument.
-   [ ] Avoid generic mockup filler.
-   [ ] Captions explain why artifacts matter.
-   [ ] Screenshots are legible at intended viewport sizes.
-   [ ] Important details can be enlarged where necessary.
-   [ ] Alt text is meaningful.
-   [ ] Decorative images use appropriate empty alt behavior.
-   [ ] Critical information is not image-only.
-   [ ] Both themes preserve screenshot legibility.

## 15. Accessibility / Release Quality Gate

-   [ ] Keyboard navigation works across all interactive elements.
-   [ ] Visible focus states in light and dark themes.
-   [ ] Semantic heading hierarchy.
-   [ ] One meaningful H1 per page.
-   [ ] Navigation has accessible naming/state.
-   [ ] Theme control has accessible name/state.
-   [ ] Theme preference persists intentionally.
-   [ ] prefers-color-scheme behavior is intentional.
-   [ ] prefers-reduced-motion is respected.
-   [ ] Text contrast passes WCAG AA.
-   [ ] Interactive-control contrast is sufficient.
-   [ ] Links are not identified exclusively by color where
    inappropriate.
-   [ ] No horizontal overflow at common mobile widths.
-   [ ] Case studies remain readable at 200% zoom.
-   [ ] Images receive appropriate alt text.
-   [ ] Decorative motion does not interfere with reading.

## 16. Explicit Anti-Slop Guardrails

### DO NOT

-   [ ] Add purple-to-blue gradients merely for "energy."
-   [ ] Add glassmorphism to feel "premium."
-   [ ] Put every content block in a rounded card.
-   [ ] Add a bento grid merely because it is contemporary.
-   [ ] Add generic AI-generated abstract imagery.
-   [ ] Add floating glowing orbs.
-   [ ] Add meaningless animated gradients.
-   [ ] Add adjectives to "improve" weak copy.
-   [ ] Rewrite candid language into corporate marketing.
-   [ ] Turn every section into eyebrow + headline + paragraph + cards +
    CTA.
-   [ ] Add testimonials without useful real evidence.
-   [ ] Invent quotes or outcomes.
-   [ ] Add an AI chatbot merely to demonstrate AI capability.
-   [ ] Over-animate the portfolio.
-   [ ] Hide weak hierarchy behind visual effects.

### PREFER

-   [ ] Fewer, stronger elements.
-   [ ] Evidence over claims.
-   [ ] Decisions over deliverables.
-   [ ] Constraints over heroic storytelling.
-   [ ] Clear ownership over ambiguous "we."
-   [ ] Intentional typography over decoration.
-   [ ] Narrative rhythm over uniform templates.
-   [ ] Bespoke interactions only when they reinforce meaning.
-   [ ] Visible system logic over claims about systems thinking.

## 17. Leadership Evidence Status

  Capability                                  Current assessment
  ------------------------------------------- -----------------------
  Design Systems leadership                   Strong
  Design Operations                           Strong
  Organizational systems thinking             Strong
  Enterprise tooling / governance             Strong
  Product judgment                            Good
  Cross-functional influence                  Good
  Business-case development                   Good
  Broad product-design vision                 Insufficient evidence
  Creative-direction leadership               Insufficient evidence
  Hiring / org design                         Insufficient evidence
  Managing managers / senior design leaders   Insufficient evidence

Do not manufacture evidence to close these gaps. If real examples exist,
add them. If not, position the portfolio honestly toward the leadership
roles the evidence supports.

## 18. Three Hiring Red Flags to Resolve

1.  **Systems leadership is proven more strongly than broad Design
    leadership.**\
    Add real evidence of product vision, creative quality leadership,
    organizational design, hiring, senior-team leadership, or portfolio
    strategy only where it genuinely exists.

2.  **Narrative craftsmanship sometimes outruns executive
    communication.**\
    Add ruthless executive compression above the deeper storytelling.

3.  **The positioning does not yet know exactly what job it wants.**\
    Make the role target and leadership proposition coherent across the
    entire site.

## 19. Definition of Done

The remediation is complete when:

-   [ ] All P0 items pass.
-   [ ] All non-manual P1 items pass.
-   [ ] Manual light/dark visual audit is complete.
-   [ ] No major AI-slop visual fingerprint is present without explicit
    rationale.
-   [ ] Every flagship case study has an executive evidence layer.
-   [ ] Homepage has a differentiated leadership proposition.
-   [ ] CTA/funnel matches leadership hiring intent.
-   [ ] Generic principles have been replaced by defensible beliefs.
-   [ ] Specific metrics and candid unresolved outcomes remain intact.
-   [ ] About page emphasizes organizational capability over tool
    keywords.
-   [ ] Accessibility release gate passes.
-   [ ] Images are either intentionally pending or properly integrated.
-   [ ] No unsupported claims, metrics, testimonials, or leadership
    scope have been added.
-   [ ] Re-audit score is expected to reach **85+/100** without relying
    on cosmetic decoration.

## 20. IDE Agent Instruction

When implementing this report:

1.  Audit the existing implementation before changing it.
2.  Preserve working behavior and existing factual content.
3.  Fix **P0 before P1 before P2**.
4.  Prefer small, intentional changes over redesign-by-template.
5.  Do not invent professional history, metrics, quotes, outcomes, or
    candidate beliefs.
6.  When a change requires subjective content or missing factual
    evidence, mark it `NEEDS_OWNER_INPUT` rather than generating
    plausible filler.
7.  For every completed item, record the affected route/component and a
    short verification note.
8.  Keep manual visual checks open until verified in an actual browser
    in both themes and required breakpoints.
9.  Re-score the four audit categories after implementation.
10. Treat **85+/100** as the target, not as permission to inflate the
    score.

### Suggested status labels

-   `TODO`
-   `IN_PROGRESS`
-   `BLOCKED`
-   `NEEDS_OWNER_INPUT`
-   `MANUAL_VERIFY`
-   `PASS`
-   `FAIL`
-   `N/A`

------------------------------------------------------------------------

**Final product principle:** The next version should not simply look
"more designed." It should be **more opinionated, more compressed, more
evidentiary, and clearer about the level of leadership it is selling.**
