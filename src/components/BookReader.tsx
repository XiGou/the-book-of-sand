import { useState, useCallback, useEffect } from 'react'
import { getPageContent, getPageNumbers, getIllustration, formatPageNumber, type Lang } from '../lib/book'
import { Illustration } from './Illustrations'
import './BookReader.css'

interface BookReaderProps {
  initialPageIndex: number
  lang: Lang
  onLangChange: (lang: Lang) => void
  onClose: () => void
}

const LABELS = {
  en: {
    prev: 'Previous',
    next: 'Next',
    findFirst: 'Find first page',
    findLast: 'Find last page',
    slip: 'Pages slip between the cover and your thumb…',
    noFirst: 'There is no first page.',
    noLast: 'There is no last page.',
    illustrationGone: '[You will never see it again.]',
  },
  cn: {
    prev: '上一页',
    next: '下一页',
    findFirst: '找第一页',
    findLast: '找最后一页',
    slip: '封面和手指之间总有好几页，仿佛从书里冒出来……',
    noFirst: '没有第一页。',
    noLast: '没有最后一页。',
    illustrationGone: '［以后再也看不到了。］',
  },
} as const;

export function BookReader({ initialPageIndex, lang, onLangChange, onClose }: BookReaderProps) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [findingFirst, setFindingFirst] = useState(false);
  const [findingLast, setFindingLast] = useState(false);
  const [seenIllustrationIds, setSeenIllustrationIds] = useState<Set<number>>(new Set());
  const t = LABELS[lang];

  const content = getPageContent(pageIndex, lang);
  const { left, right, usePower } = getPageNumbers(pageIndex);
  const rawIllustrationId = getIllustration(pageIndex);
  const showIllustration = rawIllustrationId !== null && !seenIllustrationIds.has(rawIllustrationId);
  const illustrationAlreadySeen = rawIllustrationId !== null && seenIllustrationIds.has(rawIllustrationId);

  useEffect(() => {
    if (rawIllustrationId !== null) {
      setSeenIllustrationIds((prev) => new Set(prev).add(rawIllustrationId));
    }
  }, [pageIndex, rawIllustrationId]);

  const goPrev = useCallback(() => {
    setPageIndex((i) => i - 1);
  }, []);

  const goNext = useCallback(() => {
    setPageIndex((i) => i + 1);
  }, []);

  const findFirstPage = useCallback(() => {
    setFindingFirst(true);
    let step = 0;
    const maxSteps = 8;
    const id = setInterval(() => {
      setPageIndex((i) => i - 1);
      step += 1;
      if (step >= maxSteps) {
        clearInterval(id);
        setFindingFirst(false);
      }
    }, 280);
  }, []);

  const findLastPage = useCallback(() => {
    setFindingLast(true);
    let step = 0;
    const maxSteps = 8;
    const id = setInterval(() => {
      setPageIndex((i) => i + 1);
      step += 1;
      if (step >= maxSteps) {
        clearInterval(id);
        setFindingLast(false);
      }
    }, 280);
  }, []);

  const leftNum = usePower ? formatPageNumber(left, true) : formatPageNumber(left);
  const rightNum = usePower ? formatPageNumber(right, true) : formatPageNumber(right);

  return (
    <div className="book-reader" data-lang={lang}>
      <header className="book-reader-header">
        <button type="button" className="btn btn-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="book-reader-lang">
          <button
            type="button"
            className={lang === 'cn' ? 'active' : ''}
            onClick={() => onLangChange('cn')}
          >
            中文
          </button>
          <span className="sep">/</span>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            onClick={() => onLangChange('en')}
          >
            EN
          </button>
        </div>
      </header>

      <div className="book-reader-spread">
        <div className="page page-left">
          <div className="page-number page-number-left">{leftNum}</div>
          <div className="page-content" style={{ fontFamily: lang === 'cn' ? 'var(--font-serif-cn)' : undefined }}>
            {content}
          </div>
          {showIllustration && <Illustration id={rawIllustrationId!} />}
          {illustrationAlreadySeen && (
            <p className="page-illustration-gone">{t.illustrationGone}</p>
          )}
        </div>
        <div className="page page-right">
          <div className="page-number page-number-right">{rightNum}</div>
        </div>
      </div>

      <nav className="book-reader-nav">
        <button type="button" className="btn btn-prev" onClick={goPrev}>
          {t.prev}
        </button>
        <div className="book-reader-find">
          <button
            type="button"
            className="btn btn-find"
            onClick={findFirstPage}
            disabled={findingFirst || findingLast}
          >
            {t.findFirst}
          </button>
          <button
            type="button"
            className="btn btn-find"
            onClick={findLastPage}
            disabled={findingFirst || findingLast}
          >
            {t.findLast}
          </button>
        </div>
        <button type="button" className="btn btn-next" onClick={goNext}>
          {t.next}
        </button>
      </nav>

      {(findingFirst || findingLast) && (
        <div className="book-reader-hints" role="status">
          <p className="book-reader-hint book-reader-slip">{t.slip}</p>
          <p className="book-reader-hint book-reader-conclusion">
            {findingFirst ? t.noFirst : t.noLast}
          </p>
        </div>
      )}
    </div>
  )
}
