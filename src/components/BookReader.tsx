import React, { useState, useCallback, useEffect } from 'react'
import { getPageContent, getPageNumbers, getIllustration, formatPageNumber, type Lang } from '../lib/book'
import { Illustration } from './Illustrations'
import './BookReader.css'

const ALL_LANGS: Lang[] = ['en', 'cn', 'es', 'ja', 'pt', 'fr', 'de', 'hi', 'la', 'el'];

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
  es: {
    prev: 'Anterior',
    next: 'Siguiente',
    findFirst: 'Buscar primera página',
    findLast: 'Buscar última página',
    slip: 'Las páginas se deslizan entre la portada y el pulgar…',
    noFirst: 'No hay primera página.',
    noLast: 'No hay última página.',
    illustrationGone: '[Ya no la verás nunca más.]',
  },
  ja: {
    prev: '前へ',
    next: '次へ',
    findFirst: '最初の頁を探す',
    findLast: '最後の頁を探す',
    slip: '表紙と指の間にはいつも何頁か挟まっていて、本から湧き出してくるようだった……',
    noFirst: '最初の頁はない。',
    noLast: '最後の頁はない。',
    illustrationGone: '［二度と見られませんから。］',
  },
  pt: {
    prev: 'Anterior',
    next: 'Próxima',
    findFirst: 'Encontrar primeira página',
    findLast: 'Encontrar última página',
    slip: 'As páginas deslizam entre a capa e o polegar…',
    noFirst: 'Não há primeira página.',
    noLast: 'Não há última página.',
    illustrationGone: '[Nunca mais a verás.]',
  },
  fr: {
    prev: 'Précédent',
    next: 'Suivant',
    findFirst: 'Trouver la première page',
    findLast: 'Trouver la dernière page',
    slip: 'Les feuilles glissent entre la couverture et le pouce…',
    noFirst: 'Il n\'y a pas de première page.',
    noLast: 'Il n\'y a pas de dernière page.',
    illustrationGone: '[Vous ne la reverrez jamais plus.]',
  },
  de: {
    prev: 'Zurück',
    next: 'Weiter',
    findFirst: 'Erste Seite finden',
    findLast: 'Letzte Seite finden',
    slip: 'Blätter schieben sich zwischen Einband und Daumen…',
    noFirst: 'Es gibt keine erste Seite.',
    noLast: 'Es gibt keine letzte Seite.',
    illustrationGone: '[Sie werden sie nie wieder sehen.]',
  },
  hi: {
    prev: 'पिछला',
    next: 'अगला',
    findFirst: 'पहला पन्ना ढूँढें',
    findLast: 'आख़िरी पन्ना ढूँढें',
    slip: 'मुखपृष्ठ और अँगूठे के बीच हमेशा कई पन्ने आ जाते……',
    noFirst: 'पहला पन्ना नहीं है।',
    noLast: 'आख़िरी पन्ना नहीं है।',
    illustrationGone: '［फिर कभी नहीं देख पाएँगे।］',
  },
  la: {
    prev: 'Prior',
    next: 'Sequens',
    findFirst: 'Primam paginam quaerere',
    findLast: 'Ultimam paginam quaerere',
    slip: 'Paginae inter tegumentum et pollicem labuntur…',
    noFirst: 'Prima pagina non est.',
    noLast: 'Ultima pagina non est.',
    illustrationGone: '[Numquam eam iterum videbis.]',
  },
  el: {
    prev: 'Προηγούμενη',
    next: 'Επόμενη',
    findFirst: 'Βρείτε την πρώτη σελίδα',
    findLast: 'Βρείτε την τελευταία σελίδα',
    slip: 'Οι σελίδες γλιστρούν ανάμεσα στο εξώφυλλο και τον αντίχειρα…',
    noFirst: 'Δεν υπάρχει πρώτη σελίδα.',
    noLast: 'Δεν υπάρχει τελευταία σελίδα.',
    illustrationGone: '[Δεν θα την ξαναδείτε ποτέ.]',
  },
} as const;

const LANG_NAMES: Record<Lang, string> = {
  en: 'EN',
  cn: '中文',
  es: 'ES',
  ja: '日本語',
  pt: 'PT',
  fr: 'FR',
  de: 'DE',
  hi: 'हिन्दी',
  la: 'LA',
  el: 'ΕΛ',
};

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

  const [flipDirection, setFlipDirection] = useState<'prev' | 'next' | null>(null);

  const goPrev = useCallback(() => {
    setFlipDirection('prev');
    setPageIndex((i) => i - 1);
  }, []);

  const goNext = useCallback(() => {
    setFlipDirection('next');
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
          {ALL_LANGS.map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span className="sep">/</span>}
              <button
                type="button"
                className={lang === l ? 'active' : ''}
                onClick={() => onLangChange(l)}
              >
                {LANG_NAMES[l]}
              </button>
            </React.Fragment>
          ))}
        </div>
      </header>

      <div
        className={`book-reader-spread-outer ${flipDirection ? `turn-${flipDirection}` : ''}`}
        onAnimationEnd={() => setFlipDirection(null)}
      >
        <div className="book-reader-spread">
          <div className="page page-left">
            <div className="page-number page-number-left">{leftNum}</div>
            <div
              className="page-content"
              style={{
                fontFamily:
                  lang === 'cn' || lang === 'ja' || lang === 'hi'
                    ? 'var(--font-serif-cn)'
                    : undefined,
              }}
            >
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
