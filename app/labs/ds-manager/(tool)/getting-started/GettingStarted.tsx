'use client';

import Link from 'next/link';
import { ChatCircleDots, Code, FigmaLogo, GitPullRequest, Sparkle, SquaresFour } from '@phosphor-icons/react';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../_components/Store';
import { BASE } from '../../_components/Shell';
import CodeBlock from '../../_components/CodeBlock';
import { LifecyclePill, PageHeader, Panel, PersonAvatar } from '../../_components/ui';

const INSTALL = [
  { id: 'web', label: 'React', code: `npm install @meridian/react @meridian/tokens` },
  { id: 'ios', label: 'SwiftUI', code: `// Package.swift\n.package(url: "https://git.larkspur.dev/meridian/meridian-ios", from: "3.4.0")\n\n// Target dependency\n.product(name: "MeridianUI", package: "meridian-ios")` },
  { id: 'android', label: 'Compose', code: `// build.gradle.kts\ndependencies {\n    implementation("dev.larkspur.meridian:meridian-compose:3.3.1")\n}` },
];

const SETUP = [
  { id: 'web', label: 'React', code: `import { MeridianProvider, Button } from '@meridian/react';\nimport '@meridian/tokens/css';\n\nexport function App() {\n  return (\n    <MeridianProvider theme="system">\n      <Button variant="primary">Book now</Button>\n    </MeridianProvider>\n  );\n}` },
  { id: 'ios', label: 'SwiftUI', code: `import MeridianUI\n\n@main\nstruct BookingApp: App {\n    var body: some Scene {\n        WindowGroup {\n            ContentView()\n                .meridianTheme(.system)\n        }\n    }\n}` },
  { id: 'android', label: 'Compose', code: `import meridian.compose.MeridianTheme\nimport meridian.compose.MButton\n\nsetContent {\n    MeridianTheme {\n        MButton(text = "Book now", onClick = ::book)\n    }\n}` },
];

const FLOW = [
  { icon: Sparkle, title: 'Ask first', body: 'Check whether it already exists. Most requests end here.', href: '/assistant', link: 'Ask the system' },
  { icon: SquaresFour, title: 'Explore', body: 'Compose it from real components. The sandbox flags anything that already exists.', href: '/sandbox', link: 'Open the sandbox' },
  { icon: GitPullRequest, title: 'Request', body: 'Describe the problem with real use cases. The form checks for duplicates as you write.', href: '/proposals/new', link: 'Start a request' },
  { icon: ChatCircleDots, title: 'Triage', body: 'Core Systems reviews new requests every sprint, usually within five working days.', href: '/proposals', link: 'See the queue' },
  { icon: Code, title: 'Build together', body: 'Accepted work gets an owner and a sprint. Contributors can build it with a DS pairing partner.', href: '/roadmap', link: 'View the roadmap' },
];

const LIFECYCLE: { l: 'experimental' | 'beta' | 'stable' | 'deprecated'; meaning: string; promise: string }[] = [
  { l: 'experimental', meaning: 'Being tried in one product.', promise: 'Can change or disappear in any release. Talk to the owner first.' },
  { l: 'beta', meaning: 'Ready for wider use, still settling.', promise: 'Minor API changes possible; always called out in release notes.' },
  { l: 'stable', meaning: 'Done, documented, accessible, on every platform it targets.', promise: 'Breaking changes only in a major version, with a migration guide.' },
  { l: 'deprecated', meaning: 'Being replaced.', promise: 'Supported for at least two PIs (about six months) before removal, with a codemod where possible.' },
];

export default function GettingStarted() {
  const { db } = useStore();
  const core = db.people.filter((p) => p.teamId === 'core' && p.id !== 'p-you');
  return (
    <>
      <PageHeader
        title={`Build with ${SYSTEM.name}`}
        description={`Everything you need to start designing or building with ${SYSTEM.name}, and how to get something new into the system when it's missing.`}
      />

      <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        {[
          { href: '#designers', title: 'I design', body: 'Enable the libraries, use the styles, ask before you draw.' },
          { href: '#engineers', title: 'I build', body: 'Install the package for your platform and wrap your app in the theme.' },
          { href: '#contributing', title: 'I need something new', body: 'How requests become components, and how long it takes.' },
        ].map((c) => (
          <a key={c.href} href={c.href} className="rounded-lg border border-ks-border bg-ks-surface p-4 hover:border-ks-border-strong">
            <div className="font-medium">{c.title}</div>
            <div className="mt-1 text-[13px] text-ks-fg-muted">{c.body}</div>
          </a>
        ))}
      </div>

      <section id="designers" className="mb-10 scroll-mt-20">
        <h2 className="m-0 mb-3 flex items-center gap-2 text-[17px] font-semibold">
          <FigmaLogo size={18} /> For designers
        </h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Panel title="1. Enable the libraries">
            <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13.5px] text-ks-fg-muted">
              <li>
                <strong className="text-ks-fg">{SYSTEM.name} / Core</strong>: components, variables (Light and Dark modes), text styles.
              </li>
              <li>
                <strong className="text-ks-fg">{SYSTEM.name} / Icons</strong>: the icon set. Swap icons through the instance, don&apos;t detach.
              </li>
              <li>Accept library updates within a sprint. The changelog says what changed in each one.</li>
            </ul>
          </Panel>
          <Panel title="2. Design on the system">
            <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[13.5px] text-ks-fg-muted">
              <li>
                Use variables for color and spacing, never raw values. Start with{' '}
                <Link href={`${BASE}/foundations/color`} className="text-ks-accent-text hover:underline">
                  Foundations
                </Link>
                .
              </li>
              <li>
                Before you draw something new, search or{' '}
                <Link href={`${BASE}/assistant`} className="text-ks-accent-text hover:underline">
                  ask the system
                </Link>
                .
              </li>
              <li>Detaching an instance is a signal, not a sin. If you do it twice for the same reason, request the change.</li>
            </ul>
          </Panel>
        </div>
      </section>

      <section id="engineers" className="mb-10 scroll-mt-20">
        <h2 className="m-0 mb-3 flex items-center gap-2 text-[17px] font-semibold">
          <Code size={18} /> For engineers
        </h2>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <div>
            <div className="mb-1.5 text-[13px] font-medium">1. Install</div>
            <CodeBlock tabs={INSTALL} />
          </div>
          <div>
            <div className="mb-1.5 text-[13px] font-medium">2. Wrap your app in the theme</div>
            <CodeBlock tabs={SETUP} />
          </div>
        </div>
        <p className="m-0 mt-3 text-[13px] text-ks-fg-muted">
          Then use components from the{' '}
          <Link href={`${BASE}/components`} className="text-ks-accent-text hover:underline">
            styleguide
          </Link>
          ; every page generates usage code for your platform. Need raw tokens (for a chart library, say)? Grab them from{' '}
          <Link href={`${BASE}/tokens`} className="text-ks-accent-text hover:underline">
            Tokens → Export
          </Link>
          . Building with an AI coding tool? Give it the generated AGENTS.md from the same place.
        </p>
      </section>

      <section id="contributing" className="mb-10 scroll-mt-20">
        <h2 className="m-0 mb-1 text-[17px] font-semibold">How something new gets into {SYSTEM.name}</h2>
        <p className="m-0 mb-4 max-w-[75ch] text-[13.5px] text-ks-fg-muted">
          The system grows from real product needs, not a wish list. Anyone can contribute; the DS team makes sure what goes in is reusable, accessible, and maintained.
        </p>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-5">
          {FLOW.map((f, i) => (
            <li key={f.title} className="flex flex-col gap-2 rounded-lg border border-ks-border bg-ks-surface p-4">
              <span className="flex items-center gap-2 text-[12px] text-ks-fg-subtle">
                <span className="ks-tabular flex h-5 w-5 items-center justify-center rounded-full bg-ks-accent-soft text-[11px] font-semibold text-ks-accent-text">{i + 1}</span>
                <f.icon size={15} />
              </span>
              <span className="font-medium">{f.title}</span>
              <span className="flex-1 text-[12.5px] text-ks-fg-muted">{f.body}</span>
              <Link href={`${BASE}${f.href}`} className="text-[12.5px] text-ks-accent-text hover:underline">
                {f.link} →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="m-0 mb-1 text-[17px] font-semibold">Versioning & lifecycle</h2>
        <p className="m-0 mb-4 max-w-[75ch] text-[13.5px] text-ks-fg-muted">
          Components version independently with semver. Every sprint ships a system release that bundles what changed, with per-platform package versions and release notes. Breaking changes always come with a{' '}
          <Link href={`${BASE}/releases`} className="text-ks-accent-text hover:underline">
            migration guide
          </Link>
          .
        </p>
        <div className="overflow-hidden rounded-lg border border-ks-border bg-ks-surface">
          {LIFECYCLE.map((x) => (
            <div key={x.l} className="grid grid-cols-1 gap-2 border-b border-ks-border px-4 py-3 last:border-0 md:grid-cols-[140px_1fr_1.4fr]">
              <span>
                <LifecyclePill lifecycle={x.l} />
              </span>
              <span className="text-[13px]">{x.meaning}</span>
              <span className="text-[13px] text-ks-fg-muted">{x.promise}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="m-0 mb-3 text-[17px] font-semibold">Getting help</h2>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.4fr]">
          <Panel title="Where to ask">
            <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[13.5px]">
              <li>
                <strong>#meridian-help</strong> <span className="text-ks-fg-muted">— questions, answered within a working day</span>
              </li>
              <li>
                <strong>Office hours</strong> <span className="text-ks-fg-muted">— Thursdays 2–3pm, bring a file or a PR</span>
              </li>
              <li>
                <strong>Bugs</strong> <span className="text-ks-fg-muted">— file against the component; the owner is on its docs page</span>
              </li>
            </ul>
          </Panel>
          <Panel title="Core Systems team">
            <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
              {core.map((p) => (
                <li key={p.id} className="flex items-center gap-2.5">
                  <PersonAvatar person={p} size={32} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium">{p.name}</span>
                    <span className="block truncate text-[12px] text-ks-fg-subtle">{p.title}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href={`${BASE}/owners`} className="mt-3 inline-block text-[12.5px] text-ks-accent-text hover:underline">
              All owners →
            </Link>
          </Panel>
        </div>
      </section>
    </>
  );
}
