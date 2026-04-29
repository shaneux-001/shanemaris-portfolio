'use client';

import { useEffect } from 'react';
import { initKonamiCode } from '@/lib/konami';

export default function Home() {
  useEffect(() => {
    const cleanup = initKonamiCode(() => {
      window.location.href = '/labs';
    });
    return cleanup;
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 4rem" }}>
      <div style={{ maxWidth: "48rem" }}>
        <p style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "1.5rem", fontFamily: "var(--font-inter)" }}>Design Ops and Systems Leader</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "var(--color-ink)", lineHeight: 1.1, marginBottom: "1.5rem" }}>Shane Maris</h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "1.125rem", color: "var(--color-muted)", maxWidth: "36rem", lineHeight: 1.75, marginBottom: "2.5rem" }}>I design systems that scale, building the foundations product teams rely on at Southwest Airlines.</p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="/resume" style={{ backgroundColor: "var(--color-accent)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.5rem", borderRadius: "6px", textDecoration: "none" }}>View my resume</a>
          <a href="/about" style={{ color: "var(--color-accent)", fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, padding: "0.75rem 1.5rem", borderRadius: "6px", textDecoration: "none", border: "1.5px solid var(--color-accent)" }}>About me</a>
        </div>
      </div>
    </main>
  );
}
