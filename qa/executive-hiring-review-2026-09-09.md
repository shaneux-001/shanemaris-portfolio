<!--
Stored per Shane's explicit instruction (2026-09-09): "capture this for
things I could polish further, but I think it's in a decent spot." Nothing
here should be implemented without Shane asking, same rule as every other
qa/ report — this is backlog material, not an active task list.

Distinct from qa/quality-gate-2026-09-07-manager-recalibration.md (the
active, structured P0/P1/P2 audit ROADMAP.md tracks against). This one
reads more like a hiring-manager-voice narrative review from a different
tool/prompt — useful as a second, independent read, but not written to
the same rubric, so don't try to merge the two scorecards mechanically.

One thing worth flagging before anyone acts on this: the "WorkWorkWork" /
"AboutAboutAbout" / "VIEW RESUMEVIEW RESUMEVIEW RESUME" observation in
section 1 is very likely an artifact of how this tool read the page, not
a real visual issue. The site's nav and CTA rows render TWO responsive
variants in the DOM at once (a wide-row and narrow-row version, toggled
via CSS visibility per components/press/SiteHeader.tsx and the
.pr-row-wide/.pr-row-narrow pattern in app/globals.css) — a real visitor
only ever sees one, but a tool that reads raw text content instead of
rendered/visible text would concatenate both, which is exactly the
"WorkWorkWork" pattern described. Worth a quick visual gut-check before
treating this as an actual repetition problem.

Companion data point, same evening: slop-detect.com scored the live site
5/100 ("Clean" / "A" grade, 1 of 27 patterns flagged) — a good outside
confirmation that the font-stack + copy work earlier tonight is landing.
-->

# Shane Maris Portfolio — Executive Design Leadership Review

**Source:** external review, run by Shane, 2026-09-09. Verbatim below.

## Executive Verdict

**Advance to the next round — but not because the portfolio is excellent.**

I'd advance the candidate because the **underlying work appears materially stronger than the portfolio presenting it.**

The site demonstrates evidence of someone who has:

* Operated at enterprise scale
* Navigated procurement and organizational politics
* Built adoption rather than merely designed artifacts
* Managed tooling strategy
* Influenced across multiple teams
* Made financial cases
* Dealt with organizational resistance
* Scaled a system from roughly 20 Figma seats to 2,706
* Run 101 onboarding sessions
* Had Figma invite them to co-present their work publicly

**That is considerably more impressive than the portfolio makes it feel.**

The site currently reads more like:

> "Experienced Design Ops practitioner who made a nice portfolio."

than:

> **"Strategic Design Leader I should put in charge of a significant organization."**

That's a positioning problem.

---

# 1. THE AI SLOP FINGERPRINT

## Verdict: Low-to-Moderate AI Slop. High Risk of "Designer Portfolio Template."

The good news first:

I don't see the most embarrassing AI fingerprints in the content structure.

There's no obvious:

* "Transforming ideas into impactful experiences."
* "I believe in the power of design to..."
* "Where creativity meets innovation."
* "Revolutionizing the future of..."
* "Seamlessly integrating..."

Instead, there are genuinely human lines.

For example:

> "I'm a designer by trade who started fixing stuff on the side because I'm the kind of person who can't leave a broken process alone."

That's good.

That's **specific.**

And:

> "Texas isn't doing its best impression of a convection oven."

That's personality.

Likewise, the Figma case study contains unusually concrete details:

* $20K approval
* Procurement delays
* 2,706 seats
* 320 paid seats
* 101 onboarding sessions
* 20 workspaces
* Four design organizations

**Those numbers save this portfolio from feeling like pure AI vapor.**

### The Problem

The visual and structural language is extremely close to the current **"designer personal site" archetype.**

The repeated navigation labels:

> WorkWorkWork
> AboutAboutAbout
> DARK DARK DARK

and repeated CTAs:

> VIEW RESUMEVIEW RESUMEVIEW RESUME

are visually distinctive, but I'm not convinced they're *meaningfully* distinctive.

They feel like a **design trick.**

That's an important distinction.

A senior designer shouldn't get points merely because something looks unusual.

The question is:

> **Why is this unusual thing here?**

If the answer is:

> "Because it gives the site personality."

That's weak senior-level reasoning.

If the answer is:

> "The repetition creates a deliberate visual rhythm that reinforces the site's editorial character and differentiates navigation from content."

That's a defensible design decision.

### Interview Question

I would ask:

> **"Why is the navigation written as WorkWorkWork and AboutAboutAbout?"**

I'd expect a very good answer.

---

# 2. THE PM HAT PROTOCOL

## Verdict: The IA is competent. The psychology is underdeveloped.

The site has a straightforward architecture:

**Home → Work → Case Study → Contact**

That's good.

There isn't a labyrinth.

The Work page gives me three projects:

1. Heart Design System
2. Figma Enterprise Migration
3. Proof Before Progress

That's also good.

You're resisting the classic portfolio disease of presenting 17 mediocre projects.

### The Strategic Problem

You are making the recruiter do too much interpretation.

The homepage says:

> "I design systems that scale."

Then:

> "Building the foundations product teams rely on at Southwest Airlines."

That's reasonable.

But **what does that mean in terms of leadership value?**

Are you:

* A Design Ops leader?
* A Design Systems leader?
* A Product leader?
* An enterprise transformation leader?
* A tooling strategist?
* An organizational designer?
* A UX leader who moved upstream?
* A design executive specializing in scale?

Your About page answers this somewhat, but the homepage should not make me assemble the thesis myself.

A VP hiring you doesn't want to solve your positioning puzzle.

### Your Best Evidence Is Buried

Look at the Figma case.

This is an **excellent leadership story**:

> 20 seats → 2,706 seats
> $20K initial approval
> Enterprise adoption
> 101 onboarding sessions
> 20 workspaces
> Four design organizations
> Contract renegotiation
> Figma co-presentation

That's good.

And yet the portfolio presents the project initially as:

> "Figma Enterprise Migration"

That's basically a project name.

**The business outcome is the story.**

I'd rather see:

> **From 20 seats to 2,706: Building Southwest's Enterprise Figma Strategy**

Now I'm interested.

That's PM thinking.

---

# 3. THE TEXT & COPY AUDIT

## Verdict: Much better than average, but occasionally trying too hard to sound like a portfolio.

There is very little obvious LLM sludge.

I don't see the dreaded:

* "Delve"
* "Revolutionizing"
* "Seamlessly"
* "Not just X, but Y"
* "Unlocking"
* "Empowering"
* "Transformative"
* "Innovative solutions"

That's a significant positive.

The writing has an actual voice.

The Figma case study is especially strong because it sounds like someone **who was actually there.**

For example:

> "Procurement at an airline laser-focused on cost is its own kind of slow."

That's good writing because it contains **context + opinion + specificity.**

And:

> "I wasn't going to ask for budget to replace a 'perfectly fine' toolset."

That's even better.

That's leadership judgment.

### Where the Copy Weakens

Some of the headline language is generic.

For example:

> "From grassroots effort to enterprise-scale design infrastructure."

and:

> "I design the systems behind great design."

They're perfectly acceptable.

They're also **forgettable.**

I've seen variants of those statements hundreds of times.

Your actual experience is more interesting than your positioning language.

The irony is that:

> **The more you try to sound like a Design Leader, the less interesting you become.**

Your strongest writing sounds like Shane talking about something Shane actually did.

Your weakest writing sounds like someone constructing a Design Leader portfolio.

---

# 4. THE CASE STUDY PROBLEM

This is where I'd push hardest.

The case studies appear to be structured largely around **chronology**.

For example:

### Heart

Origin Story → Pandemic → Gift Card POC → Scaling

### Proof Before Progress

Documentation → RIF → Vendor Path → AI Prototype

That's a legitimate storytelling structure.

But for a **senior leadership portfolio**, chronology isn't necessarily the most persuasive structure.

I'd rather understand:

### The Problem

What was broken?

### The Stakes

Why did Southwest care?

### Your Diagnosis

What did you see that others didn't?

### The Intervention

What did *you* actually change?

### The Resistance

Who disagreed and why?

### The Leadership

How did you get people through it?

### The Result

What changed?

### The Lesson

What would you do differently next time?

That last one is particularly important.

**Executives are hired for judgment, not just successful outcomes.**

Your portfolio currently demonstrates:

> "I successfully did this."

It needs to demonstrate more:

> **"Here's how I think."**

That's the difference between:

**Senior Designer / Design Ops Lead**

and

**Design Leader.**

---

# THE THREE BIGGEST RED FLAGS

## 🚩 1. Your Portfolio Undersells Your Strategic Altitude

This is the biggest one.

You have enterprise-scale evidence, but the presentation often frames it as **projects you worked on** rather than **organizational problems you solved.**

A hiring committee could easily walk away thinking:

> "Great Design Ops person."

instead of:

> **"This person can lead a design organization through transformation."**

That's a serious positioning failure.

---

## 🚩 2. I Don't See Enough Leadership of People

I see a lot of **systems leadership.**

I see:

* Tooling
* Governance
* Adoption
* Stakeholders
* Procurement
* Strategy
* Enterprise transformation

But for a Design Leader position, I'm going to ask:

**Where are the humans?**

Where did you:

* Hire?
* Mentor?
* Develop?
* Resolve conflict?
* Establish team structures?
* Change organizational behavior?
* Create accountability?
* Manage performance?
* Build leadership capability?

Your About page lists things like "Mentoring" and "Cross-Functional Leadership," but a list of competencies isn't evidence.

You need a story that proves it.

---

## 🚩 3. The Visual Design May Be Doing More "Portfolio Design" Than Communication

This one deserves a visual review at full fidelity before making a final judgment.

But based on the structural choices, I'm suspicious.

There's a danger here of **designer-designed-for-designers.**

Repeated typography.

Dark mode.

Editorial case studies.

Big statements.

Curated imagery.

Minimal navigation.

Those things can produce an aesthetically sophisticated portfolio that nonetheless tells me very little about whether you have **taste in service of communication.**

The question isn't:

> "Is this cool?"

It's:

> **"Is every visual decision helping me understand Shane?"**

That's the bar.

---

# THE THREE FIXES

## 1. Replace the Portfolio Thesis With an Executive Thesis

Stop leading with:

> "I design systems that scale."

It's fine, but generic.

Your actual differentiator appears to be something much more interesting:

> **You make design organizations scale.**

That's different.

I'd position the site around something closer to:

> **I build the systems, tools, and operating models that let design organizations scale.**

Now the entire portfolio has a lens.

Heart demonstrates one dimension.

Figma demonstrates another.

Your AI work demonstrates another.

Your leadership philosophy becomes another.

Suddenly the portfolio isn't **a collection of projects.**

It's **an argument for hiring you.**

That's what a senior portfolio should be.

---

# 2. Turn the Case Studies Into Evidence of Judgment

Don't just tell me what happened.

Make your decisions visible.

For example, the Figma case could have a giant pullout near the top:

### THE DECISION

> We didn't need another design tool. We needed one operating environment for design and development.

### THE BET

> Spend $20K proving Figma could replace a fragmented toolchain before asking Southwest for an enterprise commitment.

### THE RESULT

> 20 seats → 2,706
> 4 design organizations
> 101 onboarding sessions
> Enterprise contract

Now I'm looking at a **leader's portfolio**, not a project retrospective.

And crucially:

**You don't need more content.**

You need better hierarchy.

---

# 3. Make the Site Unmistakably Yours

Right now, I can imagine another talented Design Ops person using the same basic architecture.

That's unacceptable for a portfolio whose central claim is **taste and systems thinking.**

Give me one or two things that I couldn't plausibly find on another designer's site.

Your About page already contains the beginnings of it:

> "I'm the kind of person who can't leave a broken process alone."

**That's the character of the portfolio.**

Lean into that.

You aren't the guy who makes beautiful screens.

You're the person who walks into an organization and says:

> **"Why the hell are we doing it this way?"**

Then you figure out what's broken.

Then you build the system that fixes it.

Then you get 2,700 people to use it.

**That's a fucking portfolio.**

Your website should feel like that person.

---

# FINAL HIRING ASSESSMENT

| Dimension                | Assessment                                           |
| ------------------------ | ---------------------------------------------------- |
| Craft / Visual Taste     | **Potentially strong; needs visual review**          |
| Information Architecture | **Good, but conventional**                           |
| Writing                  | **Strong, human, occasionally generic**              |
| Strategic Thinking       | **Strong evidence**                                  |
| Systems Thinking         | **Very strong evidence**                             |
| Enterprise Leadership    | **Very strong evidence**                             |
| Product Thinking         | **Strong evidence**                                  |
| People Leadership        | **Insufficient evidence**                            |
| Executive Presence       | **Not yet demonstrated strongly enough**             |
| Portfolio Storytelling   | **Good practitioner level; not yet executive level** |

## Hiring Signal

### **ADVANCE**

But I'd be interviewing you specifically to answer one question:

> **Are you actually a Design Leader, or are you an exceptionally good Design Ops practitioner who has accumulated enough enterprise scope that the distinction has become blurry?**

That's not an insult.

It's actually a **very interesting senior-level hiring question.**

Because the raw material is there.

The Figma story alone tells me you've done more than the average portfolio candidate. Going from roughly 20 seats to 2,706, driving adoption across four design organizations, leading 101 onboarding sessions, and ultimately renegotiating the enterprise contract is legitimate organizational leverage—not portfolio theater.

**The problem is that your site doesn't quite have the balls to make that claim.**

It keeps saying:

> *Here's some work I did.*

It should be saying:

> **Here's the kind of organizational problem I'm unusually good at solving.**

That's the leap I'd make before putting this in front of a VP Product, Chief Design Officer, or CEO.

And if you're targeting **Director/VP rather than Senior Manager**, I'd make that change mandatory.
