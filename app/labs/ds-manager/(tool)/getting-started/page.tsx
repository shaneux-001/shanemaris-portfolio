import type { Metadata } from 'next';
import GettingStarted from './GettingStarted';

export const metadata: Metadata = { title: 'Getting started' };

export default function Page() {
  return <GettingStarted />;
}
