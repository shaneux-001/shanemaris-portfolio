import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import CaseStudyImage from "@/components/press/CaseStudyImage";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "The Long Game · Heart Design System",
  description: "I've known design systems were the answer since before most people were calling them that.",
};

export default function Chapter1() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-1-hero.png"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-1-section-1.png"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-1-section-2.png"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/heart-design-system" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO HEART DS</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 1 OF 4
        </span>

        <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          <Ghost trigger="load">The Long Game</Ghost>
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Origin Story</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter1}</p>

        <CaseStudyImage
          src="/work/heart-design-system/chapter-1-hero.png"
          alt="Chapter 1 — The Long Game"
          hasImage={hasHero}
          aspectClassName="aspect-[1.6/1]"
          wrapperClassName="mb-10"
        />

        <div className="max-w-[62ch] mx-auto flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            I&apos;ve known design systems were the answer since before most people were calling them that. Before I was calling them that.
          </p>

          <p className="m-0">
            It was 2013, maybe 2014 — Event Apart in Austin. I sat through a talk on Style Tiles and something clicked. Not just as a design methodology, but as an organizational one. Here was a way to stop redefining the same things over and over, to close the gap between what design intended and what development delivered, to make &quot;digital first&quot; mean something beyond a slide in a deck.
          </p>

          <p className="m-0">
            I brought that back to my manager: we had to do this, we were working inefficiently and it was costing us real money. I was still early — hadn&apos;t earned the trust yet to make it land — and spent the next few years doing more spec work than UX design, fixing small inconsistencies in things we&apos;d already defined.
          </p>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            Build tools, not rules.
          </blockquote>

          <p className="m-0">
            A few years later, at a conference talk by Dan Mall, that line reoriented how I thought about what a design system actually is. Not a governance document. Not a constraint. A gift to the people building alongside you.
          </p>

          <CaseStudyImage
            src="/work/heart-design-system/chapter-1-section-1.png"
            alt="Screenshot — Design artifact"
            hasImage={hasSection1}
            aspectClassName="aspect-[1.5/1]"
          />

          <p className="m-0">
            At that same conference, I got the opportunity to ask the CTO of Virgin America a question that&apos;s stuck with me since: how does a company get to that decision without it coming from the top, when you&apos;re not the one with that kind of authority? His answer — no one at Virgin wanted to do it either. Airlines are risk-averse to a fault. You start by talking about it with anyone who&apos;ll listen, the hallway, the lunch table, and the moment you hear someone else telling your story back to you, you&apos;ve got a supporter.
          </p>

          <p className="m-0">
            That&apos;s exactly what I did. For years, I was the person in meetings who — when a problem came up that a design system would solve — said so, even knowing full well it wasn&apos;t on the roadmap. Enough of that, and it stops sounding like a pitch and starts sounding like consensus.
          </p>

          <p className="m-0">
            2019 was the turning point. I&apos;d hit my limit with how long our transition off our old design language was taking, and I told my manager plainly: I was interviewing, and didn&apos;t see myself staying if we weren&apos;t going to do industry-standard work. He understood, and gave me 10% of my time to start making the case for real.
          </p>

          <CaseStudyImage
            src="/work/heart-design-system/chapter-1-section-2.png"
            alt="Process — Deck screenshot"
            hasImage={hasSection2}
            aspectClassName="aspect-[1.5/1]"
          />

          <p className="m-0">
            It took years, and a different pitch for every person I needed on board. For my manager, an audit of the current digital experience was enough — seeing how far design had already drifted made the case for itself. For the Director of Digital Experience, it was cost and time: converting our old design language to the new one page by page was measurably more expensive than doing it systematically, and that argument got me a technology partner and 50% of my time. For the Director of Brand, it was consistency — she&apos;d watched the brand drift further from its own guidelines with every release we shipped, and a living system was the way to close that gap. That conversation is what turned 50% into nearly full-time, and unlocked the budget for an outside agency to help lay the actual brand foundations.
          </p>

          <p className="m-0">
            Somewhere in that climb, I got the Lead title I&apos;d been working toward — and turned around and pitched a title change. It felt like Lead implied an end date to another project, something you finish, and I wanted the org to understand this was a product, not a project with a deadline. I pushed for Product Manager instead.
          </p>
        </div>

        <div className="flex justify-end items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/heart-design-system/chapter-2">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
