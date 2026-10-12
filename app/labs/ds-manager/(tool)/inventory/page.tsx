import type { Metadata } from 'next';
import { Suspense } from 'react';
import Inventory from './Inventory';

export const metadata: Metadata = { title: 'Inventory' };

// Inventory reads its filters from the URL, so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <Inventory />
    </Suspense>
  );
}
