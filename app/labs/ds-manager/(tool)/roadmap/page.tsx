import type { Metadata } from 'next';
import { Suspense } from 'react';
import Roadmap from './Roadmap';

export const metadata: Metadata = { title: 'Roadmap' };

// Reads query params (filters / deep links), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <Roadmap />
    </Suspense>
  );
}
