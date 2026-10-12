'use client';

import Link from 'next/link';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import { useStore } from '../../../_components/Store';
import { BASE } from '../../../_components/Shell';
import { CopyButton, downloadText } from '../../../_components/CodeBlock';
import { Button, EmptyState, PageHeader } from '../../../_components/ui';
import { formatDate } from '../../../_components/ui';
import { ReleaseNotes, releaseMarkdown } from '../Releases';

export default function ReleaseDetail({ version }: { version: string }) {
  const { db, item } = useStore();
  const r = db.releases.find((x) => x.version === version);
  if (!r) return <EmptyState title="No such release">{version} isn&apos;t in the release history.</EmptyState>;
  const idx = db.releases.indexOf(r);
  const prev = db.releases[idx + 1];
  const next = db.releases[idx - 1];
  const md = releaseMarkdown(r, db.changes, (s) => (s ? (item(s)?.name ?? s) : 'Tokens'));
  return (
    <>
      <PageHeader
        eyebrow={
          <Link href={`${BASE}/releases`} className="hover:text-ks-fg">
            ← Releases
          </Link>
        }
        title={`${SYSTEM.name} ${r.version}`}
        description={
          <>
            {formatDate(r.date, { month: 'long', day: 'numeric', year: 'numeric' })} · Sprint {r.sprintId}. {r.summary}
          </>
        }
        actions={
          <>
            <CopyButton text={md} label="Copy as Markdown" className="h-9 border border-ks-border-strong bg-ks-surface px-3" />
            <Button onClick={() => downloadText(`meridian-${r.version}.md`, md)}>Download</Button>
          </>
        }
      />
      <ReleaseNotes r={r} />
      <nav className="mt-8 flex justify-between border-t border-ks-border pt-4 text-[13px]">
        {prev ? (
          <Link href={`${BASE}/releases/${prev.version}`} className="text-ks-accent-text hover:underline">
            ← {prev.version}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`${BASE}/releases/${next.version}`} className="text-ks-accent-text hover:underline">
            {next.version} →
          </Link>
        )}
      </nav>
    </>
  );
}
