import type { Metadata } from "next";
import Expertise from "@/components/press/Expertise";
import Ghost from "@/components/press/Ghost";

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

interface ExperienceEntry { role: string; span: string; bullets: React.ReactNode[] }

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Digital Product Manager, Design Operations",
    span: "Dec 2022 to present",
    bullets: [
      "Expanded design system leadership buy-in across the organization; scaled Heart Design System from web to iOS native and Android platforms",
      "Directly managed a contractor through a proof-of-concept that validated extending HDS to native iOS and Android — work that led to a long-term contractor relationship I continue to manage today, including skip-level visibility with leadership",
      "Led Southwest's migration off Sketch and Abstract onto Figma as the single org-wide design tool, growing adoption from roughly 20 seats to 2,706 total today (320 of those paid/functional) across 55+ teams; led onboarding company-wide and have set up 20 workspaces for groups across the organization",
      "Established design systems governance and adoption standards spanning UX Design, Creative Design, Product, and front-end engineering pods, coordinating across departments in Digital Experience, Technology, and Marketing",
      "Prototyped an AI-powered design system tool in a weekend — a component health dashboard, real-time Q&A agent, and governance intake system — avoiding a planned $150K/year vendor purchase (Knapsack); currently paused while foundational v1 work brings HDS to a state that's actually AI-ready, informing the roadmap toward v2",
      <>
        Industry recognition: invited by Figma to co-present on its &quot;In The File&quot; content series, covering Southwest&apos;s design system journey and real-world use of the Design Token Playbook, variables, and Dev Mode (
        <a href="https://www.figma.com/community/file/1413217155092677522/in-the-file-southwest-airlines-design-system-journey" target="_blank" rel="noopener noreferrer" className="text-pr-accent-text border-b border-pr-accent-text">slides</a>
        {" · "}
        <a href="https://www.figma.com/webinars/southwest-airlines-ds/?fuid=1222657138998324113" target="_blank" rel="noopener noreferrer" className="text-pr-accent-text border-b border-pr-accent-text">webinar page</a>
        )
      </>,
      "Co-lead the UX Community of Practice; manage design operations and optimization of enterprise design processes",
      "Partner with Marketing and Technology to optimize design processes, and share design systems guidance with Customer Experience and Innovation as teams choose to use it",
    ],
  },
  {
    role: "Lead UX Designer",
    span: "Mar 2022 to Dec 2022",
    bullets: [
      "Defined and documented Heart Design System vision, establishing the strategic foundation for enterprise-scale governance",
      "Secured executive leadership buy-in on the design systems investment and organizational approach",
      "Bridged individual contributor and leadership roles while building the case for a dedicated design operations function",
    ],
  },
  {
    role: "Senior UX Designer",
    span: "Feb 2019 to Mar 2022",
    bullets: [
      "Led design updates and enhancements to My Account and Homepage, key customer touchpoints",
      "Pioneered the internal business case for design systems adoption at Southwest, early thinking that directly led to Heart DS",
      "Co-founded and co-led the UX Community of Practice (with another UX Designer), establishing shared design standards across teams",
    ],
  },
  {
    role: "UX Designer",
    span: "Apr 2014 to Feb 2019",
    bullets: [
      "A core team member on Vision, Southwest's multi-year overhaul of southwest.com, designing and launching core customer flows including Flight Status, Check-In, Cancel, Plan Trip, My Account, Rapid Rewards Shopping, and the original WiFi/IFE Portal, plus the EarlyBird Standalone flow, Business Select upgrades, and the Gift Card purchase experience",
      "Designed and shipped a hybrid Select Flights page as a short-lived hedge between the existing experience and the full Vision redesign — leadership was wary of the conversion dip from changing that much at once, so this stopgap ran for about a month while we confirmed conversion rate and average order value held before fully committing to Vision",
      "Partnered with Southwest's Innovation Group on two internal tools: one giving station leadership real-time employee context during in-person visits, another giving gate agents real-time tools to personally engage top-tier loyalty customers",
      "Used A/B testing and established UX research (Baymard, NN/g) to validate design decisions when they conflicted with stakeholder preference, grounding product direction in data rather than opinion",
    ],
  },
  {
    role: "Web Designer",
    span: "Feb 2012 to Apr 2014",
    bullets: [
      "Transitioned from contractor to FTE; designed and built Southwest's first mobile-optimized sale landing page, driving a 200% increase in mobile shopping immediately post-launch",
      "Supported content creation across Southwest's Digital Channels and managed production timelines, ensuring consistency and delivery across marketing and digital properties",
    ],
  },
  {
    role: "UX Designer (Contractor)",
    span: "Aug 2011 to Feb 2012",
    bullets: [
      "Integrated AirTran's digital presence into the Southwest ecosystem following the airlines' merger",
      "Collaborated with SMEs to establish UX and digital best practices, laying groundwork for future design operations",
    ],
  },
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
          <Ghost trigger="load">Shane Maris</Ghost>
        </h1>
        <p className="m-0 mb-1.5 text-base text-pr-lede">Design Systems Leader | Design Operations Strategy</p>
        <p className="m-0 mb-[18px] font-plex-mono text-[12.5px] tracking-[0.02em] text-pr-muted">
          Dallas, TX (open to relocating; prefers Remote or Hybrid) · 214.546.3047 · contact@shanemaris.com ·{" "}
          <a href="https://www.linkedin.com/in/shanemaris/" target="_blank" rel="noopener noreferrer" className="text-pr-accent-text border-b border-pr-accent-text">linkedin.com/in/shanemaris</a>
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <a href="/Shane_Maris_Resume.pdf" download className="pr-cta pr-hoverable">
            <Ghost>Download Resume (PDF)</Ghost>
          </a>
          <a href="/Shane_Maris_Resume.md" download className="pr-btn-secondary pr-hoverable">
            <Ghost>Plain text (.md)</Ghost>
          </a>
        </div>

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
              <ul className="m-0 pl-[18px] flex flex-col gap-2 max-w-[62ch]">
                {e.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-pr-lede leading-[1.7]">{b}</li>
                ))}
              </ul>
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
      </div>
    </main>
  );
}
