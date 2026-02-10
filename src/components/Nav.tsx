import React from 'react'
import type { Lang } from '../lib/book'

import './Nav.css'

export type View = 'cover' | 'reader' | 'about'

interface NavProps {
  currentView: View
  onNavigate: (view: View) => void
  lang: Lang
}

const LABELS = {
  cn: { book: '沙之书', about: '关于' },
  en: { book: 'The Book of Sand', about: 'About' },
} as const

export function Nav({ currentView, onNavigate, lang }: NavProps) {
  const t = LABELS[lang]
  const isBook = currentView === 'cover' || currentView === 'reader'

  return (
    <nav className="site-nav" aria-label={lang === 'cn' ? '主导航' : 'Main navigation'}>
      <div className="site-nav-inner">
        <button
          type="button"
          className={`site-nav-link site-nav-book ${isBook ? 'is-active' : ''}`}
          onClick={() => onNavigate('cover')}
          aria-current={isBook ? 'page' : undefined}
        >
          <span className="site-nav-label">{t.book}</span>
        </button>
        <span className="site-nav-sep" aria-hidden="true">
          ·
        </span>
        <button
          type="button"
          className={`site-nav-link site-nav-about ${currentView === 'about' ? 'is-active' : ''}`}
          onClick={() => onNavigate('about')}
          aria-current={currentView === 'about' ? 'page' : undefined}
        >
          <span className="site-nav-label">{t.about}</span>
        </button>
      </div>
    </nav>
  )
}
