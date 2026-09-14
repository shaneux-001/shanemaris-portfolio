import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import PressCta from "@/components/press/PressCta";
import Expertise from "@/components/press/Expertise";
import Ghost from "@/components/press/Ghost";

export const metadata: Metadata = {
  title: "About",
  description: "Design Systems & Ops leader. Designer by trade, systems thinker by necessity — building the infrastructure that helps teams do their best work.",
  openGraph: {
    title: "About · Shane Maris",
    description: "Design Systems & Ops leader. Designer by trade, systems thinker by necessity — building the infrastructure that helps teams do their best work.",
    url: "https://shanemaris.com/about",
  },
  twitter: {
    title: "About · Shane Maris",
    description: "Design Systems & Ops leader. Designer by trade, systems thinker by necessity.",
  },
};

const PRINCIPLES = [
  { term: "Own the call", line: "Some calls have to be made without the resourcing to do them the “right” way. Make the call, and if it doesn't fully pan out, own that instead of rewriting the story." },
  { term: "Coach the approach", line: "Reviewing someone's output after the fact teaches them what you wanted. Setting the approach with them up front teaches them how to think — the version that outlasts you." },
  { term: "Earn trust, don't police it", line: "Rules assume everyone's looking for a shortcut. A system that's earned trust puts the burden on the builder to justify the exception, not on itself to catch everyone in advance." },
  { term: "Data over feelings", line: "Confidence isn't where you start, it's what's left after the research holds up. When the data doesn't back an opinion yet, the honest answer is “let me get back to you.”" },
  { term: "Protect your people", line: "When someone's work is being undermined, say something directly first. If that doesn't fix it, escalate — quietly, and all the way up if that's what it takes." },
];

// Grounded in what's already published in the case studies and resume —
// no new stories invented for this section, per the no-fabrication rule
// that governs every other leadership claim on this site.
const GOOD_AT = [
  { term: "Funding a system without formal authority", line: "Southwest's design system ran on borrowed time for years before it had a real budget — built by pitching every stakeholder in whatever language actually moved them: cost, time, consistency." },
  { term: "Turning disruption into forward motion", line: "A pandemic canceled a funded initiative overnight. A company-wide layoff, years later, reshuffled leadership above me. Both times, I used the opening the disruption created instead of just surviving it." },
  { term: "Scaling adoption without a mandate", line: "Grew Southwest's design tooling from about 100 seats to 2,706 — including departments outside my own org that I onboarded anyway, with no authority to prioritize their requests, because they wanted in." },
  { term: "Making (and unmaking) high-stakes vendor calls", line: "Built a nine-month case for a $150K/year vendor, then walked away when the internal math stopped holding up — and separately pushed for better enterprise contract terms as our other tooling scaled past 2,700 seats." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 font-plex-mono text-[11px] font-normal tracking-[0.1em] text-pr-muted mb-[22px] border-t border-pr-rule pt-[22px]">
      {children}
    </h2>
  );
}

function TermGrid({ items }: { items: { term: string; line: string }[] }) {
  return (
    <div className="pr-two-col max-w-[860px] mb-10">
      {items.map((item) => (
        <div key={item.term} className="flex flex-col gap-[5px]">
          <div className="text-[17px] font-semibold text-pr-fg-strong">{item.term}</div>
          <div className="text-sm leading-[1.6] text-pr-lede">{item.line}</div>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const portraitPath = path.join(process.cwd(), "public", "about-portrait.png");
  const hasPortrait = fs.existsSync(portraitPath);

  return (
    <main className="pr-page">
    <div className="pr-main pt-[clamp(36px,5vw,56px)] pb-6">
      <div className="pr-about-intro-grid mb-2">
        <div>
          <h1 className="pr-page-title m-0 mb-[18px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
            <Ghost trigger="load">I lead the teams that build great design systems.</Ghost>
          </h1>
          <p className="pr-lede m-0 mb-3 leading-[1.7] text-pr-lede max-w-[54ch]">
            I build the scaffolding designers actually need to do good work — processes that hold up, tools people will use without a fight, and enough shared standard that teams stop reinventing the same decisions.
          </p>
          <p className="pr-lede m-0 mb-8 leading-[1.7] text-pr-lede max-w-[54ch]">
            I&apos;m a designer by trade who started fixing stuff on the side because I&apos;m the kind of person who can&apos;t leave a broken process alone. It worked well enough that I was able to turn it into my full-time focus.
          </p>
          <div className="flex gap-[10px] items-center flex-wrap">
            <PressCta href="/contact">SAY HELLO</PressCta>
            <PressCta href="/resume" variant="secondary">VIEW RESUME</PressCta>
          </div>
        </div>
        <div className={`relative aspect-[4/5] overflow-hidden flex items-end p-3${hasPortrait ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
          {hasPortrait ? (
            <Image
              src="/about-portrait.png"
              alt="Shane Maris"
              fill
              sizes="(min-width: 860px) 40vw, 100vw"
              className="object-contain"
            />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">about-portrait.png</span>
          )}
        </div>
      </div>

      <SectionLabel>HOW I LEAD</SectionLabel>
      <TermGrid items={PRINCIPLES} />

      <SectionLabel>WHAT I&apos;M GOOD AT</SectionLabel>
      <TermGrid items={GOOD_AT} />

      <SectionLabel>OUTSIDE OF WORK</SectionLabel>
      <div className="max-w-[62ch] mb-2 flex flex-col gap-3.5">
        <p className="text-sm text-pr-lede leading-[1.7] m-0">
          Outside of work, most of my time goes to my family, cooking, and video games I&apos;m probably too invested in. I&apos;m a genuine film and TV nerd, less about the story on screen and more about how it got there, since the craft decisions behind the scenes interest me as much as the finished product.
        </p>
        <p className="text-sm text-pr-lede leading-[1.7] m-0">
          That behind-the-scenes curiosity isn&apos;t new. I got my hands on Flash in ninth grade and started making my own cel animations, and later took photography and videography classes in college. Long before &quot;systems thinker&quot; was a job title, I was already the kid who wanted to understand how something got made, not just watch it happen. That&apos;s still basically what I do for a living.
        </p>
        <p className="text-sm text-pr-lede leading-[1.7] m-0">
          Also trying to get back outdoors more: hiking, walking, easing back into biking, for the roughly five months a year Texas isn&apos;t doing its best impression of a convection oven.
        </p>
      </div>

      <SectionLabel>EXPERTISE</SectionLabel>
      <div className="mb-10">
        <Expertise />
      </div>
    </div>
    </main>
  );
}
