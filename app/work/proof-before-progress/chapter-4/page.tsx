import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import CaseStudyImage from "@/components/press/CaseStudyImage";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "The Weekend and the Proof · Proof Before Progress",
  description: "A weekend-built AI prototype closed the case for a larger team, avoided a $150K vendor purchase, and proved the docsite argument with real NPS data.",
};

export default function Chapter4() {
  const workDir = path.join(process.cwd(), "public", "work", "proof-before-progress");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-4-hero.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/proof-before-progress" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO OVERVIEW</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 4 — AI PROTOTYPE
        </span>

        <h1 className="pr-page-title m-0 mb-7 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          <Ghost trigger="load">The Weekend and the Proof</Ghost>
        </h1>

        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.pbpChapter4}</p>

        <CaseStudyImage
          src="/work/proof-before-progress/chapter-4-hero.jpg"
          alt="Chapter 4 hero"
          hasImage={hasHero}
          aspectClassName="aspect-[1.6/1]"
          wrapperClassName="mb-10"
        />

        <div className="max-w-[62ch] mx-auto flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            Then came what I&apos;d call my AI awakening. Southwest is conservative about AI tooling, but once internal AI tooling started to land, I prototyped a component inventory tool in a single weekend — partly because I hate sitting still on a problem, and partly because I wanted to know what was possible without the vendor I&apos;d just walked away from.
          </p>
          <p className="m-0">
            It included a dashboard for design system health metrics, an agent that could answer real-time questions about the system (freeing my one designer from fielding every question that came up in a project meeting), an intake process that forced actual thought into a component request instead of just lobbing a question at us, visibility into who owns which component, and a booking system to replace poorly-attended office hours.
          </p>
          <p className="m-0">
            Most of that is still a vision, not a shipped tool. The prototype is genuinely paused — not actively being built out — because the system itself isn&apos;t in a state to be easily made AI-readable yet. It&apos;s homegrown and inconsistent in ways that need to be resolved first. But it gave me a concrete case for a larger team, and a real plan for closing out v1 and addressing the gaps that show up when you scale something fast with minimal support.
          </p>
          <p className="m-0">
            One outcome is already real. We never moved forward on an estimated $150K-a-year vendor purchase — an early figure from initial conversations, before procurement negotiations would have shaped a final number. We&apos;re now planning to build our own tool instead.
          </p>
          <p className="m-0">
            The first-ever satisfaction survey for the system, in 2025, returned an NPS of 21.43. The most recent survey, in June 2026, returned an NPS of 52 — a real, measured improvement, tied more to the broader gains we&apos;d made and to people finally getting properly trained on the system than to anything AI-related. What the surveys also surfaced, underneath the headline number, was how apparent the lack of a real docsite and Living Style Guide had become — that&apos;s the data that gave us the case to pursue the Component Inventory tool, and everything now planned for v2.
          </p>
          <p className="m-0">
            The same surveys also confirmed a governance bottleneck: too much still routes through too few people, myself included. That&apos;s not a hidden problem I&apos;m waiting to be caught on — it&apos;s one I&apos;ve said out loud, and it&apos;s part of why I&apos;m designing the next version of the system to govern itself where it can, rather than needing a person in the loop for every decision.
          </p>
          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            I didn&apos;t go to art school to become a police officer.
          </blockquote>
          <p className="m-0">
            Someone said that at Config earlier this year, and it&apos;s stuck with me since — I&apos;ve been using it as my own shorthand for the governance philosophy I want v2 to run on. If someone needs to go off the system&apos;s beaten path, that should be fine, as long as their work still holds up — the burden should be on the designer or builder to justify the exception, not on the design systems team policing every rule.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/proof-before-progress/chapter-3" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work">BACK TO WORK</PressCta>
        </div>
      </div>
    </main>
  );
}
