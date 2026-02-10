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
  es: { book: 'El libro de arena', about: 'Acerca de' },
  ja: { book: '砂の本', about: 'について' },
  pt: { book: 'O Livro de Areia', about: 'Sobre' },
  fr: { book: 'Le Livre de sable', about: 'À propos' },
  de: { book: 'Das Buch vom Sand', about: 'Über' },
  hi: { book: 'रेत की किताब', about: 'के बारे में' },
  la: { book: 'Liber arenæ', about: 'De' },
  el: { book: 'Βιβλίο της Άμμου', about: 'Σχετικά' },
} as const

const ARIA_LABELS: Record<Lang, string> = {
  cn: '主导航',
  en: 'Main navigation',
  es: 'Navegación principal',
  ja: 'メインナビゲーション',
  pt: 'Navegação principal',
  fr: 'Navigation principale',
  de: 'Hauptnavigation',
  hi: 'मुख्य नेविगेशन',
  la: 'Navigatio principalis',
  el: 'Κύρια πλοήγηση',
}

export function Nav({ currentView, onNavigate, lang }: NavProps) {
  const t = LABELS[lang]
  const isBook = currentView === 'cover' || currentView === 'reader'

  return (
    <nav className="site-nav" aria-label={ARIA_LABELS[lang]}>
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
