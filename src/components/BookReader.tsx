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
  const t = LABELS[lang];

  const content = getPageContent(pageIndex, lang);
  const { left, usePower } = getPageNumbers(pageIndex);
  const rawIllustrationId = getIllustration(pageIndex);
  const hasIllustration = rawIllustrationId !== null;
  
  const [flipState, setFlipState] = useState<'idle' | 'flipping-next' | 'flipping-prev'>('idle');
  const [nextPageData, setNextPageData] = useState<{ content: string; pageNum: string; hasIllustration: boolean; illustrationId: number | null } | null>(null);
  /** 船锚已看过的插图 ID（看一次即消失） */
  const [anchorSeenIds, setAnchorSeenIds] = useState<Set<number>>(() => new Set());

  const markAnchorSeen = useCallback((illustrationId: number) => {
    setAnchorSeenIds((prev) => new Set(prev).add(illustrationId));
  }, []);

  const goPrev = useCallback(() => {
    if (flipState !== 'idle') return;
    if (hasIllustration && rawIllustrationId !== null) markAnchorSeen(rawIllustrationId);
    setFlipState('flipping-prev');
    const prevIndex = pageIndex - 1;
    const prevContent = getPageContent(prevIndex, lang);
    const prevPageNums = getPageNumbers(prevIndex);
    const prevPageNum = prevPageNums.usePower ? formatPageNumber(prevPageNums.left, true) : formatPageNumber(prevPageNums.left);
    const prevIllustrationId = getIllustration(prevIndex);
    setNextPageData({
      content: prevContent,
      pageNum: prevPageNum,
      hasIllustration: prevIllustrationId !== null,
      illustrationId: prevIllustrationId,
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        setPageIndex(prevIndex);
        setFlipState('idle');
        setNextPageData(null);
      });
    }, 420);
  }, [flipState, pageIndex, lang, hasIllustration, rawIllustrationId, markAnchorSeen]);

  const goNext = useCallback(() => {
    if (flipState !== 'idle') return;
    if (hasIllustration && rawIllustrationId !== null) markAnchorSeen(rawIllustrationId);
    setFlipState('flipping-next');
    const nextIndex = pageIndex + 1;
    const nextContent = getPageContent(nextIndex, lang);
    const nextPageNums = getPageNumbers(nextIndex);
    const nextPageNum = nextPageNums.usePower ? formatPageNumber(nextPageNums.left, true) : formatPageNumber(nextPageNums.left);
    const nextIllustrationId = getIllustration(nextIndex);
    setNextPageData({
      content: nextContent,
      pageNum: nextPageNum,
      hasIllustration: nextIllustrationId !== null,
      illustrationId: nextIllustrationId,
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        setPageIndex(nextIndex);
        setFlipState('idle');
        setNextPageData(null);
      });
    }, 420);
  }, [flipState, pageIndex, lang, hasIllustration, rawIllustrationId, markAnchorSeen]);

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
    if (hasIllustration && rawIllustrationId !== null) markAnchorSeen(rawIllustrationId);
    setFlipState('idle');
    setNextPageData(null);
    if (direction === 'next') {
      setPageIndex((i) => i + count);
    } else {
      setPageIndex((i) => i - count);
    }
    clearNumberInput();
  }, [goNext, goPrev, clearNumberInput, hasIllustration, rawIllustrationId, markAnchorSeen]);

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

      <div className="book-reader-page-wrapper">
        {/* 当前页 */}
        <div className={`page page-current ${flipState === 'flipping-next' ? 'flipping-out-next' : flipState === 'flipping-prev' ? 'flipping-out-prev' : ''}`}>
          <div className="page-number page-number-center">{leftNum}</div>
          {hasIllustration ? (
            <>
              <Illustration id={rawIllustrationId!} anchorSeen={anchorSeenIds.has(rawIllustrationId!)} />
              <p className="page-illustration-hint">{(t as typeof LABELS.en).illustrationHint || (t as typeof LABELS.en).illustrationGone}</p>
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

        {/* 下一页（翻页时显示） */}
        {flipState === 'flipping-next' && nextPageData && (
          <div className="page page-next flipping-in">
            <div className="page-number page-number-center">{nextPageData.pageNum}</div>
            {nextPageData.hasIllustration ? (
              <>
                <Illustration id={nextPageData.illustrationId!} anchorSeen={anchorSeenIds.has(nextPageData.illustrationId!)} />
                <p className="page-illustration-hint">{(t as typeof LABELS.en).illustrationHint || (t as typeof LABELS.en).illustrationGone}</p>
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
                {nextPageData.content}
              </div>
            )}
          </div>
        )}

        {/* 上一页（翻页时显示） */}
        {flipState === 'flipping-prev' && nextPageData && (
          <div className="page page-prev flipping-in">
            <div className="page-number page-number-center">{nextPageData.pageNum}</div>
            {nextPageData.hasIllustration ? (
              <>
                <Illustration id={nextPageData.illustrationId!} anchorSeen={anchorSeenIds.has(nextPageData.illustrationId!)} />
                <p className="page-illustration-hint">{(t as typeof LABELS.en).illustrationHint || (t as typeof LABELS.en).illustrationGone}</p>
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
                {nextPageData.content}
              </div>
            )}
          </div>
        )}
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
