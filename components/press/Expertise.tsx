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
 * Grid (2026-09-08): fixed 4 columns (.pr-expertise-grid, app/globals.css),
 * not auto-fit — was 5 columns at desktop width before. Collapses to 2
 * columns at ≤759px (same breakpoint as .pr-two-col etc.) — see that class
 * for the mobile override.
 *
 * Order (2026-09-08): grouped by rendered line count at a real 1280px
 * viewport (measured directly, not guessed — the resize_window "desktop"
 * preset reflects the pane's own narrower size and gives a false reading,
 * don't use it for this). At the 4-column width, "Figma Enterprise
 * Administration" and "Cross-Functional Leadership" were the last two
 * labels still wrapping to 2 lines — trimmed to "Figma Enterprise Admin"
 * and "Cross-Team Leadership" so every chip is now a single line, all 3
 * rows clean (no more line-count grouping needed; keep this in mind if a
 * label is ever lengthened again, since it could reintroduce wrapping).
 * Re-verify in the browser (measure actual rendered line count at a real
 * viewport width, not the "desktop" preset — don't eyeball it) if any
 * label text changes.
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
  { label: "Figma Enterprise Admin", Icon: FigmaLogo },
  { label: "Cross-Team Leadership", Icon: UsersThree },
  { label: "Design System Governance", Icon: Blueprint },
  { label: "UX Research & Strategy", Icon: MagnifyingGlass },
  { label: "Stakeholder Management", Icon: Handshake },
  { label: "Accessibility (WCAG)", Icon: Wheelchair },
];

export default function Expertise() {
  return (
    <div className="pr-expertise-grid">
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
