/**
 * Shared content for the generated one-page resume (PDF + plain-text .md).
 *
 * This is a CONDENSED subset of resume-source/Shane_Maris_Resume.md, trimmed
 * to fit one printed page. Every surviving bullet is copied verbatim from the
 * master — nothing here is paraphrased. Whole bullets were cut for space,
 * never edited mid-sentence. If you need to change wording (not just which
 * bullets survive), change resume-source/Shane_Maris_Resume.md first, then
 * re-sync this file to match.
 *
 * This file is the intentionally-public "master" one-pager download — the
 * general-purpose version anyone can pull from the site. Per-application
 * tailored/trimmed versions are a separate, manual thing Shane does outside
 * this pipeline (Claude Design), not something this site auto-generates.
 */

export const NAME = "Shane Maris";
export const TITLE = "Design Systems Leader | Design Operations Strategy";
export const CONTACT = "Dallas, TX (open to relocating; prefers Remote or Hybrid) · 214.546.3047 · contact@shanemaris.com · linkedin.com/in/shanemaris";

export const SUMMARY = "Design systems and design ops leader with over a decade at Southwest Airlines, currently driving strategy for the airline's customer-facing commercial design system, spanning responsive web and native iOS and Android. Built and scaled a design system from the ground up, from the initial org-wide tool migration to a governance model that now reaches over 2,700 users, and turned that work into outcomes senior leadership could act on.";

export interface ExperienceEntry {
  role: string;
  span: string;
  bullets: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Digital Product Manager, Design Operations",
    span: "Dec 2022 to present",
    bullets: [
      "Led Southwest's migration off Sketch and Abstract onto Figma as the single org-wide design tool, growing adoption from roughly 20 seats to 2,706 total today (320 of those paid/functional) across 55+ teams; led onboarding company-wide and have set up 20 workspaces for groups across the organization",
      "Established design systems governance and adoption standards spanning UX Design, Creative Design, Product, and front-end engineering pods, coordinating across departments in Digital Experience, Technology, and Marketing",
      "Prototyped an AI-powered design system tool in a weekend — a component health dashboard, real-time Q&A agent, and governance intake system — avoiding a planned $150K/year vendor purchase (Knapsack); currently paused while foundational v1 work brings HDS to a state that's actually AI-ready, informing the roadmap toward v2",
      "Directly managed a contractor through a proof-of-concept that validated extending HDS to native iOS and Android — work that led to a long-term contractor relationship I continue to manage today, including skip-level visibility with leadership",
      "Industry recognition: invited by Figma to co-present on its \"In The File\" content series, covering Southwest's design system journey and real-world use of the Design Token Playbook, variables, and Dev Mode",
    ],
  },
  {
    role: "Lead UX Designer",
    span: "Mar 2022 to Dec 2022",
    bullets: [
      "Defined and documented Heart Design System vision, establishing the strategic foundation for enterprise-scale governance",
    ],
  },
  {
    role: "Senior UX Designer",
    span: "Feb 2019 to Mar 2022",
    bullets: [
      "Pioneered the internal business case for design systems adoption at Southwest, early thinking that directly led to Heart DS",
      "Co-founded and co-led the UX Community of Practice (with another UX Designer), establishing shared design standards across teams",
    ],
  },
  {
    role: "UX Designer",
    span: "Apr 2014 to Feb 2019",
    bullets: [
      "A core team member on Vision, Southwest's multi-year overhaul of southwest.com, designing and launching core customer flows including Flight Status, Check-In, Cancel, Plan Trip, My Account, Rapid Rewards Shopping, and the original WiFi/IFE Portal, plus the EarlyBird Standalone flow, Business Select upgrades, and the Gift Card purchase experience",
    ],
  },
  {
    role: "Web Designer",
    span: "Feb 2012 to Apr 2014",
    bullets: [
      "Transitioned from contractor to FTE; designed and built Southwest's first mobile-optimized sale landing page, driving a 200% increase in mobile shopping immediately post-launch",
    ],
  },
  {
    role: "UX Designer (Contractor)",
    span: "Aug 2011 to Feb 2012",
    bullets: [
      "Integrated AirTran's digital presence into the Southwest ecosystem following the airlines' merger",
    ],
  },
];

export const EDUCATION = [
  { title: "B.A. Interactive Media Design", meta: "Art Institute of Dallas, 2008 to 2011" },
];

export const CERTIFICATIONS = [
  { title: "NN/g Certificate in User Experience, with Specialty Recognition in UX Management", meta: "Nielsen Norman Group, 2022 to 2025" },
  { title: "ICAgile Certified Professional, Agile Team Facilitation (ICP-ATF)", meta: "January 2022" },
];

export const SKILLS = [
  "Design Ops", "Design Systems", "Figma Enterprise Administration", "Figma Governance",
  "Cross-Functional Leadership", "Design System Governance", "Federated Contribution Models",
  "AI Tooling Strategy", "AI Adoption", "UX Research & Strategy", "Stakeholder Management",
  "Executive Communication", "Mentoring", "Accessibility (WCAG)", "Design Token Systems",
];
