import type { Metadata } from 'next';
import { Suspense } from 'react';
import Changelog from './Changelog';

export const metadata: Metadata = { title: 'Changelog' };

// Reads query params (filters / deep links), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <Changelog />
    </Suspense>
  );
}
