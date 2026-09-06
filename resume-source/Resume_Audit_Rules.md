# Fact-Check & Audit Rules — Resume/Portfolio Content

This repo has verified, locked content living alongside older, sometimes-wrong fragments from earlier drafts. Your job when working with any of this material is to tell the difference, never to silently pick one.

## How to use this file

1. **`Shane_Maris_Resume.md` is locked content.** Copy it verbatim wherever it's used — same words, same punctuation. Do not paraphrase, summarize, or "improve" it, even if a different phrasing seems better. If you think something in it is actually wrong, say so and ask; don't fix it unilaterally.
2. **Run every checklist item below against anything you touch** — content you're generating fresh, and content you find already sitting in the repo. An existing file being wrong is not evidence that it's right.
3. **If you find a conflict — two different claims about the same fact, anywhere** — stop and flag it. Do not pick whichever seems more recent by file timestamp, more detailed, more complete, or already live on the site. Live-on-the-site is the *lowest*-trust source here, not the highest — it's what's least likely to have been reviewed recently. Show both versions and ask which is accurate.
4. **Priority order when sources conflict:** (1) anything Shane confirms directly to you beats everything else, (2) `Shane_Maris_Resume.md` and this file beat any other file in the repo, (3) anything currently live on the site is the least trustworthy.

---

## 🔴 Hard boundaries — never violate these

- [ ] **HDS is strictly customer-facing** (responsive web, native iOS, native Android). Never call it "internal," never imply it serves internal/employee-facing use.
- [ ] **Jetstream never appears anywhere.** It's Southwest's separate internal crew-facing system — not something Shane worked on, not to be confused with HDS.
- [ ] **No formal direct reports, ever.** One quasi-formal headcount (a contractor, kept generic, not named) with skip-level visibility from leadership. A separate, more formal contractor engagement existed earlier during a native-app proof-of-concept (also kept generic, not named). Never write "lead and mentor UX Designers," "UX design team," or anything implying formal people management.
- [ ] **The AI design system tool is a paused weekend prototype**, not something "being built" or "in progress." Never use present-progressive language implying active ongoing development.
- [ ] **$5M and $150K are two separate, unrelated figures.** $5M = the broader efficiency business case (1hr/day saved × 250 engineers + 11 designers, per an NN/g course estimate). $150K = an early, rough, generic estimate for a specific avoided vendor purchase (Knapsack), never a final number.

## 🟡 Verified facts — use these exact versions

- [ ] **HDS origin story:** Senior UX Designer (2019–2022) = foundational groundwork. Lead UX Designer (2022) = conceptualized, pitched, and secured approval. Keep these distinct.
- [ ] **Lead UX Designer dates:** Mar 2022 – Dec 2022. (Not Apr–Nov 2022, a stale/wrong version.)
- [ ] **Figma numbers:** 2,706 total seats (2,386 view + 320 paid: 14 collaboration, 129 dev, 177 full/design). Never use the stale "nearly 1,000 users" figure. Be explicit whether a claim refers to total vs. paid/functional seats.
- [ ] **Degree:** B.A., Interactive Media Design, Art Institute of Dallas, 2008–2011. (Not "Bachelor of Fine Arts in Graphic Design.")
- [ ] **Mobile landing page / 200% increase** belongs to **Web Designer (Feb 2012–Apr 2014)**, not UX Designer (Apr 2014–Feb 2019).
- [ ] **A/B testing work was IC-level**, not program ownership. Never "led/owned a testing program."
- [ ] **Governance scope:** no unverified team/stakeholder counts ("4+ product teams reporting to VP-level stakeholders" is unconfirmed, don't reuse). Use: UX, Marketing content design, Product, and Technology engineering pods, under shared Digital Experience leadership.
- [ ] **"Rapid Rewards Shopping"** is one single flow name, not two separate items.
- [ ] **Vision-era "original" flows** (specifically the WiFi/IFE Portal) predate recent relaunches — keep the "original" qualifier there; it does not apply to Rapid Rewards Shopping.

## 🔵 Naming & privacy conventions

- [ ] Never name contractors or colleagues in public-facing content, even when internally known. Keep generic ("a contractor," "a Southwest engineer").
- [ ] This applies even when a third party (e.g., Figma's own public webinar page) has already named them — Shane's own content still stays generic, by choice.
- [ ] LinkedIn bio content is separate from portfolio site content — don't cross-pollinate without a deliberate decision to.
- [ ] `shaneux.design` domain is an unconfirmed future consideration — don't reference or build toward it anywhere.

## 🟢 Voice & claim-precision rules

- [ ] No unverified superlatives ("most-used," specific counts) without a real source.
- [ ] Match status language precisely: prototyped/paused vs. actively building vs. shipped/complete are not interchangeable.
- [ ] Comma-forward, not em-dash-forward, in sentence construction (an em dash as a formatting separator, e.g. "Job Title — Company," is fine).
- [ ] Avoid corporate-boilerplate phrasing: "known for translating X into Y," "leverage," "delve," "tapestry," "unlock the potential," "crucial role," "circle back," and similar.
- [ ] Watch for AI-generated-design tells in visual work: tracked-out all-caps eyebrow labels used reflexively, a warm-cream-plus-terracotta palette drifting toward the `#D97757`-adjacent cliché, uniform rounded-card-with-hover-lift treatment without real hierarchy, numbered lists on non-sequential content.

## ⚪ Design/technical scope notes

- [ ] The portfolio's visual system and the downloadable resume's visual system are intentionally separate — don't merge without a dedicated session for that purpose.
- [ ] The two-accent color system (plum primary, terracotta secondary) is deliberate, not an error.
- [ ] Known pending tech debt (inline styles → Tailwind conversion, placeholder project-card content) is tracked and expected.
