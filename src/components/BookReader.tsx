import React, { useState, useCallback, useEffect, useRef } from 'react'
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
    illustrationHint: 'Look carefully. You will never see it again.',
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
    illustrationHint: '仔细瞧瞧。以后再也看不到了。',
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
    illustrationHint: 'Mira con atención. Ya no la verás nunca más.',
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
    illustrationHint: 'よく見てください。二度と見られませんから。',
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
    illustrationHint: 'Olhe com atenção. Nunca mais a verás.',
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
    illustrationHint: 'Regardez attentivement. Vous ne la reverrez jamais plus.',
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
    illustrationHint: 'Schauen Sie genau hin. Sie werden sie nie wieder sehen.',
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
    illustrationHint: 'ध्यान से देखें। फिर कभी नहीं देख पाएँगे।',
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
    illustrationHint: 'Attente aspice. Numquam eam iterum videbis.',
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
    illustrationHint: 'Κοιτάξτε προσεκτικά. Δεν θα την ξαναδείτε ποτέ.',
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
  const [numberInput, setNumberInput] = useState<string>('');
  const numberInputTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationEndHandledRef = useRef(false);
  const t = LABELS[lang];

  const content = getPageContent(pageIndex, lang);
  const nextContent = getPageContent(pageIndex + 1, lang);
  const prevContent = getPageContent(pageIndex - 1, lang);
  const { left, right, usePower } = getPageNumbers(pageIndex);
  const nextPageNumbers = getPageNumbers(pageIndex + 1);
  const prevPageNumbers = getPageNumbers(pageIndex - 1);
  const rawIllustrationId = getIllustration(pageIndex);
  const hasIllustration = rawIllustrationId !== null;
  
  // Check if next page has illustration (for flip animation)
  const nextPageIllustrationId = getIllustration(pageIndex + 1);
  const hasNextPageIllustration = nextPageIllustrationId !== null;
  
  const [flipDirection, setFlipDirection] = useState<'prev' | 'next' | null>(null);
  
  // Debug: verify illustration logic is working
  useEffect(() => {
    console.log(`[BookReader] Page ${pageIndex}: hasIllustration=${hasIllustration}, rawIllustrationId=${rawIllustrationId}, flipDirection=${flipDirection}`);
    if (hasIllustration) {
      console.log(`[BookReader] Page ${pageIndex} has illustration ID: ${rawIllustrationId}`);
    }
    if (hasNextPageIllustration) {
      console.log(`[BookReader] Next page ${pageIndex + 1} has illustration ID: ${nextPageIllustrationId}`);
    }
  }, [pageIndex, hasIllustration, rawIllustrationId, hasNextPageIllustration, nextPageIllustrationId, flipDirection]);

  const goPrev = useCallback(() => {
    animationEndHandledRef.current = false; // Reset flag when starting new animation
    setFlipDirection('prev');
  }, []);

  const goNext = useCallback(() => {
    animationEndHandledRef.current = false; // Reset flag when starting new animation
    setFlipDirection('next');
  }, []);

  const handleAnimationEnd = useCallback((direction: 'prev' | 'next') => {
    // Prevent multiple calls - only handle the first animation end event
    if (animationEndHandledRef.current) {
      return;
    }
    animationEndHandledRef.current = true;
    
    // Use requestAnimationFrame to ensure state updates happen in the correct order
    requestAnimationFrame(() => {
      if (direction === 'next') {
        setPageIndex((i) => {
          const newIndex = i + 1;
          const newIllustrationId = getIllustration(newIndex);
          console.log(`[BookReader] Animation ended, pageIndex: ${i} -> ${newIndex}, hasIllustration: ${newIllustrationId !== null}`);
          return newIndex;
        });
      } else {
        setPageIndex((i) => i - 1);
      }
      // Delay clearing flipDirection slightly to ensure pageIndex update is processed first
      requestAnimationFrame(() => {
        setFlipDirection(null);
        // Reset the flag after a short delay to allow next animation
        setTimeout(() => {
          animationEndHandledRef.current = false;
        }, 100);
      });
    });
  }, []);

  // 清除数字输入
  const clearNumberInput = useCallback(() => {
    setNumberInput('');
    if (numberInputTimeoutRef.current) {
      window.clearTimeout(numberInputTimeoutRef.current);
      numberInputTimeoutRef.current = null;
    }
  }, []);

  // 执行翻页（支持连续翻页）
  const performPageTurn = useCallback((direction: 'prev' | 'next', count: number = 1) => {
    if (count <= 0) return;
    
    // 如果只翻一页，使用动画
    if (count === 1) {
      if (direction === 'next') {
        goNext();
      } else {
        goPrev();
      }
      clearNumberInput();
      return;
    }

    // 连续翻多页，直接更新页码（不使用动画）
    setFlipDirection(null); // 取消动画
    if (direction === 'next') {
      setPageIndex((i) => i + count);
    } else {
      setPageIndex((i) => i - count);
    }
    clearNumberInput();
  }, [goNext, goPrev, clearNumberInput]);

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 忽略在输入框中的按键
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      // 数字键（0-9）
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        const newInput = numberInput + e.key;
        // 允许输入更多位数，限制最大翻页数为999999（足够大）
        const num = parseInt(newInput, 10);
        if (num <= 999999 && newInput.length <= 10) {
          setNumberInput(newInput);
          // 清除之前的超时
          if (numberInputTimeoutRef.current) {
            window.clearTimeout(numberInputTimeoutRef.current);
          }
          // 2秒后自动清除数字输入
          numberInputTimeoutRef.current = window.setTimeout(() => {
            setNumberInput('');
          }, 2000);
        }
        return;
      }

      // 左右箭头键
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const count = numberInput ? parseInt(numberInput, 10) || 1 : 1;
        const direction = e.key === 'ArrowLeft' ? 'prev' : 'next';
        performPageTurn(direction, count);
        return;
      }

      // Escape 键清除数字输入
      if (e.key === 'Escape') {
        clearNumberInput();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (numberInputTimeoutRef.current) {
        window.clearTimeout(numberInputTimeoutRef.current);
        numberInputTimeoutRef.current = null;
      }
    };
  }, [numberInput, performPageTurn, clearNumberInput]);

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
  const nextLeftNum = nextPageNumbers.usePower ? formatPageNumber(nextPageNumbers.left, true) : formatPageNumber(nextPageNumbers.left);
  const prevRightNum = prevPageNumbers.usePower ? formatPageNumber(prevPageNumbers.right, true) : formatPageNumber(prevPageNumbers.right);

  return (
    <div className="book-reader" data-lang={lang}>
      {numberInput && (
        <div className="book-reader-number-input">
          翻页数: {numberInput} (按 ← → 执行)
        </div>
      )}
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

      <div className="book-reader-spread-outer">
        <div className="book-reader-spread">
          <div className="page page-left">
            <div className="page-number page-number-left">{leftNum}</div>
            {hasIllustration ? (
              <>
                <Illustration id={rawIllustrationId!} />
                <p className="page-illustration-hint">{t.illustrationHint || t.illustrationGone}</p>
              </>
            ) : (
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
            )}
          </div>
          <div className={`page page-right ${flipDirection === 'next' ? 'page-flipping' : ''}`}>
            <div className="page-number page-number-right">{rightNum}</div>
            <div
              className="page-content"
              style={{
                fontFamily:
                  lang === 'cn' || lang === 'ja' || lang === 'hi'
                    ? 'var(--font-serif-cn)'
                    : undefined,
              }}
            >
              {nextContent}
            </div>
          </div>
          {flipDirection && (
            <div 
              className={`page-flip page-flip-${flipDirection}`}
              onAnimationEnd={() => handleAnimationEnd(flipDirection)}
            >
              <div className="page-flip-front">
                {flipDirection === 'next' ? (
                  <>
                    <div className="page-number page-number-left">{rightNum}</div>
                    {hasNextPageIllustration ? (
                      <>
                        <Illustration id={nextPageIllustrationId!} />
                        <p className="page-illustration-hint">{t.illustrationHint || t.illustrationGone}</p>
                      </>
                    ) : (
                      <div
                        className="page-content"
                        style={{
                          fontFamily:
                            lang === 'cn' || lang === 'ja' || lang === 'hi'
                              ? 'var(--font-serif-cn)'
                              : undefined,
                        }}
                      >
                        {nextContent}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="page-number page-number-right">{leftNum}</div>
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
                  </>
                )}
              </div>
              <div className="page-flip-back">
                {flipDirection === 'next' ? (
                  <>
                    <div className="page-number page-number-right">{nextLeftNum}</div>
                    <div
                      className="page-content"
                      style={{
                        fontFamily:
                          lang === 'cn' || lang === 'ja' || lang === 'hi'
                            ? 'var(--font-serif-cn)'
                            : undefined,
                      }}
                    >
                      {getPageContent(pageIndex + 2, lang)}
                    </div>
                    {hasNextPageIllustration && (
                      <>
                        <Illustration id={nextPageIllustrationId!} />
                        <p className="page-illustration-hint">{t.illustrationHint || t.illustrationGone}</p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="page-number page-number-left">{prevRightNum}</div>
                    <div
                      className="page-content"
                      style={{
                        fontFamily:
                          lang === 'cn' || lang === 'ja' || lang === 'hi'
                            ? 'var(--font-serif-cn)'
                            : undefined,
                      }}
                    >
                      {prevContent}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
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
