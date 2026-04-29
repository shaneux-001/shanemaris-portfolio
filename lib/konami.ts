'use client';

/**
 * Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
 * Used to unlock hidden /labs section
 */

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function initKonamiCode(onUnlock: () => void) {
  if (typeof window === 'undefined') return;

  let konamiIndex = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight'
      ? e.key
      : e.key.toLowerCase();

    if (key === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        onUnlock();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }
}
