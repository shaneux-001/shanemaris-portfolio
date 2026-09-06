import type { Metadata } from "next";
import PressCta from "@/components/press/PressCta";
import Expertise from "@/components/press/Expertise";

export const metadata: Metadata = {
  title: "Resume",
  description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops. Building scalable design systems and leading UX teams.",
  openGraph: {
    title: "Resume · Shane Maris",
    description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops.",
    url: "https://shanemaris.com/resume",
  },
  twitter: {
    title: "Resume · Shane Maris",
    description: "14+ years at Southwest Airlines — from Web Designer to Digital Product Manager, Design Ops.",
  },
};

interface ExperienceEntry { role: string; span: string; copy: string; highlights?: string[] }

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Digital Product Manager, Design Ops",
    span: "Dec 2022 to present",
    copy: "Manage and maintain the commercial design system. Co-lead the UX Community of Practice. Directly managed a contractor through a proof-of-concept that validated extending HDS to native iOS and Android — work that led to a long-term contractor relationship I continue to manage today, including skip-level visibility with leadership. Partner with Marketing and Technology to optimize design processes, and share design systems guidance with Customer Experience and Innovation as teams choose to use it.",
    highlights: [
      "Led Southwest's migration off Sketch and Abstract onto Figma as the single org-wide design tool, growing adoption from roughly 20 seats to 2,706 total today (320 of those paid/functional seats) across 55+ teams.",
      "Prototyped an AI-powered design system tool in a weekend — a component health dashboard, real-time Q&A agent, and governance intake system — avoiding a planned $150K/year vendor purchase (Knapsack). Currently paused while foundational v1 work brings HDS to a state that's actually AI-ready, informing the roadmap toward v2.",
    ],
  },
  { role: "Lead UX Designer", span: "Mar 2022 to Dec 2022", copy: "Co-led the UX Community of Practice. Led design effort for the first Southwest commercial digital design system. Worked with engineers to implement design systems for responsive web and native apps." },
  { role: "Sr. UX Designer", span: "Feb 2019 to Mar 2022", copy: "Explored design systems and design ops as a formal role within Southwest. Design Leader for system implementation across responsive web, native iOS and Android. Created UX Community of Practice in 2020." },
  { role: "UX Designer", span: "Apr 2014 to Feb 2019", copy: "Primary designer on Vision, the complete redesign of Southwest Digital Channels. Designer for Check-in, Homepage, Select Flights, Manage Reservation, and Enhanced Reaccommodation." },
  { role: "Web Designer", span: "Feb 2012 to Apr 2014", copy: "Transitioned from contractor to FTE, supporting content creation across Southwest's Digital Channels. Managed production timelines, ensuring consistency and delivery across marketing and digital properties." },
  { role: "UX Designer (Contractor)", span: "Aug 2011 to Feb 2012", copy: "Integrated AirTran's digital presence into the Southwest ecosystem following acquisition. Collaborated with SMEs to establish UX and digital best practices, laying groundwork for future design operations." },
];

const EDUCATION = [
  { title: "B.A. Interactive Media Design", meta: "Art Institute of Dallas 2008 to 2011" },
  { title: "NN/g Certificate in User Experience, with Specialty Recognition in UX Management", meta: "Nielsen Norman Group 2022 to 2025" },
  { title: "ICAgile Certified Professional, Agile Team Facilitation (ICP-ATF)", meta: "Jan 2022" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-plex-mono text-[11px] tracking-[0.1em] text-pr-muted mb-[22px] border-t border-pr-rule pt-[22px]">
      {children}
    </div>
  );
}

export default function Resume() {
  return (
    <main className="pr-page">
      <div className="pr-main pt-[clamp(36px,5vw,56px)] pb-6">
        <h1 className="pr-page-title m-0 mb-2.5 font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">
          Shane Maris
        </h1>
        <p className="m-0 mb-1.5 text-base text-pr-lede">Design Ops and Systems Leader</p>
        <p className="m-0 mb-[18px] font-plex-mono text-[12.5px] tracking-[0.02em] text-pr-muted">
          contact@shanemaris.com · shanemaris.com · +1 (214) 546 3047
        </p>
        {/* Download link removed 2026-09-05 — the .docx it pointed to was retired
            (wrong degree name, "UX design team" language, stale numbers). Phase 7
            replaces it with a PDF + .md generated from the locked master content;
            this link comes back once that exists. */}

        <div className="mt-8 max-w-[62ch]">
          <p className="text-[15px] text-pr-lede leading-[1.75] m-0 mb-3.5">
            I build the scaffolding designers actually need to do good work — processes that hold up, tools people will use without a fight, and enough shared standard that teams stop reinventing the same decisions.
          </p>
          <p className="text-[15px] text-pr-lede leading-[1.75] m-0">
            I&apos;m a designer by trade who started fixing stuff on the side because I&apos;m the kind of person who can&apos;t leave a broken process alone. It worked well enough that I was able to turn it into my full-time focus.
          </p>
        </div>

        <SectionLabel>EXPERIENCE — SOUTHWEST AIRLINES, 2011 TO PRESENT</SectionLabel>
        <div className="flex flex-col gap-7 mb-2">
          {EXPERIENCE.map((e) => (
            <div key={e.role}>
              <div className="flex gap-4 items-baseline mb-1.5 flex-wrap">
                <h3 className="font-archivo text-lg font-semibold text-pr-fg-strong m-0">{e.role}</h3>
                <span className="font-plex-mono text-[10.5px] tracking-[0.04em] text-pr-muted">{e.span.toUpperCase()}</span>
              </div>
              <p className="text-sm text-pr-lede leading-[1.7] m-0 max-w-[62ch]">{e.copy}</p>
              {e.highlights && (
                <ul className="mt-2.5 mb-0 pl-[18px] flex flex-col gap-2 max-w-[62ch]">
                  {e.highlights.map((h) => (
                    <li key={h} className="text-sm text-pr-lede leading-[1.7]">{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <SectionLabel>EXPERTISE</SectionLabel>
        <div className="mb-2">
          <Expertise />
        </div>

        <SectionLabel>EDUCATION AND CERTIFICATIONS</SectionLabel>
        <div className="flex flex-col gap-[18px] mb-2">
          {EDUCATION.map((item) => (
            <div key={item.title}>
              <p className="font-archivo text-base font-semibold text-pr-fg-strong m-0 mb-[3px]">{item.title}</p>
              <p className="font-plex-mono text-xs tracking-[0.02em] text-pr-muted m-0">{item.meta}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-pr-rule pt-8 mt-2">
          <p className="font-archivo text-[22px] font-bold text-pr-fg-strong m-0 mb-3.5">Want to work together?</p>
          <PressCta href="/contact">GET IN TOUCH</PressCta>
        </div>
      </div>
    </main>
  );
}
