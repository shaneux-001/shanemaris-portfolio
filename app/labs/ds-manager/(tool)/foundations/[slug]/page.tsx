import type { Metadata } from 'next';
import { FOUNDATIONS } from '@/lib/labs/dsManager/foundations';
import Foundation from './Foundation';

export function generateStaticParams() {
  return FOUNDATIONS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: FOUNDATIONS.find((f) => f.slug === slug)?.name ?? 'Foundation' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Foundation slug={slug} />;
}
