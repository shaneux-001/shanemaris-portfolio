'use client';

import Link from 'next/link';
import { labsProjects } from '@/lib/projects';
import PasswordGate from '@/components/PasswordGate';
import LabsHeader from '@/components/LabsHeader';
import Ghost from '@/components/press/Ghost';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function AnimatedParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 15;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1 + 0.5,
      opacity: (Math.random() * 0.5 + 0.4) * 0.9,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(123, 94, 167, 0.36)';

      particlesRef.current.forEach((particle, idx) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x));
        }
        if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y));
        }

        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 6.5, 0, Math.PI * 2);
        ctx.fill();
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        backgroundColor: 'transparent',
        mixBlendMode: 'multiply',
      }}
    />
  );
}


const visibleLabsProjects = labsProjects.filter(p => !p.hidden);

function LabsContent() {
  return (
    <>
      <LabsHeader />
      <main className="pr-page">
        <div className="pr-main pt-[clamp(36px,5vw,56px)]">
          <h1 className="pr-page-title m-0 mb-[14px] font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">
            <Ghost trigger="load">Labs</Ghost>
          </h1>
          <p className="pr-page-lede m-0 mb-9 leading-[1.65] text-pr-lede max-w-[52ch]">
            Experimental work and side projects.
          </p>

          {visibleLabsProjects.length > 0 ? (
            <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] mb-4">
              {visibleLabsProjects.map((project) => (
                <Link key={project.slug} href={`/labs/${project.slug}`} className="pr-card">
                  <div className="relative aspect-[4/3] mb-4 overflow-hidden flex items-end p-3 bg-[repeating-linear-gradient(45deg,var(--pr-surface)_0_8px,var(--pr-surface-2)_8px_16px)]">
                    <span className="font-plex-mono text-[11px] text-pr-muted relative">
                      {project.title} preview
                    </span>
                  </div>
                  <h3 className="font-archivo text-xl font-bold tracking-[-0.02em] text-pr-fg-strong m-0">
                    {project.title}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center text-center gap-6 min-h-[40vh] border-t border-pr-rule pt-16">
              <svg width="56" height="56" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40" aria-hidden="true">
                <path
                  d="M221.9 197.2L153 85V40h4a12 12 0 0 0 0-24H99a12 12 0 0 0 0 24h4v45L34.1 197.2A20 20 0 0 0 51.1 228H204.9a20 20 0 0 0 17-30.8ZM111 91.6V40h34v51.6l36.1 60.4H74.9Z"
                  className="fill-pr-muted"
                />
              </svg>
              <div>
                <p className="font-archivo text-2xl font-bold text-pr-fg-strong m-0 mb-2">
                  The lab is between experiments.
                </p>
                <p className="text-[15px] leading-[1.7] text-pr-lede m-0 max-w-[36ch]">
                  Nothing to see here — yet. Something is brewing. Check back when the smell gets interesting.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <AnimatedParticles />
    </>
  );
}

export default function LabsPage() {
  return <LabsContent />;
}
