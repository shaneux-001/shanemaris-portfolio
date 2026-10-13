import type { Metadata } from 'next';
import Styleguide from './Styleguide';

export const metadata: Metadata = { title: 'Styleguide' };

export default function Page() {
  return <Styleguide />;
}
