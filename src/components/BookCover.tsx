import type { Lang } from '../lib/book'

import './BookCover.css'

interface BookCoverProps {
  onOpen: () => void
  lang: Lang
}

export function BookCover({ onOpen, lang }: BookCoverProps) {
  return (
    <div className="book-cover-wrap">
      <div className="book-3d-container">
        <button type="button" className="book-cover" onClick={onOpen} aria-label={lang === 'cn' ? '打开书' : 'Open book'}>
          {/* 书脊 */}
          <div className="book-cover-spine">
            <div className="book-spine-text book-spine-top">
              {lang === 'cn' ? '圣书' : 'HOLY WRIT'}
            </div>
            <div className="book-spine-text book-spine-bottom">
              {lang === 'cn' ? '孟买' : 'MUMBAI'}
            </div>
          </div>
          {/* 封面 */}
          <div className="book-cover-face">
            <div className="book-cover-title">
              {lang === 'cn' ? '沙之书' : 'The Book of Sand'}
            </div>
          </div>

        </button>
      </div>
    </div>
  )
}
