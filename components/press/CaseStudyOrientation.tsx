interface CaseStudyOrientationProps {
  role: string;
  problem: string;
  scale: string;
  whatChanged: string;
}

/**
 * Compact ROLE/PROBLEM/SCALE/WHAT CHANGED block for the top of a case
 * study — readable in ~45-60s, deliberately not a "seven-card executive
 * dashboard" (quality-gate report's own phrasing): 4 short lines, same
 * plain-text/monospace-label styling already used for meta rows elsewhere
 * on the site, no icons or card chrome added just for this.
 */
export default function CaseStudyOrientation({ role, problem, scale, whatChanged }: CaseStudyOrientationProps) {
  const items = [
    { label: "ROLE", value: role },
    { label: "PROBLEM", value: problem },
    { label: "SCALE", value: scale },
    { label: "WHAT CHANGED", value: whatChanged },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 border-y border-pr-rule py-6 mb-12">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5">
          <span className="font-plex-mono text-[10.5px] tracking-[0.1em] text-pr-muted">{item.label}</span>
          <span className="text-sm leading-[1.6] text-pr-lede">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
