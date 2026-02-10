import { useState, useEffect, useRef } from 'react'
import type { Lang } from '../lib/book'
import { VARIATIONS, type VariationId } from './Variations'

import './Nav.css'

export type View = 'cover' | 'reader' | 'about' | 'dazibao' | 'television' | 'xiaohongshu' | 'douyin' | 'consumerism' | 'ismism'

interface NavProps {
  currentView: View
  onNavigate: (view: View) => void
  lang: Lang
}

const LABELS = {
  cn: { book: '沙之书', about: '关于', more: '不仅如此' },
  en: { book: 'The Book of Sand', about: 'About', more: 'More Than That' },
  es: { book: 'El libro de arena', about: 'Acerca de', more: 'Más que eso' },
  ja: { book: '砂の本', about: 'について', more: 'それだけではない' },
  pt: { book: 'O Livro de Areia', about: 'Sobre', more: 'Mais que isso' },
  fr: { book: 'Le Livre de sable', about: 'À propos', more: 'Plus que ça' },
  de: { book: 'Das Buch vom Sand', about: 'Über', more: 'Mehr als das' },
  hi: { book: 'रेत की किताब', about: 'के बारे में', more: 'इससे अधिक' },
  la: { book: 'Liber arenæ', about: 'De', more: 'Plus quam id' },
  el: { book: 'Βιβλίο της Άμμου', about: 'Σχετικά', more: 'Περισσότερα από αυτό' },
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
  const isAbout = currentView === 'about'
  const isVariation = ['dazibao', 'television', 'xiaohongshu', 'douyin', 'consumerism', 'ismism'].includes(currentView)
  const [showVariations, setShowVariations] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Update nav height CSS variable when component mounts or updates
  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight
        const heightWithMargin = height + 20 // Add 20px extra margin for safety
        const heightPx = `${heightWithMargin}px`
        document.documentElement.style.setProperty('--nav-height', heightPx)
      }
    }
    
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      updateNavHeight()
      // Also update after a short delay to catch any async rendering
      setTimeout(updateNavHeight, 100)
      setTimeout(updateNavHeight, 300) // Another check after more time
      setTimeout(updateNavHeight, 500) // Final check
    })
    
    window.addEventListener('resize', updateNavHeight)
    return () => {
      window.removeEventListener('resize', updateNavHeight)
    }
  }, [currentView]) // Re-run when view changes in case nav content changes

  const handleVariationSelect = (id: VariationId) => {
    onNavigate(id)
    setShowVariations(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowVariations(false)
      }
    }

    if (showVariations) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showVariations])

  return (
    <nav ref={navRef} className="site-nav" aria-label={ARIA_LABELS[lang]}>
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
          className={`site-nav-link site-nav-about ${isAbout ? 'is-active' : ''}`}
          onClick={() => onNavigate('about')}
          aria-current={isAbout ? 'page' : undefined}
        >
          <span className="site-nav-label">{t.about}</span>
        </button>
        <span className="site-nav-sep" aria-hidden="true">
          ·
        </span>
        <div className="site-nav-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`site-nav-link site-nav-more ${isVariation ? 'is-active' : ''}`}
            onClick={() => {
              if (isVariation) {
                setShowVariations(!showVariations)
              } else {
                setShowVariations(!showVariations)
              }
            }}
            aria-current={isVariation ? 'page' : undefined}
            aria-expanded={showVariations}
            aria-haspopup="true"
          >
            <span className="site-nav-label">
              {isVariation 
                ? VARIATIONS.find(v => v.id === currentView)?.name[lang] || VARIATIONS.find(v => v.id === currentView)?.name.en
                : t.more}
            </span>
            <span className="site-nav-dropdown-arrow" aria-hidden="true">▼</span>
          </button>
          {showVariations && (
            <div className="site-nav-dropdown">
              {VARIATIONS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={`site-nav-dropdown-item ${currentView === v.id ? 'is-active' : ''}`}
                  onClick={() => handleVariationSelect(v.id)}
                >
                  {v.name[lang] || v.name.en}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
