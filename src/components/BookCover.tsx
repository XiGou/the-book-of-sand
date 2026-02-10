import React from 'react'
import type { Lang } from '../lib/book'

import './BookCover.css'

interface BookCoverProps {
  onOpen: () => void
  lang: Lang
}

export function BookCover({ onOpen, lang }: BookCoverProps) {
  return (
    <div className="book-cover-wrap">
      <button type="button" className="book-cover" onClick={onOpen} aria-label={lang === 'cn' ? '打开书' : 'Open book'}>
        <div className="book-cover-spine" />
        <div className="book-cover-face">
          <div className="book-cover-title">
            {lang === 'cn' ? '圣书' : 'Holy Writ'}
          </div>
          <div className="book-cover-subtitle">
            {lang === 'cn' ? '孟买' : 'Bombay'}
          </div>
          <div className="book-cover-hint">
            {lang === 'cn' ? '翻开' : 'Open'}
          </div>
        </div>
      </button>
    </div>
  )
}
