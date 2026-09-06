'use client';

import { useState } from 'react';
import { LinkedinLogo, ThreadsLogo, Envelope } from '@phosphor-icons/react';
import Ghost from '@/components/press/Ghost';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function validate(name: string, email: string, message: string) {
  const errors: { name?: boolean; email?: boolean; message?: boolean } = {};
  if (!name.trim()) errors.name = true;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) errors.email = true;
  if (!message.trim()) errors.message = true;
  return errors;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot — real users never see or fill this
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const errors = touched ? validate(name, email, message) : {};
  const sending = status === 'sending';
  const sent = status === 'sent';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const e2 = validate(name, email, message);
    setTouched(true);
    if (Object.keys(e2).length) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const borderClass = (hasError?: boolean) => (hasError ? 'border-pr-magenta' : 'border-pr-muted');
  const submitLabel = sending ? 'SENDING…' : sent ? 'SEND AGAIN' : 'SEND MESSAGE';

  return (
    <main className="pr-page">
    <div className="pr-main pt-[clamp(36px,5vw,56px)]">
      <div className="relative pb-2">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-6 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-r border-pr-grid-line" />
          ))}
          <div />
        </div>
        {/* Full-bleed wrapper — see app/page.tsx for why overflow-hidden lives
            on .pr-page now, not here (an ancestor's overflow:hidden clips a
            w-screen breakout regardless of how far it tries to extend past
            it). Static (no motion), same position/size as Home's original. */}
        <div aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none">
          <div
            className="absolute left-[-70px] top-[10px] w-[470px] h-[210px] blur-[30px] bg-[radial-gradient(ellipse_at_42%_50%,var(--pr-glow-a),transparent_66%)]"
          />
          <div
            className="absolute left-[150px] top-[90px] w-[430px] h-[195px] blur-[30px] bg-[radial-gradient(ellipse_at_55%_50%,var(--pr-glow-b),transparent_66%)]"
          />
        </div>

        <h1 className="relative pr-page-title m-0 mb-4 font-archivo font-bold leading-none tracking-[-0.03em] text-pr-fg-strong">
          <Ghost trigger="load">Get in touch</Ghost>
        </h1>
        <p className="relative pr-page-lede m-0 mb-[34px] leading-[1.65] text-pr-lede max-w-[48ch]">
          Have a project, a question, or just want to talk shop about design systems? I&apos;d love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="max-w-[520px] flex flex-col gap-5">
        {/* Honeypot — visually hidden, skipped by real users, off the tab order */}
        <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
          <label htmlFor="contact-website">Leave this field blank</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="contact-name" className="font-plex-mono text-[11px] tracking-[0.08em] text-pr-muted">NAME</label>
          <input
            type="text" id="contact-name" name="name" value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-err' : undefined}
            className={`pr-input text-base px-3.5 py-3 bg-pr-surface border ${borderClass(errors.name)} text-pr-fg-strong`}
          />
          {errors.name && <div id="contact-name-err" className="font-plex-mono text-[11px] text-pr-magenta">Required.</div>}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="contact-email" className="font-plex-mono text-[11px] tracking-[0.08em] text-pr-muted">EMAIL</label>
          <input
            type="email" id="contact-email" name="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-err' : undefined}
            className={`pr-input text-base px-3.5 py-3 bg-pr-surface border ${borderClass(errors.email)} text-pr-fg-strong`}
          />
          {errors.email && <div id="contact-email-err" className="font-plex-mono text-[11px] text-pr-magenta">Needs a valid email address.</div>}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="contact-message" className="font-plex-mono text-[11px] tracking-[0.08em] text-pr-muted">MESSAGE</label>
          <textarea
            rows={4} id="contact-message" name="message" value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-err' : undefined}
            className={`pr-input font-archivo text-base px-3.5 py-3 bg-pr-surface border ${borderClass(errors.message)} text-pr-fg-strong resize-y`}
          />
          {errors.message && <div id="contact-message-err" className="font-plex-mono text-[11px] text-pr-magenta">Required.</div>}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button type="submit" disabled={sending} className="pr-cta pr-hoverable">
            <Ghost>{submitLabel}</Ghost>
          </button>
          <div role="status" aria-live="polite" className="flex items-center gap-2 font-plex-mono text-xs text-pr-accent-text">
            {sending && <span>Sending your message…</span>}
            {sent && (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pr-accent-text [animation:pr-tick_240ms_cubic-bezier(0.2,0.85,0.25,1)_both]" />
                <span className="inline-block [animation:pr-wipe_380ms_cubic-bezier(0.3,0.9,0.2,1)_120ms_both]">SENT — I&apos;ll reply within a day.</span>
              </span>
            )}
            {status === 'error' && <span className="text-pr-magenta">Something went wrong — email me directly at contact@shanemaris.com</span>}
          </div>
        </div>
      </form>

      <div className="mt-11 border-t border-pr-rule pt-[22px] flex gap-7 flex-wrap">
        <a href="https://linkedin.com/in/shanemaris" target="_blank" rel="noopener noreferrer" className="pr-text-link inline-flex items-center gap-1.5">
          <LinkedinLogo size={14} /> LinkedIn
        </a>
        <a href="https://www.threads.com/@_shaneux_" target="_blank" rel="noopener noreferrer" className="pr-text-link inline-flex items-center gap-1.5">
          <ThreadsLogo size={14} /> Threads
        </a>
        <a href="mailto:contact@shanemaris.com" className="pr-text-link inline-flex items-center gap-1.5">
          <Envelope size={14} /> contact@shanemaris.com
        </a>
      </div>
    </div>
    </main>
  );
}
