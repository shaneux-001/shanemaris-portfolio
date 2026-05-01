// @ts-nocheck — SVG coordinate attributes (x, y, width, height, rx, r, cx, cy) are
// typed as number-only in React's SVG types but accept strings in real SVG. This file
// is purely presentational with no business logic, so nocheck is the right trade-off.
/**
 * CaseStudyHero — per-project SVG illustration for case study pages.
 *
 * Each slug maps to a bespoke SVG hero that references the portfolio's
 * design tokens. No external images needed; all illustrations are inline
 * SVG so they load instantly and work in dark mode via CSS custom props.
 *
 * Aspect ratio: 16:9 (matches the 1/0.56 placeholder in the page).
 */

interface CaseStudyHeroProps {
  slug: string;
  title: string;
}

/* ─── shared palette pulled from design tokens ─────────────────────────── */
const P = {
  plum:       '#7B5EA7',
  plumLight:  '#A88AD0',
  plumTint:   'rgba(123,94,167,0.08)',
  plumTint15: 'rgba(123,94,167,0.15)',
  terra:      '#B8442B',
  terraTint:  'rgba(184,68,43,0.10)',
  ink:        '#1C1B17',
  muted:      '#6B655F',
  base:       '#F7F5F2',
  surface:    '#FFFFFF',
  divider:    '#E8E4DE',
};

/* ─── browser chrome wrapper ────────────────────────────────────────────── */
function BrowserFrame({ children, url = 'southwest.com' }: { children: React.ReactNode; url?: string }) {
  return (
    <g>
      {/* Window shadow */}
      <rect x="40" y="28" width="720" height="444" rx="10" fill="rgba(0,0,0,0.06)" />
      {/* Window body */}
      <rect x="36" y="24" width="720" height="444" rx="10" fill={P.surface} />
      {/* Toolbar */}
      <rect x="36" y="24" width="720" height="36" rx="10" fill={P.divider} />
      <rect x="36" y="44" width="720" height="16" fill={P.divider} />
      {/* Traffic lights */}
      <circle cx="60" cy="42" r="5" fill="#FF5F57" />
      <circle cx="76" cy="42" r="5" fill="#FEBC2E" />
      <circle cx="92" cy="42" r="5" fill="#28C840" />
      {/* URL bar */}
      <rect x="160" y="33" width="360" height="18" rx="4" fill={P.surface} />
      <text x="340" y="45.5" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted}>{url}</text>
      {children}
    </g>
  );
}

/* ─── phone frame wrapper ───────────────────────────────────────────────── */
function PhoneFrame({ children, x = 280, y = 20 }: { children: React.ReactNode; x?: number; y?: number }) {
  const w = 240, h = 420;
  return (
    <g>
      {/* Shadow */}
      <rect x={x + 4} y={y + 6} width={w} height={h} rx="28" fill="rgba(0,0,0,0.08)" />
      {/* Body */}
      <rect x={x} y={y} width={w} height={h} rx="28" fill={P.ink} />
      {/* Screen */}
      <rect x={x + 10} y={y + 14} width={w - 20} height={h - 28} rx="20" fill={P.base} />
      {/* Notch */}
      <rect x={x + 86} y={y + 14} width={68} height="22" rx="11" fill={P.ink} />
      {/* Home indicator */}
      <rect x={x + 90} y={y + h - 24} width="60" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
      {children}
    </g>
  );
}

/* ─── reusable UI primitives ────────────────────────────────────────────── */
function TextLine({ x, y, w, h = 6, fill = P.divider }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} />;
}

function Pill({ x, y, w = 48, label, accent = false }: { x: number; y: number; w?: number; label?: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="14" rx="7"
        fill={accent ? P.terraTint : P.plumTint}
        stroke={accent ? P.terra : P.plum}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />
      {label && <text x={x + w / 2} y={y + 9.5} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fill={accent ? P.terra : P.plum}>{label}</text>}
    </g>
  );
}

function Card({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x + 2} y={y + 3} width={w} height={h} rx="6" fill="rgba(0,0,0,0.04)" />
      <rect x={x} y={y} width={w} height={h} rx="6" fill={P.surface} stroke={P.divider} strokeWidth="1" />
      {children}
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO ILLUSTRATIONS — one per slug
══════════════════════════════════════════════════════════════════════════ */

/** Heart Design System — token grid + component palette */
function HeartDesignSystemHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      {/* Background */}
      <rect width="800" height="450" fill={P.base} />
      {/* Accent band */}
      <rect width="800" height="4" fill={P.plum} />

      {/* Left panel — token list */}
      <Card x={40} y={40} w={200} h={370}>
        <text x="56" y="68" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">FOUNDATIONS</text>
        {['Color', 'Typography', 'Spacing', 'Elevation', 'Motion', 'Icons'].map((t, i) => (
          <g key={t}>
            <rect x="52" y={82 + i * 28} width="4" height="16" rx="2" fill={i === 0 ? P.plum : P.divider} />
            <TextLine x="62" y={87 + i * 28} w={110} h={8} fill={i === 0 ? P.ink : P.divider} />
          </g>
        ))}
        <text x="56" y="280" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">COMPONENTS</text>
        {['Button', 'Card', 'Form', 'Navigation', 'Modal'].map((t, i) => (
          <g key={t}>
            <rect x="52" y={294 + i * 24} width="4" height="14" rx="2" fill={P.divider} />
            <TextLine x="62" y={298 + i * 24} w={90} h={7} fill={P.divider} />
          </g>
        ))}
      </Card>

      {/* Center — color tokens */}
      <Card x={264} y={40} w={240} h={170}>
        <text x="280" y="66" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">COLOR TOKENS</text>
        {[
          { label: 'color-accent', color: P.plum },
          { label: 'color-accent-2', color: P.terra },
          { label: 'color-ink', color: P.ink },
          { label: 'color-muted', color: P.muted },
          { label: 'color-base', color: '#E8E4DE' },
        ].map(({ label, color }, i) => (
          <g key={label}>
            <rect x="280" y={78 + i * 24} width="20" height="14" rx="3" fill={color} />
            <TextLine x="308" y={82 + i * 24} w={120} h={7} fill={P.divider} />
            <TextLine x="308" y={89 + i * 24} w={70} h={5} fill={P.divider} />
          </g>
        ))}
      </Card>

      {/* Center — type ramp */}
      <Card x={264} y={228} w={240} h={182}>
        <text x="280" y="254" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">TYPE RAMP</text>
        <text x="280" y="278" fontFamily="Georgia,serif" fontSize="24" fill={P.ink} opacity="0.9">Display</text>
        <text x="280" y="302" fontFamily="Georgia,serif" fontSize="16" fill={P.ink} opacity="0.8">Heading 1</text>
        <text x="280" y="322" fontFamily="Georgia,serif" fontSize="12" fill={P.ink} opacity="0.7">Heading 2</text>
        <TextLine x="280" y="334" w={180} h={7} fill={P.divider} />
        <TextLine x="280" y="346" w={200} h={6} fill={P.divider} />
        <TextLine x="280" y="356" w={160} h={6} fill={P.divider} />
        <TextLine x="280" y="366" w={140} h={5} fill={P.divider} />
        <TextLine x="280" y="376" w={110} h={5} fill={P.divider} />
        <TextLine x="280" y="386" w={90} h={5} fill={P.divider} />
      </Card>

      {/* Right — component showcase */}
      <Card x={528} y={40} w={232} h={370}>
        <text x="544" y="66" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">COMPONENTS</text>

        {/* Button group */}
        <rect x="544" y="76" width="88" height="22" rx="5" fill={P.plum} />
        <TextLine x="560" y="84" w={56} h={7} fill="rgba(255,255,255,0.8)" />
        <rect x="640" y="76" width="88" height="22" rx="5" fill="transparent" stroke={P.plum} strokeWidth="1.5" />
        <TextLine x="656" y="84" w={56} h={7} fill={P.plum} />

        {/* Card component */}
        <Card x="544" y="112" w={196} h={80}>
          <rect x="552" y="120" width="36" height="36" rx="4" fill={P.plumTint} />
          <TextLine x="596" y="126" w={120} h={8} fill={P.divider} />
          <TextLine x="596" y="139" w={100} h={6} fill={P.divider} />
          <TextLine x="596" y="150" w={80} h={6} fill={P.divider} />
          <Pill x="552" y="168" w={40} label="New" />
          <Pill x="598" y="168" w={52} label="Design Ops" accent />
        </Card>

        {/* Form input */}
        <rect x="544" y="208" width="196" height="22" rx="4" fill={P.surface} stroke={P.muted} strokeWidth="1" />
        <TextLine x="552" y="217" w={100} h={7} fill={P.divider} />
        <rect x="544" y="238" width="196" height="22" rx="4" fill={P.surface} stroke={P.plum} strokeWidth="1.5" />
        <TextLine x="552" y="247" w={60} h={7} fill={P.plum} />
        {/* Focus ring */}
        <rect x="541" y="235" width="202" height="28" rx="6" fill="none" stroke={P.plum} strokeWidth="2" strokeOpacity="0.2" />

        {/* Breadcrumb nav */}
        <g opacity="0.9">
          <TextLine x="544" y="278" w={28} h={6} fill={P.plum} />
          <text x="578" y="283" fontFamily="system-ui,sans-serif" fontSize="8" fill={P.divider}>/</text>
          <TextLine x="586" y="278" w={36} h={6} fill={P.plum} />
          <text x="628" y="283" fontFamily="system-ui,sans-serif" fontSize="8" fill={P.divider}>/</text>
          <TextLine x="636" y="278" w={52} h={6} fill={P.muted} />
        </g>

        {/* Badge row */}
        <Pill x="544" y="298" w={38} label="Badge" />
        <Pill x="588" y="298" w={44} label="Status" accent />
        <Pill x="638" y="298" w={36} label="Tag" />

        {/* Divider */}
        <line x1="544" y1="324" x2="732" y2="324" stroke={P.divider} strokeWidth="1" />

        {/* Checkbox group */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect x="544" y={334 + i * 20} width="12" height="12" rx="2"
              fill={i === 0 ? P.plum : P.surface}
              stroke={i === 0 ? P.plum : P.divider} strokeWidth="1" />
            {i === 0 && <path d="M547 340 l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />}
            <TextLine x="562" y={338 + i * 20} w={80} h={6} fill={P.divider} />
          </g>
        ))}
      </Card>

      {/* Bottom watermark */}
      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">HEART DESIGN SYSTEM · SWA</text>
    </svg>
  );
}

/** Responsive Homepage — browser with full-bleed hero + grid */
function HomepageV2Hero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill="#E8E4DE" />
      <BrowserFrame url="southwest.com">
        {/* Nav bar inside browser */}
        <rect x="36" y="60" width="720" height="40" fill={P.surface} />
        <rect x="56" y="72" width="60" height="16" rx="3" fill={P.plumTint} />
        {[0,1,2,3,4].map(i => <TextLine key={i} x={140 + i * 80} y={76} w={52} h={8} fill={P.divider} />)}
        <rect x="680" y="70" width="60" height="20" rx="4" fill={P.plum} />

        {/* Hero band */}
        <rect x="36" y="100" width="720" height="160" fill={P.plum} />
        {/* Hero text */}
        <rect x="80" y="122" width="200" height="20" rx="4" fill="rgba(255,255,255,0.25)" />
        <rect x="80" y="150" width="280" height="14" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x="80" y="170" width="240" height="14" rx="3" fill="rgba(255,255,255,0.15)" />
        <rect x="80" y="196" width="100" height="28" rx="5" fill={P.terra} />
        {/* Hero illustration dots */}
        <circle cx="580" cy="180" r="60" fill="rgba(255,255,255,0.06)" />
        <circle cx="620" cy="150" r="40" fill="rgba(255,255,255,0.04)" />

        {/* Booking widget */}
        <rect x="80" y="240" width="620" height="72" rx="8" fill={P.surface} />
        <rect x="80" y="240" width="620" height="72" rx="8" stroke={P.divider} strokeWidth="1" fill="none" />
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={100 + i * 152} y="256" width="128" height="36" rx="4" fill={P.base} />
            <TextLine x={108 + i * 152} y="262" w={60} h={5} fill={P.divider} />
            <TextLine x={108 + i * 152} y="272" w={90} h={8} fill={P.muted} />
          </g>
        ))}
        <rect x="712" y="252" width="68" height="44" rx="6" fill={P.plum} />

        {/* Card grid */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={80 + i * 178} y="336" width="162" height="90" rx="6" fill={P.surface} stroke={P.divider} strokeWidth="1" />
            <rect x={84 + i * 178} y="340" width="154" height="44" rx="4" fill={P.plumTint} />
            <TextLine x={92 + i * 178} y="396" w={100} h={8} fill={P.divider} />
            <TextLine x={92 + i * 178} y="408" w={70} h={6} fill={P.divider} />
          </g>
        ))}
      </BrowserFrame>
    </svg>
  );
}

/** My Account Redesign — dashboard with sidebar nav + account panels */
function MyAccountHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill="#E8E4DE" />
      <BrowserFrame url="southwest.com/my-account">
        {/* Sidebar */}
        <rect x="36" y="60" width="170" height="408" fill={P.base} />
        {/* Avatar */}
        <circle cx="121" cy="100" r="24" fill={P.plumTint} />
        <circle cx="121" cy="94" r="10" fill={P.plum} opacity="0.4" />
        <ellipse cx="121" cy="118" rx="16" ry="10" fill={P.plum} opacity="0.3" />
        <TextLine x="75" y="132" w={92} h={7} fill={P.divider} />
        <TextLine x="88" y="144" w={66} h={5} fill={P.divider} />

        {/* Nav items */}
        {['Dashboard','Upcoming Trips','Rapid Rewards','My Account','Payment Methods','Preferences','Sign Out'].map((item, i) => (
          <g key={item}>
            <rect x="42" y={164 + i * 34} width="158" height="26" rx="4"
              fill={i === 0 ? P.plum : 'transparent'} />
            <rect x="48" y={170 + i * 34} width="4" height="14" rx="2"
              fill={i === 0 ? 'rgba(255,255,255,0.5)' : P.divider} />
            <TextLine x="58" y={174 + i * 34} w={100} h={7}
              fill={i === 0 ? 'rgba(255,255,255,0.8)' : P.divider} />
          </g>
        ))}

        {/* Main content */}
        {/* Rapid Rewards banner */}
        <rect x="220" y="68" width="520" height="80" rx="6" fill={P.plum} />
        <circle cx="680" cy="108" r="44" fill="rgba(255,255,255,0.06)" />
        <TextLine x="240" y="88" w={80} h={6} fill="rgba(255,255,255,0.4)" />
        <rect x="240" y="100" width="140" height="18" rx="3" fill="rgba(255,255,255,0.2)" />
        <rect x="240" y="126" width="80" height="10" rx="2" fill="rgba(255,255,255,0.15)" />

        {/* Upcoming trip card */}
        <Card x={220} y={164} w={518} h={100}>
          <TextLine x="238" y="184" w={60} h={5} fill={P.divider} />
          <rect x="238" y="194" width="200" height="14" rx="3" fill={P.ink} opacity="0.15" />
          {/* Flight bar */}
          <rect x="238" y="218" width="482" height="30" rx="4" fill={P.base} />
          <text x="258" y="237" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="600" fill={P.ink} opacity="0.7">DAL</text>
          <line x1="296" y1="233" x2="400" y2="233" stroke={P.divider} strokeWidth="1.5" strokeDasharray="3,3" />
          <circle cx="398" cy="233" r="4" fill={P.plum} opacity="0.6" />
          <line x1="400" y1="233" x2="490" y2="233" stroke={P.divider} strokeWidth="1.5" />
          <text x="500" y="237" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="600" fill={P.ink} opacity="0.7">DEN</text>
        </Card>

        {/* Stat cards row */}
        {[['Points Balance','52,400'],['Tier Status','A-List'],['Segments','18 of 25']].map(([label, val], i) => (
          <Card key={label} x={220 + i * 176} y={280} w={162} h={64}>
            <TextLine x={236 + i * 176} y={296} w={80} h={5} fill={P.divider} />
            <text x={236 + i * 176} y={324} fontFamily="system-ui,sans-serif" fontSize="14" fontWeight="700" fill={P.plum}>{val}</text>
          </Card>
        ))}

        {/* Quick actions */}
        <Card x={220} y={360} w={518} h={60}>
          <TextLine x="238" y="380" w={80} h={6} fill={P.divider} />
          {['Book a Flight','Check In','Change Flight','Cancel'].map((a, i) => (
            <rect key={a} x={238 + i * 122} y="390" width="106" height="18" rx="4"
              fill={i === 0 ? P.plum : 'transparent'}
              stroke={i === 0 ? 'none' : P.divider} strokeWidth="1" />
          ))}
        </Card>
      </BrowserFrame>
    </svg>
  );
}

/** Native App Homepage — iOS app with card-based home feed */
function NativeAppHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill="#E8E4DE" />

      {/* Ambient glow */}
      <ellipse cx="400" cy="225" rx="260" ry="200" fill={P.plumTint} />

      {/* Left device */}
      <PhoneFrame x={140} y={18}>
        {/* Status bar */}
        <TextLine x={152} y={50} w={30} h={5} fill={P.muted} />
        <TextLine x={330} y={50} w={30} h={5} fill={P.muted} />

        {/* Nav bar */}
        <rect x={152} y={62} width={220} height={36} fill={P.surface} />
        <rect x={158} y={70} width={56} height={20} rx="10" fill={P.plum} />
        <TextLine x={162} y={77} w={48} h={8} fill="rgba(255,255,255,0.8)" />
        <TextLine x={224} y={77} w={60} h={8} fill={P.divider} />
        <TextLine x={294} y={77} w={60} h={8} fill={P.divider} />

        {/* Hero banner */}
        <rect x={152} y={98} width={220} height={80} fill={P.plum} />
        <TextLine x={164} y={116} w={80} h={6} fill="rgba(255,255,255,0.4)" />
        <TextLine x={164} y={128} w={140} h={12} fill="rgba(255,255,255,0.25)" />
        <TextLine x={164} y={146} w={110} h={10} fill="rgba(255,255,255,0.2)" />
        <rect x={164} y={160} width={72} height={10} rx="5" fill={P.terra} />

        {/* Upcoming trip card */}
        <rect x={152} y={186} width={220} height={70} fill={P.surface} />
        <TextLine x={164} y={200} w={50} h={5} fill={P.divider} />
        <TextLine x={164} y={210} w={120} h={9} fill={P.ink} />
        {/* Mini flight bar */}
        <text x={172} y={238} fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill={P.ink} opacity="0.7">DAL</text>
        <line x1={196} y1={236} x2={300} y2={236} stroke={P.divider} strokeWidth="1" />
        <circle cx={248} cy={236} r={3} fill={P.plum} opacity="0.7" />
        <text x={310} y={238} fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill={P.ink} opacity="0.7">LAS</text>
        <TextLine x={164} y={244} w={60} h={5} fill={P.divider} />

        {/* Quick actions */}
        <rect x={152} y={260} width={220} height={56} fill={P.base} />
        {[['✈','Book'],['☑','Check In'],['⬡','Rewards']].map(([ic, label], i) => (
          <g key={label}>
            <circle cx={176 + i * 72} cy={280} r={14} fill={P.surface} />
            <TextLine x={162 + i * 72} y={298} w={28} h={5} fill={P.divider} />
          </g>
        ))}

        {/* Offers scroll */}
        <rect x={152} y={318} width={220} height={80} fill={P.surface} />
        <TextLine x={164} y={334} w={56} h={6} fill={P.divider} />
        <rect x={164} y={344} width={90} height={44} rx="6" fill={P.plumTint} />
        <rect x={260} y={344} width={90} height={44} rx="6" fill={P.terraTint} />
        <TextLine x={170} y={357} w={70} h={5} fill={P.divider} />
        <TextLine x={170} y={366} w={55} h={5} fill={P.divider} />
      </PhoneFrame>

      {/* Right device — lighter, offset */}
      <PhoneFrame x={424} y={42}>
        <rect x={434} y={80} width={220} height={340} rx="16" fill={P.base} />
        {/* Rapid Rewards screen */}
        <rect x={434} y={80} width={220} height={60} fill={P.plum} rx="16" />
        <rect x={434} y={110} width={220} height={30} fill={P.plum} />
        <circle cx={544} cy={110} r={22} fill="rgba(255,255,255,0.12)" />
        <TextLine x={458} y={95} w={80} h={6} fill="rgba(255,255,255,0.4)" />
        <TextLine x={458} y={106} w={120} h={10} fill="rgba(255,255,255,0.25)" />
        {/* Points display */}
        <text x={544} y={158} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="22" fontWeight="700" fill={P.plum} opacity="0.8">52,400</text>
        <TextLine x={488} y={170} w={112} h={5} fill={P.divider} />
        {/* Progress bar */}
        <rect x={448} y={182} width={192} height={8} rx="4" fill={P.divider} />
        <rect x={448} y={182} width={138} height={8} rx="4" fill={P.plum} opacity="0.6" />
        {/* Transaction list */}
        {[1,2,3,4,5].map(i => (
          <g key={i}>
            <circle cx={460} cy={210 + i * 30} r={10} fill={P.plumTint} />
            <TextLine x={476} y={207 + i * 30} w={100} h={6} fill={P.divider} />
            <TextLine x={476} y={217 + i * 30} w={60} h={4} fill={P.divider} />
            <TextLine x={588} y={207 + i * 30} w={40} h={6} fill={i % 2 === 0 ? P.plum : P.divider} />
          </g>
        ))}
      </PhoneFrame>

      {/* Label */}
      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">SOUTHWEST · NATIVE APP · iOS + ANDROID</text>
    </svg>
  );
}

/** Vision Decommission — system migration diagram */
function VisionDecommissionHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill={P.base} />

      {/* Grid lines */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
        <line key={`v${i}`} x1={i * 54 + 8} y1="0" x2={i * 54 + 8} y2="450" stroke={P.divider} strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={`h${i}`} x1="0" y1={i * 56 + 9} x2="800" y2={i * 56 + 9} stroke={P.divider} strokeWidth="0.5" />
      ))}

      {/* Title */}
      <text x="400" y="46" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fill={P.ink} opacity="0.8">Vision → Heart Design System</text>
      <TextLine x="240" y="56" w={320} h={1} fill={P.divider} />

      {/* LEFT — Vision (legacy) boxes */}
      <text x="90" y="92" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="600" fill={P.muted} letterSpacing="0.08em">VISION (LEGACY)</text>

      {['Home', 'Book', 'Check In', 'My Account', 'Rapid Rewards'].map((label, i) => (
        <g key={label} opacity={0.7 - i * 0.1}>
          <rect x={30} y={102 + i * 54} width={120} height={36} rx="4"
            fill={P.surface} stroke={P.divider} strokeWidth="1.5" strokeDasharray="4,3" />
          <TextLine x={48} y={117 + i * 54} w={80} h={7} fill={P.muted} />
          <TextLine x={48} y={128 + i * 54} w={60} h={5} fill={P.divider} />
        </g>
      ))}

      {/* Arrows pointing right */}
      {[0,1,2,3,4].map(i => (
        <g key={i} opacity={0.9 - i * 0.1}>
          <line x1="152" y1={120 + i * 54} x2="248" y2={120 + i * 54}
            stroke={i < 3 ? P.plum : P.divider} strokeWidth="1.5"
            strokeDasharray={i >= 3 ? '4,3' : undefined} />
          <polygon points={`244,116 252,120 244,124`} fill={i < 3 ? P.plum : P.divider} />
          {/* Status badge */}
          <rect x="182" y="112" width="34" height="14" rx="7"
            fill={i < 3 ? P.plum : i === 3 ? P.terraTint : P.divider}
            fillOpacity={i < 3 ? 0.15 : 1} />
          <text x="199" y="121.5" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6"
            fill={i < 3 ? P.plum : i === 3 ? P.terra : P.muted}>
            {i < 3 ? 'DONE' : i === 3 ? 'WIP' : 'TODO'}
          </text>
        </g>
      ))}

      {/* RIGHT — Heart DS boxes */}
      <text x="370" y="92" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="600" fill={P.muted} letterSpacing="0.08em">HEART DS</text>

      {['Home (HDS)', 'Book (HDS)', 'Check In (HDS)', 'My Acct (WIP)', 'RR (Planned)'].map((label, i) => (
        <g key={label}>
          <rect x={254} y={102 + i * 54} width={130} height={36} rx="4"
            fill={i < 3 ? P.plumTint : P.surface}
            stroke={i < 3 ? P.plum : P.divider} strokeWidth="1.5"
            opacity={i < 4 ? 1 : 0.5} />
          <TextLine x={272} y={117 + i * 54} w={90} h={7}
            fill={i < 3 ? P.plum : P.divider} />
          <TextLine x={272} y={128 + i * 54} w={60} h={5} fill={P.divider} />
        </g>
      ))}

      {/* Token migration diagram on right */}
      <Card x={432} y={72} w={332} h={310}>
        <text x="448" y="98" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="600" fill={P.muted} letterSpacing="0.08em">TOKEN MIGRATION MAP</text>

        {/* Old → New pairs */}
        {[
          ['$vision-blue-primary', 'color-accent'],
          ['$vision-red-cta', 'color-accent-2'],
          ['$vision-gray-dark', 'color-ink'],
          ['$vision-gray-mid', 'color-muted'],
          ['$vision-white-bg', 'color-base'],
          ['$font-proxima', 'font-inter'],
          ['$font-merriweather', 'font-playfair'],
          ['$radius-4', 'radius-sm / radius-md'],
        ].map(([old, next], i) => (
          <g key={old}>
            <rect x="448" y={110 + i * 32} width="110" height="18" rx="3"
              fill={P.surface} stroke={P.divider} strokeWidth="1" />
            <text x="503" y={122 + i * 32} textAnchor="middle"
              fontFamily="system-ui,sans-serif" fontSize="6.5" fill={P.muted}>{old}</text>
            <text x="566" y={122 + i * 32} fontFamily="system-ui,sans-serif" fontSize="8" fill={P.divider}>→</text>
            <rect x="572" y={110 + i * 32} width="172" height="18" rx="3"
              fill={P.plumTint} stroke={P.plum} strokeWidth="0.5" strokeOpacity="0.4" />
            <text x="658" y={122 + i * 32} textAnchor="middle"
              fontFamily="system-ui,sans-serif" fontSize="6.5" fill={P.plum}>{next}</text>
          </g>
        ))}
      </Card>

      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">VISION DECOMMISSION · DESIGN SYSTEMS MIGRATION</text>
    </svg>
  );
}

/** IFE Starlink Portal — in-flight entertainment portal UI */
function IFEStarlinkHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      {/* Night sky bg */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D0B1A" />
          <stop offset="100%" stopColor="#1C1630" />
        </linearGradient>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={P.plum} stopOpacity="0.3" />
          <stop offset="100%" stopColor={P.plum} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#sky)" />

      {/* Stars */}
      {[[80,40],[200,90],[350,30],[500,60],[640,25],[720,80],[160,180],[460,140],[700,160],[550,200],[100,240],[740,300]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.5 : 1} fill="white" opacity={0.4 + (i % 3) * 0.2} />
      ))}

      {/* Glow behind portal */}
      <ellipse cx="400" cy="250" rx="320" ry="200" fill="url(#glow)" />

      {/* Portal screen — passenger's phone */}
      <PhoneFrame x={264} y={20}>
        {/* Portal header */}
        <rect x={274} y={56} width={272} height={44} fill="rgba(123,94,167,0.95)" />
        <circle cx={400} cy={56} r={100} fill="rgba(255,255,255,0.04)" />
        <TextLine x={290} y={70} w={40} h={5} fill="rgba(255,255,255,0.5)" />
        <rect x={290} y={80} width={140} height={10} rx="3" fill="rgba(255,255,255,0.2)" />
        {/* Signal icon */}
        <rect x={510} y={66} width={6} height={14} rx="2" fill="rgba(255,255,255,0.6)" />
        <rect x={520} y={60} width={6} height={20} rx="2" fill="rgba(255,255,255,0.6)" />
        <rect x={530} y={52} width={6} height={28} rx="2" fill="rgba(255,255,255,0.6)" />

        {/* Flight status bar */}
        <rect x={274} y={100} width={272} height={40} fill="rgba(28,27,23,0.9)" />
        <text x={400} y={116} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fill="rgba(255,255,255,0.5)" letterSpacing="0.06em">CURRENT FLIGHT</text>
        <text x={306} y={130} fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="white">DAL</text>
        <line x1={330} y1={127} x2={466} y2={127} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Plane along route */}
        <circle cx={390} cy={127} r={3} fill={P.plumLight} />
        <text x={494} y={130} fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700" fill="white">LAS</text>

        {/* Browse sections */}
        <rect x={274} y={140} width={272} height={230} fill="rgba(20,18,30,0.95)" />
        <TextLine x={286} y={158} w={70} h={6} fill="rgba(255,255,255,0.3)" />

        {/* Content grid */}
        {[[0,0],[1,0],[0,1],[1,1]].map(([col, row], i) => (
          <g key={i}>
            <rect x={286 + col * 130} y={168 + row * 90} width={120} height={78} rx="6"
              fill={`rgba(${[80,50,50,30][i]},${[60,40,80,60][i]},${[100,60,60,80][i]},0.4)`} />
            <TextLine x={296 + col * 130} y={222 + row * 90} w={80} h={6} fill="rgba(255,255,255,0.4)" />
            <TextLine x={296 + col * 130} y={232 + row * 90} w={60} h={4} fill="rgba(255,255,255,0.2)" />
          </g>
        ))}

        {/* Bottom nav */}
        <rect x={274} y={372} width={272} height={44} fill="rgba(13,11,26,0.98)" />
        {['Home','Movies','Music','Shop','Map'].map((nav, i) => (
          <g key={nav}>
            <rect x={286 + i * 50} y={380} width={8} height={8} rx="2"
              fill={i === 0 ? P.plumLight : 'rgba(255,255,255,0.2)'} />
            <TextLine x={284 + i * 50} y={394} w={28} h={4} fill={i === 0 ? P.plumLight : 'rgba(255,255,255,0.2)'} />
          </g>
        ))}
      </PhoneFrame>

      {/* Floating elements — altitude/speed */}
      <Card x={50} y={120} w={160} h={90}>
        <text x="66" y="148" fontFamily="system-ui,sans-serif" fontSize="22" fontWeight="700" fill={P.plum}>38,000</text>
        <TextLine x="66" y="158" w={80} h={5} fill={P.divider} />
        <TextLine x="66" y="168" w={100} h={5} fill={P.divider} />
        <TextLine x="66" y="180" w={70} h={5} fill={P.divider} />
        <rect x="66" y="191" width={120} height={6} rx="3" fill={P.divider} />
        <rect x="66" y="191" width={90} height={6} rx="3" fill={P.plum} opacity="0.5" />
      </Card>

      <Card x={588} y={120} w={162} h={90}>
        <TextLine x="604" y="142" w={60} h={5} fill={P.divider} />
        <text x="604" y="162" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="700" fill={P.plumLight}>1h 52m</text>
        <TextLine x="604" y="172" w={80} h={5} fill={P.divider} />
        <TextLine x="604" y="184" w={100} h={5} fill={P.divider} />
        <TextLine x="604" y="196" w={70} h={5} fill={P.divider} />
      </Card>

      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="0.1em">IFE STARLINK PORTAL · PROJECT FIREWORK</text>
    </svg>
  );
}

/** Mobile Check-In — phone with boarding pass UI */
function MobileCheckInHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill="#E8E4DE" />
      <ellipse cx="400" cy="225" rx="240" ry="190" fill={P.plumTint} />

      {/* Web browser — left */}
      <g transform="translate(20, 20) scale(0.62)">
        <rect x="36" y="24" width="560" height="380" rx="10" fill={P.surface} />
        <rect x="36" y="24" width="560" height="36" rx="10" fill={P.divider} />
        <rect x="36" y="44" width="560" height="16" fill={P.divider} />
        <circle cx="60" cy="42" r="5" fill="#FF5F57" />
        <circle cx="76" cy="42" r="5" fill="#FEBC2E" />
        <circle cx="92" cy="42" r="5" fill="#28C840" />
        <rect x="200" y="33" width="200" height="18" rx="4" fill={P.surface} />
        <text x="300" y="45.5" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted}>southwest.com/check-in</text>

        {/* Check-in steps */}
        <rect x="36" y="60" width="560" height="344" fill={P.base} />
        <rect x="36" y="60" width="560" height="40" fill={P.plum} />
        <TextLine x="80" y="77" w={120} h={10} fill="rgba(255,255,255,0.25)" />
        <TextLine x="80" y="92" w={80} h={6} fill="rgba(255,255,255,0.15)" />

        {/* Progress bar */}
        <rect x="80" y="116" width="432" height="6" rx="3" fill={P.divider} />
        <rect x="80" y="116" width="216" height="6" rx="3" fill={P.plum} opacity="0.7" />
        {[0,1,2].map(i => (
          <circle key={i} cx={80 + i * 216} cy="119" r="8"
            fill={i < 2 ? P.plum : P.divider} />
        ))}

        {/* Form */}
        <TextLine x="80" y="148" w={100} h={7} fill={P.ink} />
        <rect x="80" y="160" width="432" height="28" rx="4" fill={P.surface} stroke={P.divider} strokeWidth="1" />
        <TextLine x="88" y="172" w={120} h={7} fill={P.divider} />

        <TextLine x="80" y="206" w={80} h={7} fill={P.ink} />
        <rect x="80" y="218" width="200" height="28" rx="4" fill={P.surface} stroke={P.plum} strokeWidth="1.5" />
        <TextLine x="88" y="230" w={80} h={7} fill={P.muted} />
        <rect x="77" y="215" width="206" height="34" rx="6" fill="none" stroke={P.plum} strokeWidth="2" strokeOpacity="0.2" />

        <rect x="380" y="338" width="132" height="32" rx="5" fill={P.plum} />
        <TextLine x="408" y="352" w={76} h={9} fill="rgba(255,255,255,0.8)" />
      </g>

      {/* Phone — center/right */}
      <PhoneFrame x={350} y={14}>
        {/* Boarding pass */}
        <rect x={360} y={56} width={240} height={360} fill={P.base} />

        {/* Header */}
        <rect x={360} y={56} width={240} height={50} fill={P.plum} />
        <TextLine x={372} y={72} w={60} h={6} fill="rgba(255,255,255,0.4)" />
        <TextLine x={372} y={84} w={120} h={10} fill="rgba(255,255,255,0.25)" />
        <rect x={556} y={66} width={36} height={28} rx="4" fill="rgba(255,255,255,0.12)" />

        {/* Flight info */}
        <rect x={370} y={118} width={220} height={70} rx="6" fill={P.surface} />
        <text x={395} y={140} fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="700" fill={P.ink}>DAL</text>
        <text x={408} y={158} textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fill={P.muted}>→</text>
        <text x={530} y={140} textAnchor="end" fontFamily="system-ui,sans-serif" fontSize="18" fontWeight="700" fill={P.ink}>LAS</text>
        <TextLine x={380} y={170} w={200} h={5} fill={P.divider} />

        {/* Details row */}
        {[['Gate','A12'],['Seat','14C'],['Boarding','9:45A'],['Departs','10:25A']].map(([label, val], i) => (
          <g key={label}>
            <rect x={366 + (i % 2) * 114} y={200 + Math.floor(i / 2) * 48} width={108} height={38} rx="4"
              fill={P.base} />
            <TextLine x={374 + (i % 2) * 114} y={212 + Math.floor(i / 2) * 48} w={50} h={5} fill={P.divider} />
            <text x={374 + (i % 2) * 114} y={230 + Math.floor(i / 2) * 48}
              fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700"
              fill={P.plum}>{val}</text>
          </g>
        ))}

        {/* Tear line */}
        <line x1={360} y1={300} x2={600} y2={300} stroke={P.divider} strokeWidth="1.5" strokeDasharray="4,4" />
        <circle cx={360} cy={300} r={6} fill={P.base} />
        <circle cx={600} cy={300} r={6} fill={P.base} />

        {/* Barcode */}
        <rect x={380} y={316} width={200} height={60} rx="4" fill={P.surface} />
        {Array.from({length: 28}).map((_, i) => (
          <rect key={i} x={390 + i * 6.5} y={324} width={i % 4 === 0 ? 4 : 2} height={44}
            rx="0.5" fill={P.ink} opacity={0.7 + (i % 3) * 0.1} />
        ))}
        <TextLine x={430} y={375} w={100} h={5} fill={P.divider} />
      </PhoneFrame>

      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">CHECK-IN REDESIGN · WEB + MOBILE WEB · 2015</text>
    </svg>
  );
}

/** Homepage Redesign 2014 — vintage browser with 2014 SWA rebrand */
function HomepageRedesignHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill="#E0DDD8" />

      {/* Old-style browser chrome */}
      <rect x="40" y="20" width="720" height="410" rx="4" fill={P.surface} />
      <rect x="40" y="20" width="720" height="42" rx="4" fill="#CFCBC5" />
      <rect x="40" y="44" width="720" height="18" fill="#CFCBC5" />
      <circle cx="60" cy="41" r="5" fill="#FF5F57" />
      <circle cx="76" cy="41" r="5" fill="#FEBC2E" />
      <circle cx="92" cy="41" r="5" fill="#28C840" />
      {/* IE-style address bar */}
      <rect x="140" y="29" width="440" height="22" rx="2" fill={P.surface} />
      <TextLine x="150" y="38" w={200} h={7} fill={P.muted} />
      <rect x="590" y="29" width="60" height="22" rx="2" fill="#CFCBC5" />

      {/* Page content */}
      {/* Old nav */}
      <rect x="40" y="62" width="720" height="40" fill={P.ink} />
      {/* SWA logo placeholder */}
      <rect x="60" y="70" width="64" height="24" rx="2" fill={P.terra} />
      {[0,1,2,3,4,5].map(i => (
        <TextLine key={i} x={160 + i * 88} y={76} w={60} h={7} fill="rgba(255,255,255,0.6)" />
      ))}

      {/* Hero with old full-bleed photo style */}
      <rect x="40" y="102" width="720" height="150" fill="#BDB8AF" />
      {/* Vintage price promotion */}
      <rect x="80" y="120" width="260" height="112" rx="2" fill="rgba(255,255,255,0.9)" />
      <rect x="80" y="120" width="260" height="28" fill={P.terra} />
      <TextLine x="92" y="132" w={100} h={8} fill="rgba(255,255,255,0.8)" />
      <text x="160" y="188" textAnchor="middle" fontFamily="Georgia,serif" fontSize="28" fontWeight="700" fill={P.ink} opacity="0.8">$99</text>
      <TextLine x="100" y="200" w={200} h={6} fill={P.divider} />
      <TextLine x="100" y="212" w={160} h={6} fill={P.divider} />
      <rect x="100" y="222" width="100" height="20" rx="2" fill={P.terra} />

      {/* Old-style booking widget */}
      <rect x="40" y="252" width="720" height="60" fill="#F0EDE8" />
      <rect x="40" y="252" width="720" height="60" stroke={P.divider} strokeWidth="1" fill="none" />
      {/* Tabs */}
      <rect x="52" y="256" width="70" height="22" rx="2 2 0 0" fill={P.surface} />
      <rect x="126" y="260" width="70" height="18" rx="2 2 0 0" fill="#E8E4DE" />
      <TextLine x="58" y="265" w={58} h={7} fill={P.plum} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={56 + i * 170} y={284} width={148} height={20} rx="2" fill={P.surface} stroke={P.divider} strokeWidth="1" />
          <TextLine x={64 + i * 170} y={292} w={80} h={7} fill={P.divider} />
        </g>
      ))}

      {/* Links section */}
      <rect x="40" y="314" width="720" height="146" fill={P.surface} />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={52 + i * 178} y={326} width={164} height={90} rx="2" fill={P.base} stroke={P.divider} strokeWidth="1" />
          <rect x={52 + i * 178} y={326} width={164} height={36} fill="#BDB8AF" />
          <TextLine x={64 + i * 178} y={380} w={100} h={8} fill={P.ink} />
          <TextLine x={64 + i * 178} y={394} w={130} h={6} fill={P.divider} />
          <TextLine x={64 + i * 178} y={404} w={100} h={6} fill={P.divider} />
        </g>
      ))}

      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">SOUTHWEST.COM REBRAND · 2013–2014 · WEB DESIGNER</text>
    </svg>
  );
}

/** Change & Cancel — flow diagram / step UI */
function ChangeCancelHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill={P.base} />
      <rect width="800" height="4" fill={P.terra} />

      <BrowserFrame url="southwest.com/change-flight">
        {/* Nav */}
        <rect x="36" y="60" width="720" height="36" fill={P.surface} />
        <rect x="56" y="70" width="56" height="16" rx="3" fill={P.terraTint} />
        {[0,1,2,3].map(i => <TextLine key={i} x={130 + i * 84} y={75} w={60} h={7} fill={P.divider} />)}

        {/* Page header */}
        <TextLine x="80" y="116" w={60} h={6} fill={P.divider} />
        <rect x="80" y="128" width="280" height="18" rx="3" fill={P.ink} opacity="0.12" />

        {/* Step indicator */}
        <rect x="80" y="162" width="640" height="40" rx="6" fill={P.base} />
        {['1 Select','2 New Flight','3 Fare Diff','4 Confirm'].map((step, i) => (
          <g key={step}>
            <circle cx={130 + i * 170} cy="182" r="14"
              fill={i === 0 ? P.terra : i < 1 ? P.plum : P.surface}
              stroke={i > 0 ? P.divider : 'none'} strokeWidth="1" />
            <text x={130 + i * 170} y="186" textAnchor="middle"
              fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700"
              fill={i < 1 ? 'white' : P.divider}>{i + 1}</text>
            <TextLine x={148 + i * 170} y="179" w={90} h={6} fill={i === 0 ? P.terra : P.divider} />
            {i < 3 && <line x1={146 + i * 170} y1="182" x2={116 + (i + 1) * 170} y2="182"
              stroke={P.divider} strokeWidth="1.5" />}
          </g>
        ))}

        {/* Current flight card */}
        <Card x={80} y={218} w={290} h={100}>
          <TextLine x="98" y="236" w={60} h={5} fill={P.divider} />
          <rect x="98" y="246" width="240" height="14" rx="3" fill={P.divider} />
          {/* Flight mini */}
          <text x="98" y="282" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill={P.ink} opacity="0.7">DAL</text>
          <line x1="122" y1="278" x2="200" y2="278" stroke={P.divider} strokeWidth="1.5" />
          <circle cx="198" cy="278" r="3" fill={P.terra} opacity="0.8" />
          <line x1="200" y1="278" x2="280" y2="278" stroke={P.divider} strokeWidth="1.5" />
          <text x="290" y="282" fontFamily="system-ui,sans-serif" fontSize="12" fontWeight="700" fill={P.ink} opacity="0.7">DEN</text>
          <TextLine x="98" y="298" w={120} h={5} fill={P.divider} />
        </Card>

        {/* Arrow */}
        <text x="394" y="274" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="20" fill={P.terra} opacity="0.6">→</text>

        {/* New flight selection */}
        <Card x={410} y={218} w={290} h={100}>
          <rect x="410" y="218" width="290" height="100" rx="6" fill="rgba(184,68,43,0.04)" />
          <TextLine x="428" y="236" w={50} h={5} fill={P.divider} />
          <rect x="428" y="246" width="100" height="14" rx="3" fill={P.terraTint} />

          {/* Options */}
          {[['WN 1234 · 10:45A'],['WN 2109 · 1:15P']].map(([ label], i) => (
            <g key={label}>
              <rect x="428" y={268 + i * 24} width="256" height="18" rx="4"
                fill={i === 0 ? P.terraTint : P.surface}
                stroke={i === 0 ? P.terra : P.divider} strokeWidth="1" />
              <TextLine x="440" y={275 + i * 24} w={120} h={7}
                fill={i === 0 ? P.terra : P.divider} />
            </g>
          ))}
        </Card>

        {/* Fare diff callout */}
        <rect x="80" y="336" width="620" height="60" rx="6" fill={P.terraTint} />
        <rect x="80" y="336" width="4" height="60" rx="2 0 0 2" fill={P.terra} />
        <TextLine x="100" y="358" w={80} h={7} fill={P.terra} />
        <TextLine x="100" y="372" w={300} h={6} fill={P.divider} />
        <TextLine x="100" y="382" w={240} h={6} fill={P.divider} />
        <rect x="632" y="350" width="56" height="28" rx="5" fill={P.terra} />
        <TextLine x="646" y="362" w={28} h={7} fill="rgba(255,255,255,0.8)" />
      </BrowserFrame>
    </svg>
  );
}

/** Enhanced REACCOM — rebooking flow / notification UI */
function EnhancedReaccomHero() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <rect width="800" height="450" fill={P.base} />

      {/* Email notification pane — left */}
      <Card x={30} y={30} w={240} h={390}>
        {/* Email header */}
        <rect x="30" y="30" width="240" height="40" rx="6 6 0 0" fill={P.plum} />
        <TextLine x="46" y="47" w={80} h={6} fill="rgba(255,255,255,0.4)" />
        <TextLine x="46" y="57" w={120} h={7} fill="rgba(255,255,255,0.2)" />

        {/* Email items */}
        {[
          { read: false, urgent: true },
          { read: false, urgent: false },
          { read: true, urgent: false },
          { read: true, urgent: false },
          { read: true, urgent: false },
        ].map(({ read, urgent }, i) => (
          <g key={i}>
            <rect x="36" y={80 + i * 66} width="228" height="58" rx="4"
              fill={read ? 'transparent' : 'rgba(123,94,167,0.04)'}
              stroke={!read && urgent ? P.terra : P.divider} strokeWidth={!read && urgent ? 1.5 : 1} />
            {!read && <circle cx="50" cy={109 + i * 66} r="4" fill={urgent ? P.terra : P.plum} />}
            <TextLine x="62" y={92 + i * 66} w={150} h={7} fill={read ? P.divider : P.ink} />
            <TextLine x="62" y={104 + i * 66} w={120} h={6} fill={P.divider} />
            <TextLine x="62" y={116 + i * 66} w={160} h={5} fill={P.divider} />
            <TextLine x="62" y={126 + i * 66} w={100} h={5} fill={P.divider} />
            {urgent && !read && <Pill x="62" y={128 + i * 66} w={52} label="Action Req'd" accent />}
          </g>
        ))}
      </Card>

      {/* Browser — rebooking UI */}
      <g>
        <rect x="290" y="22" width="480" height="406" rx="8" fill={P.surface} />
        <rect x="290" y="22" width="480" height="32" rx="8" fill={P.divider} />
        <rect x="290" y="42" width="480" height="12" fill={P.divider} />
        <circle cx="308" cy="38" r="4" fill="#FF5F57" />
        <circle cx="320" cy="38" r="4" fill="#FEBC2E" />
        <circle cx="332" cy="38" r="4" fill="#28C840" />
        <rect x="380" y="28" width="240" height="16" rx="3" fill={P.surface} />
        <TextLine x="390" y="36" w={160} h={6} fill={P.muted} />

        {/* Alert banner */}
        <rect x="290" y="54" width="480" height="50" fill={P.terraTint} />
        <rect x="290" y="54" width="4" height="50" fill={P.terra} />
        <TextLine x="308" y="68" w={80} h={7} fill={P.terra} />
        <TextLine x="308" y="80" w={340} h={6} fill={P.divider} />
        <TextLine x="308" y="90" w={280} h={6} fill={P.divider} />

        {/* Original flight — cancelled */}
        <Card x={306} y={118} w={448} h={72}>
          <rect x="306" y="118" width="448" height="72" rx="6" fill="rgba(184,68,43,0.04)" />
          <TextLine x="322" y="134" w={60} h={5} fill={P.terra} />
          <text x="322" y="152" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="700" fill={P.ink} opacity="0.6">DAL  →  LAS</text>
          <TextLine x="322" y="166" w={120} h={5} fill={P.divider} />
          <rect x="622" y="128" width="64" height="20" rx="10" fill={P.terraTint} />
          <text x="654" y="141" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fill={P.terra}>CANCELLED</text>
          <line x1="306" y1="148" x2="754" y2="148" stroke={P.terra} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3,3" />
        </Card>

        {/* Rebooking options */}
        <TextLine x="310" y="212" w={80} h={6} fill={P.plum} />
        {[
          { time: '10:45A', arrive: '12:30P', stops: 'Nonstop', available: true },
          { time: '1:15P',  arrive: '3:10P',  stops: '1 Stop',  available: true },
          { time: '6:30P',  arrive: '8:20P',  stops: 'Nonstop', available: false },
        ].map(({ time, arrive, stops, available }, i) => (
          <g key={time}>
            <rect x="306" y={224 + i * 52} width="448" height="42" rx="5"
              fill={i === 0 ? P.plumTint : P.surface}
              stroke={i === 0 ? P.plum : P.divider} strokeWidth={i === 0 ? 1.5 : 1}
              opacity={available ? 1 : 0.5} />
            {i === 0 && <rect x="306" y="224" width="3" height="42" rx="2 0 0 2" fill={P.plum} />}
            <text x="322" y={249 + i * 52} fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700"
              fill={i === 0 ? P.plum : P.ink} opacity={available ? 1 : 0.4}>{time}</text>
            <TextLine x="370" y={243 + i * 52} w={50} h={5} fill={P.divider} />
            <TextLine x="370" y={253 + i * 52} w={80} h={6} fill={i === 0 ? P.plum : P.divider} />
            <text x="480" y={249 + i * 52} fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="700"
              fill={P.muted} opacity={available ? 0.7 : 0.3}>{arrive}</text>
            <Pill x="620" y={236 + i * 52} w={44} label={stops} accent={!available} />
            {i === 0 && (
              <rect x="690" y={234 + i * 52} width="56" height="26" rx="4" fill={P.plum} />
            )}
          </g>
        ))}

        {/* CTA */}
        <rect x="600" y="390" width="164" height="30" rx="5" fill={P.plum} />
        <TextLine x="628" y="403" w={108} h={9} fill="rgba(255,255,255,0.8)" />
      </g>

      <text x="400" y="436" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fill={P.muted} opacity="0.5" letterSpacing="0.1em">ENHANCED REACCOM · 2018–2019 · SR. UX DESIGNER</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROUTER — slug → hero illustration
══════════════════════════════════════════════════════════════════════════ */

export default function CaseStudyHero({ slug, title }: CaseStudyHeroProps) {
  const heroMap: Record<string, React.ReactNode> = {
    'heart-design-system':    <HeartDesignSystemHero />,
    'homepage-v2':            <HomepageV2Hero />,
    'my-account-redesign':    <MyAccountHero />,
    'native-app-homepage':    <NativeAppHero />,
    'vision-decommission':    <VisionDecommissionHero />,
    'ife-starling':           <IFEStarlinkHero />,
    'mobile-check-in':        <MobileCheckInHero />,
    'homepage-redesign':      <HomepageRedesignHero />,
    'change-cancel-experience': <ChangeCancelHero />,
    'enhanced-reaccom':       <EnhancedReaccomHero />,
  };

  const hero = heroMap[slug];

  if (!hero) {
    // Generic fallback — clean gradient placeholder
    return (
      <div
        aria-label={`${title} hero image`}
        style={{
          backgroundColor: 'var(--accent-tint-08)',
          borderRadius: '8px',
          aspectRatio: '1 / 0.56',
          marginBottom: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-muted)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-inter)',
        }}
      >
        {title}
      </div>
    );
  }

  return (
    <div
      aria-label={`${title} case study illustration`}
      style={{
        borderRadius: '8px',
        aspectRatio: '1 / 0.56',
        marginBottom: '4rem',
        overflow: 'hidden',
        lineHeight: 0,
      }}
    >
      {hero}
    </div>
  );
}
