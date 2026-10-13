import type { Metadata } from 'next';
import Owners from './Owners';

export const metadata: Metadata = { title: 'Owners' };

export default function Page() {
  return <Owners />;
}
