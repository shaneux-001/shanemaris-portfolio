/**
 * PressMark — "B · Knockout centre", the mark chosen from the mark lab
 * in the Press Room redesign. Two flat process inks (cyan, magenta) on
 * a 3x3 grid with a transparent centre — the knockout is the only shape
 * information, so it holds at 16px, and because the centre is
 * transparent it needs no separate light/dark variant.
 *
 * Distinct from components/Mark.tsx (the plum-gradient mark used by
 * the pre-redesign token system, still referenced by /resume and the
 * work case-study pages).
 */

interface PressMarkProps {
  size?: number;
}

export default function PressMark({ size = 24 }: PressMarkProps) {
  const cell = (bg?: string) => (
    <div style={{ background: bg }} />
  );

  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: 2,
        flexShrink: 0,
      }}
    >
      {cell('#00AEEF')}{cell('#00AEEF')}{cell('#00AEEF')}
      {cell('#00AEEF')}{cell(undefined)}{cell('#EC008C')}
      {cell('#EC008C')}{cell('#EC008C')}{cell('#EC008C')}
    </div>
  );
}
