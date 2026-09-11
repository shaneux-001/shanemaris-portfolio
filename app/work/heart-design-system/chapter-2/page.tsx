import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import CaseStudyImage from "@/components/press/CaseStudyImage";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "Staying Alive · Heart Design System",
  description: "When the brand director signed off, things started moving. Then the pandemic hit.",
};

export default function Chapter2() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-2-hero.png"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-2-section-1.png"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-2-section-2.png"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/heart-design-system" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO HEART DS</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 2 OF 4
        </span>

        <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          <Ghost trigger="load">Staying Alive</Ghost>
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Pandemic</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter2}</p>

        <CaseStudyImage
          src="/work/heart-design-system/chapter-2-hero.png"
          alt="Chapter 2 — Staying Alive"
          hasImage={hasHero}
          aspectClassName="aspect-[1.6/1]"
          wrapperClassName="mb-10"
        />

        <div className="max-w-[62ch] mx-auto flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            When the brand director signed off, things started moving. I got time with Lippincott, one of our brand agencies, to help lay the foundations of the system — a grid at four breakpoints, a typography system, and an expanded color palette that finally broke free from the constraints of Pantone and CMYK values.
          </p>

          <p className="m-0">
            Then the pandemic hit. The engagement ended a week after the kickoff.
          </p>

          <CaseStudyImage
            src="/work/heart-design-system/chapter-2-section-1.png"
            alt="Lippincott Foundations — Color System"
            hasImage={hasSection1}
            aspectClassName="aspect-[1.5/1]"
          />

          <p className="m-0">
            I thought I was going to lose the whole thing. Aviation didn&apos;t pause, it collapsed, and Southwest was in survival mode like every other carrier. Design systems are easy to believe in when business is good. They&apos;re a much harder sell when the company is fighting to stay solvent. But the foundations work wasn&apos;t wasted — even incomplete, it gave us a real color system, typography, and grid philosophy to build on, and I turned that into a shared component library so the design team, at minimum, was working from the same set of pieces.
          </p>

          <p className="m-0">
            That library is what kept things alive through the next year. When rumors started that we&apos;d try our first fully responsive project, my leader allowed me to take those foundations and a small group of us to prove it on something low-stakes: a flight status lookup, a two-page flow with nothing riding on it. That&apos;s the project that got our engineering partners genuinely excited — there&apos;d already been appetite on the technology side to build reusable components once the codebase moved to React, they just hadn&apos;t had the design-side partner or the framing to make the case. We even pitched a version of it at an internal innovation event, using a components tool one of our engineers had built — it didn&apos;t win (it saved cost, not revenue, and revenue is what wins those rooms), but it&apos;s the project that turned &quot;maybe&quot; into an actual partnership.
          </p>

          <CaseStudyImage
            src="/work/heart-design-system/chapter-2-section-2.png"
            alt="Team Foundation — Early Partnership"
            hasImage={hasSection2}
            aspectClassName="aspect-[1.5/1]"
          />

          <p className="m-0">
            That&apos;s also when I connected with a senior technology manager, through nothing more formal than a comment in a weekly one-on-one that I was spinning my wheels — I could make everything look the same, but I couldn&apos;t make it <em>be</em> the same without engineering. From there, we synced every sprint, built the case together, and he got me in front of his own leadership. The argument I made there was never abstract: efficiency, reduced rework, faster delivery with fewer people. Southwest&apos;s culture runs on cost discipline, so I spoke that language. It landed slowly.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/heart-design-system/chapter-1" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/heart-design-system/chapter-3">NEXT CHAPTER →</PressCta>
        </div>
      </div>
    </main>
  );
}
