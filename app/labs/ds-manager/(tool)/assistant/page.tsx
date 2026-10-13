import type { Metadata } from 'next';
import Assistant from './Assistant';

export const metadata: Metadata = { title: 'Ask the system' };

export default function Page() {
  return <Assistant />;
}
