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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
      {EXPERTISE.map(({ skill, Icon }) => (
        <div
          key={skill}
          style={{
            fontSize: '13.5px',
            color: 'var(--pr-fg)',
            padding: '10px 14px',
            border: '1px solid var(--pr-rule)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon size={16} weight="duotone" color="var(--pr-magenta)" />
          {skill}
        </div>
      ))}
    </div>
  );
}
