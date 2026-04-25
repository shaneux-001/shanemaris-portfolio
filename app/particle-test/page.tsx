'use client';

import { useEffect, useRef } from 'react';

export default function ParticleTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw a simple test pattern
    ctx.fillStyle = 'rgba(123, 94, 167, 0.5)';

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text overlay
    ctx.fillStyle = 'var(--color-ink)';
    ctx.font = '24px var(--font-playfair)';
    ctx.fillText('If you see dots and this text, canvas is working!', 50, 50);
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-base)' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: '4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem' }}>
          Canvas Test
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem' }}>
          Check if you see particles and text above this section.
        </p>
      </div>
    </main>
  );
}
