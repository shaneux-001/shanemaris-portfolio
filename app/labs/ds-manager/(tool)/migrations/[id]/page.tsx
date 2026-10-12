import type { Metadata } from 'next';
import { migrations } from '@/lib/labs/dsManager/seed/releases';
import MigrationDetail from './MigrationDetail';

export function generateStaticParams() {
  return migrations.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: migrations.find((m) => m.id === id)?.title ?? 'Migration' };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MigrationDetail id={id} />;
}
