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
  const hasHero = fs.existsSync(path.join(workDir, "chapter-4-hero.png"));
  const hasSection1 = fs.existsSync(path.join(workDir, "chapter-4-section-1.png"));
  const hasSection2 = fs.existsSync(path.join(workDir, "chapter-4-section-2.png"));
  const hasSection3 = fs.existsSync(path.join(workDir, "chapter-4-section-3.png"));

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

        <div className={`relative aspect-[1.6/1] mb-10 overflow-hidden flex items-end p-3.5${hasHero ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
          {hasHero ?  (
            <img src="/work/heart-design-system/chapter-4-hero.png" alt="Chapter 4 — No Straight Lines" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-hero.png</span>
          )}
        </div>

        <div className="max-w-[62ch] mx-auto flex flex-col gap-[22px] text-[15.5px] leading-[1.8] text-pr-lede">
          <p className="m-0">
            I told my leader directly: I need help, I can&apos;t do this alone. That&apos;s how I got my first dedicated contractor.
          </p>

          <p className="m-0">
            I didn&apos;t get to interview him individually — we vet through the staffing partner, not the person — but I coached him on the strategy from day one: no custom-building every native component, use the platform&apos;s own patterns where users already expect them, aim for feature parity instead of design parity. If Apple or Google had their own way of doing something, that was fine — we only needed the user to have the same capabilities. Southwest branding layered on top, customized only where it mattered. I was also deliberate about keeping the platforms from blurring together, following the same &quot;system of systems&quot; model I&apos;d seen larger companies use for their own multi-platform work, rather than one system pretending to be everything at once.
          </p>

          <div className={`relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5${hasSection1 ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
            {hasSection1 ?  (
              <img src="/work/heart-design-system/chapter-4-section-1.png" alt="Multi-platform expansion — iOS & Android" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-section-1.png</span>
            )}
          </div>

          <p className="m-0">
            Native engineering buy-in didn&apos;t come from a single meeting — it came from staying consistent. Everything the team was building before this was effectively custom, one-off components, and I watched us lose good engineering talent to companies working in a more modern way. My leader was hearing the same feedback from a different angle — why doesn&apos;t the app feel like an app. I kept offering the same answer to both problems, and once we defined real design tokens for the first time during that native work, the idea stopped being abstract to our technology partners. That&apos;s when it started to spread on its own.
          </p>

          <p className="m-0">
            He showed up just ahead of one of the biggest shifts in how we worked. A few months into 2023, we finally replaced our old design-tooling patchwork with Figma — we dubbed it &quot;Figma Day&quot; internally — and having him already helping me plan what we&apos;d need to rebuild made the move faster than doing it solo would have. I attended Config that same year, the conference where they announced the features (variables, modes, Dev Mode) that made everything we&apos;d been arguing for actually practical. I came back a different kind of energized.
          </p>

          <p className="m-0">
            That&apos;s when the team started to take real shape. A foundation pod on the technology side became a consistent crew. A couple of native allies came aboard. I had my first dedicated contractor. What had been a grassroots effort run on conviction and borrowed time started to look, for the first time, like an actual program.
          </p>

          <p className="m-0">
            It wasn&apos;t official. But it was real.
          </p>

          <p className="m-0">
            Scaling a design system is hard. Scaling one without a dedicated team, across two departments, four different teams, and reporting lines that stretch up to two directors and a VP — while the company around you is navigating one of the most turbulent stretches in its history — is a different kind of hard.
          </p>

          <p className="m-0">
            That&apos;s where I&apos;ve been living for the past few years.
          </p>

          <div className={`relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5${hasSection2 ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
            {hasSection2 ?  (
              <img src="/work/heart-design-system/chapter-4-section-2.png" alt="Org Chart — Stakeholder Map" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-section-2.png</span>
            )}
          </div>

          <p className="m-0">
            I&apos;ve made calls here I&apos;m not fully certain about, and I&apos;d rather say so than pretend otherwise. When resourcing didn&apos;t stretch far enough to unify naming conventions across every platform the system now touches, I let our technology partners make that call on their own rather than hold up the work waiting for a version of me that had time to do it &quot;right.&quot; It didn&apos;t fully pan out — the inconsistency it created has since been called out as one of the things slowing us down. I&apos;d make the same call again given the same resourcing, but I own that it&apos;s an open problem, not a solved one.
          </p>

          <p className="m-0">
            What needs rethinking next isn&apos;t the system-of-systems approach itself — letting each platform&apos;s out-of-the-box components do the heavy lifting is still the right call, and I&apos;d make it again. It&apos;s the seams between them: unifying naming conventions and UI kits across iOS, Android, and web so the same small team can move across all three without holding three separate vocabularies in their heads. That matters more given the math. Our UX team, not counting me or my contractor, is about 12 designers with two to three contractors at any given time, working opposite a front-end engineering org of roughly 250 — something like one designer for every 17 or 18 engineers. That ratio isn&apos;t getting more forgiving, and the pressure to deliver faster only compounds it. Unifying naming and kits doesn&apos;t fix the ratio, but it&apos;s the lever I actually control, and it buys the team back real time.
          </p>

          <div className={`relative aspect-[1.5/1] overflow-hidden flex items-end p-3.5${hasSection3 ? "" : " bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]"}`}>
            {hasSection3 ?  (
              <img src="/work/heart-design-system/chapter-4-section-3.png" alt="Resilience — Navigation Through Crisis" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="font-plex-mono text-[11px] text-pr-muted">chapter-4-section-3.png</span>
            )}
          </div>

          <blockquote className="font-archivo text-[28px] italic text-pr-magenta border-l-4 border-pr-magenta pl-8 my-4 leading-[1.4]">
            A design system isn&apos;t just a technical challenge. It&apos;s an organizational one.
          </blockquote>

          <p className="m-0">
            The components are the easy part. The hard part is alignment — getting the right people pointed in the same direction, across teams with different priorities, timelines, and definitions of done.
          </p>

          <p className="m-0">
            None of this is fully solved. I want to be honest about that. What&apos;s changed is that I now have a leader who&apos;s spent real time understanding what this work actually is and why it matters to the business, rather than a leader who inherited design systems as one line item among many. That&apos;s given me room to plan seriously — bringing in outside design-systems specialists to assess where the system actually stands (not to tell us anything we didn&apos;t already suspect, but to give it outside authority), and to start building a real case for the team this needs, rather than the team it&apos;s had to survive on.
          </p>

          <p className="m-0">
            The system survived things it probably shouldn&apos;t have. What it needs next isn&apos;t more conviction — I&apos;ve never been short on that. It needs resourcing to match the scope it&apos;s already grown into.
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
