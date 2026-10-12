import type { Metadata } from 'next';
import { Suspense } from 'react';
import { items } from '@/lib/labs/dsManager/seed/items';
import ComponentDoc from './ComponentDoc';

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: items.find((i) => i.slug === slug)?.name ?? 'Component' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <Suspense>
      <ComponentDoc key={slug} slug={slug} />
    </Suspense>
  );
}
