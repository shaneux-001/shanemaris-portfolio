import type { Metadata } from 'next';
import { releases } from '@/lib/labs/dsManager/seed/releases';
import { SYSTEM } from '@/lib/labs/dsManager/brand';
import ReleaseDetail from './ReleaseDetail';

export function generateStaticParams() {
  return releases.map((r) => ({ version: r.version }));
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version } = await params;
  return { title: `${SYSTEM.name} ${version}` };
}

export default async function Page({ params }: { params: Promise<{ version: string }> }) {
  const { version } = await params;
  return <ReleaseDetail version={version} />;
}
