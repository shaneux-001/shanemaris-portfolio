import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import PressCta from "@/components/press/PressCta";
import Ghost from "@/components/press/Ghost";
import { readTimes } from "@/lib/readTime";

export const metadata: Metadata = {
  title: "No Straight Lines · Heart Design System",
  description: "Scaling a design system is hard. Scaling one without a dedicated team is a different kind of hard.",
};

export default function Chapter4() {
  const workDir = path.join(process.cwd(), "public", "work", "heart-design-system");
  const hasHero = fs.existsSync(path.join(workDir, "chapter-4-hero.jpg"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-4-section-1.jpg"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-4-section-2.jpg"));

  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)]">
        <Link href="/work/heart-design-system" className="pr-arrow-link pr-hoverable font-plex-mono text-xs tracking-[0.06em] text-pr-accent-text no-underline inline-block mb-6">
          <Ghost>← BACK TO HEART DS</Ghost>
        </Link>

        <span className="block font-plex-mono text-[11px] tracking-[0.06em] text-pr-magenta mb-3.5">
          CHAPTER 4 OF 4
        </span>

        <h1 className="pr-page-title m-0 mb-2 font-archivo font-bold leading-[1.05] tracking-[-0.03em] text-pr-fg-strong max-w-[22ch]">
          <Ghost trigger="load">No Straight Lines</Ghost>
        </h1>

        <p className="m-0 mb-3 text-base text-pr-lede">Scaling</p>
        <p className="m-0 mb-10 font-plex-mono text-xs text-pr-muted">Read time: {readTimes.chapter4}</p>

        <div className="relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
          {hasHero ? (
            <img src="/work/heart-design-system/chapter-4-hero.jpg" alt="Chapter 4 — No Straight Lines" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-hero.jpg</span>
          )}
        </div>

        <div className="max-w-[62ch] flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            Scaling a design system is hard. Scaling one without a dedicated team, across two departments, four different teams, and reporting lines that stretch up to two directors and a VP — while the company around you is navigating one of the most turbulent stretches in aviation history — is a different kind of hard.
          </p>

          <p className="m-0">
            That&apos;s where I&apos;ve been living for the past few years.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection1 ? (
              <img src="/work/heart-design-system/chapter-4-section-1.jpg" alt="Org Chart — Stakeholder Map" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-section-1.jpg</span>
            )}
          </div>

          <p className="m-0">
            The challenges came in threes. Getting native engineering to buy in. Finding budget and headcount in a difficult environment. And building the tooling infrastructure — component inventory, documentation, living style guide — the operational bits that determine whether a system scales.
          </p>

          <p className="m-0">
            None of these are fully solved. I want to be honest about that.
          </p>

          <p className="m-0">
            Southwest faced serious headwinds — operational crises, investor pressure, business model shifts, and the first layoffs in company history. In that environment, securing resources for a program that lives between departments, without a clean org chart line, was consistently an uphill conversation.
          </p>

          <div className="relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
            {hasSection2 ? (
              <img src="/work/heart-design-system/chapter-4-section-2.jpg" alt="Resilience — Navigation Through Crisis" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-section-2.jpg</span>
            )}
          </div>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            A design system isn&apos;t just a technical challenge. It&apos;s an organizational one.
          </blockquote>

          <p className="m-0">
            The components are the easy part. The hard part is alignment — getting the right people pointed in the same direction, across teams with different priorities, timelines, and definitions of done.
          </p>

          <p className="m-0">
            But this year feels different. Efficiency is at the top of leadership&apos;s agenda. I have a new leader who gets it. And for the first time, I have the organizational momentum to right-size the program — solidify the foundation, build the tools we&apos;ve always needed, and turn what has been an exceptionally resilient grassroots effort into something that scales.
          </p>

          <p className="m-0">
            The system survived things it probably shouldn&apos;t have. Now it&apos;s time to let it thrive.
          </p>
        </div>

        <div className="flex justify-between items-center mt-14 pt-6 border-t border-pr-rule">
          <PressCta href="/work/heart-design-system/chapter-3" variant="secondary">← PREVIOUS</PressCta>
          <PressCta href="/work/heart-design-system">BACK TO OVERVIEW</PressCta>
        </div>
      </div>
    </main>
  );
}
