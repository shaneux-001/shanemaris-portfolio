import type { Metadata } from 'next';
import Adoption from './Adoption';

export const metadata: Metadata = { title: 'Adoption' };

export default function Page() {
  return <Adoption />;
}
