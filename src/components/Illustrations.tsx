/**
 * Small dictionary-style illustrations; each appears once per 2000 pages.
 * "Never once was an illustration repeated."
 */

import React from 'react';

const illustrations: Record<number, React.ReactNode> = {
  0: (
    <svg viewBox="0 0 40 40" className="illu illu-anchor" aria-hidden>
      <path d="M20 4v8m0 24v-8M16 12h8M20 12c-4 0-8 4-8 10s4 10 8 10 8-4 8-10-4-10-8-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="22" r="2" fill="currentColor"/>
    </svg>
  ),
  1: (
    <svg viewBox="0 0 40 40" className="illu illu-mask" aria-hidden>
      <ellipse cx="20" cy="22" rx="12" ry="14" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 18 Q20 14 32 18" fill="none" stroke="currentColor" strokeWidth="1"/>
      <circle cx="14" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="26" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  ),
  2: (
    <svg viewBox="0 0 40 40" className="illu illu-book" aria-hidden>
      <path d="M12 6v28h16V6H12z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M20 6v28" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
  ),
  3: (
    <svg viewBox="0 0 40 40" className="illu illu-sand" aria-hidden>
      <circle cx="10" cy="12" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="28" cy="18" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="18" cy="28" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="10" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  4: (
    <svg viewBox="0 0 40 40" className="illu illu-key" aria-hidden>
      <circle cx="22" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="20" y="18" width="4" height="14" rx="1" fill="currentColor"/>
      <rect x="18" y="26" width="8" height="3" rx="0.5" fill="currentColor"/>
    </svg>
  ),
  5: (
    <svg viewBox="0 0 40 40" className="illu illu-compass" aria-hidden>
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M20 10v20M14 20h12" stroke="currentColor" strokeWidth="0.8"/>
      <path d="M20 12l-3 8h6z" fill="currentColor"/>
    </svg>
  ),
  6: (
    <svg viewBox="0 0 40 40" className="illu illu-lamp" aria-hidden>
      <path d="M20 8l-6 12h12L20 8z" fill="none" stroke="currentColor" strokeWidth="1"/>
      <path d="M14 20v8M26 20v8M14 28h12" stroke="currentColor" strokeWidth="0.8"/>
      <rect x="18" y="28" width="4" height="4" fill="currentColor"/>
    </svg>
  ),
  7: (
    <svg viewBox="0 0 40 40" className="illu illu-leaf" aria-hidden>
      <path d="M20 6c-8 4-14 14-14 22 0 4 4 6 14 6s14-2 14-6c0-8-6-18-14-22z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
};

export function Illustration({ id }: { id: number }) {
  const node = illustrations[id % 8];
  if (!node) return null;
  return <figure className="page-illustration">{node}</figure>;
}
