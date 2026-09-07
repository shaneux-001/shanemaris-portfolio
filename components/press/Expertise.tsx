/**
 * Shared expertise grid — used identically by /about and /resume so the
 * two pages can't drift out of sync.
 *
 * Icons brought back 2026-09-07 (were dropped 2026-09-05, then Shane asked
 * for them again once "Prompt Engineering" got cut per the quality-gate
 * audit — see ROADMAP.md). Every icon below was confirmed to actually exist
 * in the installed @phosphor-icons/react package (not guessed from memory)
 * before being wired in. Three of these are the icon that best fits, not a
 * confident single "obvious" match — flagged in the commit message so Shane
 * can swap them by hand if a better one turns up: Figma Governance
 * (ShieldCheck), Design System Governance (Blueprint), and AI Adoption
 * (TrendUp) are all abstract concepts without one universally-obvious glyph.
 */

import {
  Gear,
  Stack,
  FigmaLogo,
  ShieldCheck,
  UsersThree,
  Blueprint,
  Robot,
  TrendUp,
  MagnifyingGlass,
  Handshake,
  Presentation,
  GraduationCap,
  Wheelchair,
} from '@phosphor-icons/react/dist/ssr';

const EXPERTISE = [
  { label: "Design Ops", Icon: Gear },
  { label: "Design Systems", Icon: Stack },
  { label: "Figma Enterprise Administration", Icon: FigmaLogo },
  { label: "Figma Governance", Icon: ShieldCheck },
  { label: "Cross-Functional Leadership", Icon: UsersThree },
  { label: "Design System Governance", Icon: Blueprint },
  { label: "AI Tooling Strategy", Icon: Robot },
  { label: "AI Adoption", Icon: TrendUp },
  { label: "UX Research & Strategy", Icon: MagnifyingGlass },
  { label: "Stakeholder Management", Icon: Handshake },
  { label: "Executive Communication", Icon: Presentation },
  { label: "Mentoring", Icon: GraduationCap },
  { label: "Accessibility (WCAG)", Icon: Wheelchair },
];

export default function Expertise() {
  return (
    <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {EXPERTISE.map(({ label, Icon }) => (
        <div
          key={label}
          className="text-[13.5px] text-pr-fg px-3.5 py-2.5 border border-pr-rule inline-flex items-center gap-2.5 min-h-16"
        >
          <Icon size={16} color="var(--pr-magenta)" className="shrink-0" />
          {label}
        </div>
      ))}
    </div>
  );
}
