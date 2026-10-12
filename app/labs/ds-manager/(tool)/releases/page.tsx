import type { Metadata } from 'next';
import Releases from './Releases';

export const metadata: Metadata = { title: 'Releases' };

export default function Page() {
  return <Releases />;
}
