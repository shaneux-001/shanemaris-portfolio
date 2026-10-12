import type { Metadata } from 'next';
import { Suspense } from 'react';
import Proposals from './Proposals';

export const metadata: Metadata = { title: 'Proposals' };

// Reads query params (prefill / deep links), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <Proposals />
    </Suspense>
  );
}
