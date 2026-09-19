'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LabsHeader from '@/components/LabsHeader';

export default function RecipeBoxLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/labs/recipe-box/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError('Incorrect password');
        return;
      }
      router.push('/labs/recipe-box');
      router.refresh();
    } catch {
      setError('Something went wrong — try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LabsHeader />
      <main className="pr-page min-h-[70vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-6 flex flex-col gap-4 border border-pr-rule bg-pr-surface p-8 rounded-lg"
        >
          <h1 className="font-archivo text-2xl font-bold text-pr-fg-strong m-0">The Recipe Box</h1>
          <p className="text-sm text-pr-lede m-0 leading-relaxed">
            Password protected — this page runs a live AI meal-planning endpoint under my account.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            disabled={isSubmitting}
            className="font-plex-mono text-sm px-3 py-2 rounded border border-pr-rule bg-pr-bg text-pr-fg-strong outline-none focus-visible:border-pr-fg-strong"
          />
          {error && <p className="text-sm text-red-500 m-0">{error}</p>}
          <button type="submit" disabled={isSubmitting || !password} className="pr-btn-accent-outline">
            {isSubmitting ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </main>
    </>
  );
}
