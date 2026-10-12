import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProposalFlow from './ProposalFlow';

export const metadata: Metadata = { title: 'New request' };

// Reads query params (prefill / deep links), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <ProposalFlow />
    </Suspense>
  );
}
