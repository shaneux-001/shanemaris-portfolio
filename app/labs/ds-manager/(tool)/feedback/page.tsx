import type { Metadata } from 'next';
import { Suspense } from 'react';
import FeedbackInbox from './FeedbackInbox';

export const metadata: Metadata = { title: 'Feedback' };

// Reads query params (item filter / open drawer), so it renders client-side under Suspense.
export default function Page() {
  return (
    <Suspense>
      <FeedbackInbox />
    </Suspense>
  );
}
