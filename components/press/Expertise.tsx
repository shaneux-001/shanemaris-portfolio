/**
 * Shared expertise grid — used identically by /about and /resume so the
 * two pages can't drift out of sync. Source list matches the locked master
 * resume content verbatim (Option B, 2026-09-05: every skill from the
 * master list gets its own chip rather than compressing multi-part skills
 * into shorter phrasing, so nothing gets lost).
 *
 * Icons dropped in this pass — with 15 skills including several abstract
 * ones ("Federated Contribution Models," "Executive Communication"),
 * finding an icon that actually fits each concept stopped being
 * meaningful, and Shane's stated intent was closer to a plain, scannable
 * LinkedIn-style skill list anyway. Simple text chips instead.
 */

const EXPERTISE = [
  "Design Ops",
  "Design Systems",
  "Figma Enterprise Administration",
  "Figma Governance",
  "Cross-Functional Leadership",
  "Design System Governance",
  "Federated Contribution Models",
  "AI Tooling Strategy",
  "AI Adoption",
  "UX Research & Strategy",
  "Stakeholder Management",
  "Executive Communication",
  "Mentoring",
  "Accessibility (WCAG)",
  "Design Token Systems",
];

export default function Expertise() {
  return (
    <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {EXPERTISE.map((skill) => (
        <div
          key={skill}
          className="text-[13.5px] text-pr-fg px-3.5 py-2.5 border border-pr-rule inline-flex items-center"
        >
          {skill}
        </div>
      ))}
    </div>
  );
}
