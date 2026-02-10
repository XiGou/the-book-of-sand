/**
 * Infinite book logic: page index → display page numbers and content.
 * "The number of pages in this book is no more or less than infinite.
 * None is the first page, none the last."
 * Page numbers follow the story: (40514, 999), then eight digits, occasionally "n^9".
 */

import {
  chunksEn,
  chunksCn,
  chunksEs,
  chunksJa,
  chunksPt,
  chunksFr,
  chunksDe,
  chunksHi,
  chunksLa,
  chunksEl,
} from '../data/chunks';

const ILLUSTRATION_INTERVAL = 2000;
const SEED = 40514;
const LARGE_PRIME = 7919;

/** Story-exact: first spread is 40514 (left) and 999 (right); next has eight digits. */
function pageNumberFromIndex(index: number, side: 'left' | 'right'): number {
  if (index === 0) return side === 'left' ? 40514 : 999;
  const a = Math.abs(index);
  const eightDigit = (n: number) => (n % 89999999) + 10000000;
  if (side === 'left') {
    return eightDigit(SEED + a * LARGE_PRIME);
  }
  return eightDigit(999 + a * 40514);
}

/** Format with commas; or "n^9" for ninth power (story: "elevated to the ninth power"). */
export function formatPageNumber(n: number, usePower: boolean = false): string {
  if (usePower) {
    const base = (Math.abs(n) % 7) + 2;
    return `${base}^9`;
  }
  return n.toLocaleString('en-US', { useGrouping: true });
}

export type Lang = 'en' | 'cn' | 'es' | 'ja' | 'pt' | 'fr' | 'de' | 'hi' | 'la' | 'el';

const CHUNKS_MAP: Record<Lang, readonly string[]> = {
  en: chunksEn,
  cn: chunksCn,
  es: chunksEs,
  ja: chunksJa,
  pt: chunksPt,
  fr: chunksFr,
  de: chunksDe,
  hi: chunksHi,
  la: chunksLa,
  el: chunksEl,
};

export function getPageContent(index: number, lang: Lang): string {
  const chunks = CHUNKS_MAP[lang];
  const i = ((index % chunks.length) + chunks.length) % chunks.length;
  return chunks[i];
}

export function getPageNumbers(index: number): { left: number; right: number; usePower: boolean } {
  const left = pageNumberFromIndex(index, 'left');
  const right = pageNumberFromIndex(index, 'right');
  const usePower = index !== 0 && index % 7 === 0;
  return { left, right, usePower };
}

/** Every ILLUSTRATION_INTERVAL pages there is a small illustration; never repeated (unique per index). */
export function getIllustration(index: number): number | null {
  if (index % ILLUSTRATION_INTERVAL !== 0) return null;
  return Math.floor(index / ILLUSTRATION_INTERVAL) % 8;
}
