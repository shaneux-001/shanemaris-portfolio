'use client';

import { useEffect } from 'react';
import { initKonamiCode } from '@/lib/konami';

/**
 * Invisible listener extracted out of app/page.tsx so the home page itself
 * can be a server component (needed for fs.existsSync image wiring, same
 * pattern as every other page) while keeping the Konami-code Easter egg.
 */
export default function KonamiListener() {
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      window.location.href = '/labs';
    });
    return cleanup;
  }, []);

  return null;
}
