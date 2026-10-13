import type { Metadata } from 'next';
import FigmaOverview from './FigmaOverview';

export const metadata: Metadata = { title: 'Figma ↔ code' };

export default function Page() {
  return <FigmaOverview />;
}
