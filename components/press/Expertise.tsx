import { Gear, Stack, Devices, Compass, Users, DeviceMobile, Robot, Code } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

/**
 * Shared expertise grid — used identically by /about and /resume so the
 * two pages can't drift out of sync. All icons are magenta (no accent/muted
 * split) per Shane's call, 2026-09-05.
 */

interface ExpertiseEntry { skill: string; Icon: Icon }

const EXPERTISE: ExpertiseEntry[] = [
  { skill: "Design Ops", Icon: Gear },
  { skill: "Design Systems", Icon: Stack },
  { skill: "UI/UX Design", Icon: Devices },
  { skill: "UX Strategy", Icon: Compass },
  { skill: "Design Leadership", Icon: Users },
  { skill: "App Design", Icon: DeviceMobile },
  { skill: "Agentic Design", Icon: Robot },
  { skill: "Prompt Engineering", Icon: Code },
];

export default function Expertise() {
  return (
    <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {EXPERTISE.map(({ skill, Icon }) => (
        <div
          key={skill}
          className="text-[13.5px] text-pr-fg px-3.5 py-2.5 border border-pr-rule inline-flex items-center gap-2"
        >
          <Icon size={16} weight="duotone" color="var(--pr-magenta)" />
          {skill}
        </div>
      ))}
    </div>
  );
}
