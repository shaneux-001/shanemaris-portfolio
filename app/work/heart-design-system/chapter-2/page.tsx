import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "Staying Alive · Heart Design System",
  description: "When the brand director signed off, things started moving. Then the pandemic hit.",
};

export default function Chapter2() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-2-hero.jpg"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-2-section-1.jpg"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-2-section-2.jpg"));
  const hasSection3 = fs.existsSync(path.join(workDir, "chapter-2-section-3.jpg"));

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
          Staying Alive
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Pandemic</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter2}</p>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/heart-design-system/chapter-2-hero.jpg" alt="Chapter 2 — Staying Alive" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-2-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            When the brand director signed off, things started moving. I got time with Lippincott, one of our brand agencies, to help lay the foundations of the system — a grid at four breakpoints, a typography system, and an expanded color palette that finally broke free from the constraints of Pantone and CMYK values.
          </p>

          <p className="m-0">
            Then the pandemic hit. The engagement ended a week after the kickoff.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection1 ? (
              <img src="/work/heart-design-system/chapter-2-section-1.jpg" alt="Lippincott Foundations — Color System" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-2-section-1.jpg</span>
            )}
          </div>

          <p className="m-0">
            I thought I was going to lose the whole thing. Aviation didn&apos;t pause — it collapsed. Southwest, like every carrier, was in survival mode. Design systems are easy to believe in when business is good. They&apos;re a much harder sell when the company is fighting to stay solvent.
          </p>

          <p className="m-0">
            But out of the prep work we&apos;d already done with Lippincott, and the exceptional partnership we&apos;d built, we were able to salvage what mattered most — the color system, the typography, and the grid. It wasn&apos;t everything we&apos;d planned. But it was a foundation. And a foundation was enough to keep going.
          </p>

          <p className="m-0">
            That&apos;s when I was connected to a senior technology manager.
          </p>

          <p className="m-0">
            That manager led a small foundation team — engineers who understood reusable components in the context of React, since Vision had been built on it. But design systems as a discipline, as an organizational philosophy, was new territory for them. I was building the system and teaching the methodology at the same time, to people I was also depending on to help me build it.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection2 ? (
              <img src="/work/heart-design-system/chapter-2-section-2.jpg" alt="Team Foundation — Early Partnership" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-2-section-2.jpg</span>
            )}
          </div>

          <p className="m-0">
            We were laying philosophical and foundational groundwork. Structure. Shared language. The way of thinking about it. The engineering concept clicked early, which helped. But it was slow, and uncertain, and the business case had to be made over and over.
          </p>

          <p className="m-0">
            My argument was never abstract. Southwest&apos;s culture is built on cost discipline. So I spoke that language. <em>Efficiency. Reduced rework. Faster delivery with fewer people.</em> If we could do more with less, the system paid for itself.
          </p>

          <p className="m-0">
            That argument was slower to land. But it planted seeds.
          </p>

          <p className="m-0">
            Then 2023 happened.
          </p>

          <p className="m-0">
            We finally got Figma in the door, replacing Sketch, Abstract, and Zeplin in one move. I attended my first Config — Figma&apos;s annual conference — and it&apos;s hard to overstate the timing. That was the year Figma announced variables, modes, and Dev Mode from the Config stage. The tooling was finally catching up to the vision. I came back a different kind of energized.
          </p>

          <p className="m-0">
            What had been a slow burn started moving. Shortly after, I was asked to take what we&apos;d built for responsive web and extend the system&apos;s thinking to iOS and Android. Both apps were heavily webview and hybrid at the time, which created its own challenges — but it also opened a door.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection3 ? (
              <img src="/work/heart-design-system/chapter-2-section-3.jpg" alt="Multi-platform Expansion — iOS & Android" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-2-section-3.jpg</span>
            )}
          </div>

          <p className="m-0">
            That&apos;s when the team started to take real shape. The foundation pod on the technology side became a consistent crew. A couple of native dev allies came on board. I got my first dedicated contractor. What had been a grassroots effort run mostly on conviction and borrowed time started to look, for the first time, like an actual program.
          </p>

          <p className="m-0">
            It wasn&apos;t official. But it was real.
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
