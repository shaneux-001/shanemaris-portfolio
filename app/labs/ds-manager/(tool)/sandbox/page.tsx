import type { Metadata } from 'next';
import { Suspense } from 'react';
import Sandbox from './Sandbox';

export const metadata: Metadata = { title: 'Sandbox' };

// Reads query params (prefill / deep links), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <Sandbox />
    </Suspense>
  );
}
