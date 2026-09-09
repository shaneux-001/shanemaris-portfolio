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
 *
 * Order (2026-09-08, re-verified after dropping Executive Communication):
 * grouped by rendered line count at the standard 5-column desktop width
 * (measured directly at a real 1280px viewport, not guessed) so 1-line
 * labels share a row with other 1-line labels and 2-line labels share a row
 * with other 2-line labels, avoiding the uneven look of mixed rows even with
 * the fixed chip height below. 6 one-liners and 6 two-liners still don't
 * split evenly across rows of 5 (6 mod 5 = 1 either way), so row 2
 * unavoidably mixes one straggler in with the two-liners regardless of which
 * group goes first — rows 1 and 3 come out fully clean, which is the best
 * "where possible" gets at this column count. Re-verify this grouping in the
 * browser (measure actual rendered line count at a real viewport width, not
 * the resize_window "desktop" preset which reflects the pane's own narrower
 * size — don't eyeball it) if any label text changes.
 */

import {
  Gear,
  Stack,
  ShieldCheck,
  Robot,
  TrendUp,
  GraduationCap,
  FigmaLogo,
  UsersThree,
  Blueprint,
  MagnifyingGlass,
  Handshake,
  Wheelchair,
} from '@phosphor-icons/react/dist/ssr';

const EXPERTISE = [
  // 1-line labels at the standard desktop width
  { label: "Design Ops", Icon: Gear },
  { label: "Design Systems", Icon: Stack },
  { label: "Figma Governance", Icon: ShieldCheck },
  { label: "AI Tooling Strategy", Icon: Robot },
  { label: "AI Adoption", Icon: TrendUp },
  { label: "Mentoring", Icon: GraduationCap },
  // 2-line labels at the standard desktop width
  { label: "Figma Enterprise Administration", Icon: FigmaLogo },
  { label: "Cross-Functional Leadership", Icon: UsersThree },
  { label: "Design System Governance", Icon: Blueprint },
  { label: "UX Research & Strategy", Icon: MagnifyingGlass },
  { label: "Stakeholder Management", Icon: Handshake },
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
