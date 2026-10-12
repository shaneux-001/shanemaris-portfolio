import type { Metadata } from 'next';
import Link from 'next/link';
import LabsHeader from '@/components/LabsHeader';
import PressCta from '@/components/press/PressCta';
import { TOOL, SYSTEM } from '@/lib/labs/dsManager/brand';

export const metadata: Metadata = {
  title: `${TOOL.name} — design system management`,
  description: 'A prototype design system management tool: inventory, computed health, living docs, tokens, a request flow that pushes back, and plain-language AI guidance.',
};

const APP = '/labs/ds-manager';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="m-0 mb-[22px] border-t border-pr-rule pt-[22px] font-plex-mono text-[11px] font-normal tracking-[0.1em] text-pr-muted">{children}</h2>;
}

// Draft copy, written to be edited — Shane's voice pass still to come.
const VIEWS: { name: string; href: string; line: string }[] = [
  { name: 'Dashboard', href: '/dashboard', line: 'Completeness, platform parity, stable ratio, drift, unowned work and risks, all computed from the inventory rather than typed into a slide.' },
  { name: 'Inventory', href: '/inventory', line: 'System components, product components and patterns in one table, with version, platform coverage, lifecycle, owner and a link to the docs.' },
  { name: 'Adoption', href: '/adoption', line: 'Instances in code over time, what’s growing, and how far each migration off a deprecated component has got, product by product.' },
  { name: 'Styleguide', href: '/components', line: 'Foundations and living docs with a playground that renders the real component and writes the React, SwiftUI, Compose and Figma usage for whatever you configure. Contrast is checked live.' },
  { name: 'Tokens', href: '/tokens', line: 'Three tiers, light and dark, with blast radius before you edit. Exports to Figma Variables, DTCG JSON, CSS, Swift, Kotlin, and an AGENTS.md an AI coding tool can build from.' },
  { name: 'Requests', href: '/proposals/new', line: 'An intake flow that checks for duplicates as you type and scores the request, so the DS team only triages clean ones.' },
  { name: 'Sandbox', href: '/sandbox', line: 'Compose with real components; it flags anything you add that already exists and turns genuine gaps into a pre-filled request.' },
  { name: 'Ask the system', href: '/assistant', line: '“Do we have X?” answered in plain language, and it can only recommend what actually exists.' },
  { name: 'Releases & migrations', href: '/releases', line: 'Release notes per version with package versions per platform, and a migration guide (steps, before/after code, codemod, progress by product) for every breaking change.' },
  { name: 'Feedback & roles', href: '/feedback', line: '“Was this page helpful?” on every component, an inbox where the DS team replies in public, watch lists with notifications, and viewer / contributor / DS team roles enforced in the data layer.' },
  { name: 'Getting started', href: '/getting-started', line: 'Setup for designers and engineers, how contributions work, and the versioning and deprecation policy.' },
  { name: 'Roadmap, changelog, owners', href: '/roadmap', line: 'What ships each sprint by platform, what the team is working on next, and who is accountable for what.' },
];

export default function Page() {
  return (
    <>
      <LabsHeader />
      <main className="pr-page">
        <div className="pr-main pt-[clamp(36px,5vw,56px)]">
          <p className="m-0 mb-3 font-plex-mono text-[11px] tracking-[0.1em] text-pr-muted">LABS · PROTOTYPE</p>
          <h1 className="pr-page-title m-0 mb-[14px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">{TOOL.name}</h1>
          <p className="pr-page-lede m-0 mb-8 max-w-[60ch] leading-[1.65] text-pr-lede">
            A design system lives in five places at once: Figma, Storybook, a docs site, a spreadsheet, and someone&apos;s head. {TOOL.name} is my take on a single source of truth, one place that knows what exists, how healthy it is, who owns it, and what&apos;s coming, and that can generate the docs, code and tokens from that one record.
          </p>
          <div className="mb-14 flex flex-wrap gap-3">
            <PressCta href={`${APP}/dashboard`}>OPEN THE PROTOTYPE</PressCta>
            <PressCta href={`${APP}/proposals/new`} variant="secondary">
              TRY THE REQUEST FLOW
            </PressCta>
          </div>

          <SectionLabel>THE PROBLEM</SectionLabel>
          <div className="mb-12 max-w-[68ch] text-[16px] leading-[1.7] text-pr-fg">
            <p className="m-0 mb-4">
              Most design system tools are good at one slice: documentation, or tokens, or component previews. The work that actually eats a DS team&apos;s week sits between them. <strong>Is this component healthy on every platform? Who owns it? Didn&apos;t we already build that?</strong>
            </p>
            <p className="m-0">
              That last question is the expensive one. Requests for things that already exist cost a triage cycle, and a duplicate that slips through costs years of maintenance. So the intake flow here is built to push back early, while someone is still describing the problem, instead of a sprint later.
            </p>
          </div>

          <SectionLabel>WHAT&apos;S IN IT</SectionLabel>
          <ul className="m-0 mb-12 grid max-w-[900px] list-none grid-cols-1 gap-x-10 gap-y-6 p-0 md:grid-cols-2">
            {VIEWS.map((v) => (
              <li key={v.name}>
                <Link href={`${APP}${v.href}`} className="pr-text-link text-[17px] font-semibold text-pr-fg-strong">
                  {v.name}
                </Link>
                <p className="m-0 mt-1.5 text-[14.5px] leading-[1.6] text-pr-lede">{v.line}</p>
              </li>
            ))}
          </ul>

          <SectionLabel>REAL VS. MOCKED</SectionLabel>
          <div className="mb-12 grid max-w-[900px] grid-cols-1 gap-8 text-[15px] leading-[1.65] md:grid-cols-2">
            <div>
              <h3 className="m-0 mb-2 text-[15px] font-semibold text-pr-fg-strong">Real</h3>
              <ul className="m-0 list-disc pl-5 text-pr-lede">
                <li>Every health metric is computed from the inventory.</li>
                <li>Component demos render from the token store, so a token edit re-skins them live.</li>
                <li>Every export is generated, including the agent-ready spec.</li>
                <li>Duplicate detection and the instant assistant run on the same retrieval engine.</li>
                <li>All reads and writes go through one async repository, the seam where a backend plugs in. It also enforces role permissions.</li>
              </ul>
            </div>
            <div>
              <h3 className="m-0 mb-2 text-[15px] font-semibold text-pr-fg-strong">Mocked</h3>
              <ul className="m-0 list-disc pl-5 text-pr-lede">
                <li>
                  {SYSTEM.name} and everyone on its team are fictional. The data is deliberately messy (drift, orphans, stale docs) so the dashboard has something to find.
                </li>
                <li>Edits save to your browser only. &ldquo;Reset demo&rdquo; puts everything back.</li>
                <li>The role switcher is a demo control; in production your role would come from sign-in.</li>
                <li>&ldquo;Push to Figma&rdquo; explains what it would do; the JSON it would send is downloadable.</li>
                <li>Live AI answers are limited to signed-in sessions to keep API costs sane. The instant tier is open to everyone.</li>
              </ul>
            </div>
          </div>

          <p className="m-0 mb-16 max-w-[60ch] text-[14px] leading-[1.6] text-pr-muted">
            It started as an idea I prototyped in Figma Make; this version is rebuilt from scratch in Next.js. It&apos;s a prototype of the thinking, not a product.
          </p>
        </div>
      </main>
    </>
  );
}
