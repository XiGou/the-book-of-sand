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

// 无理数常量
const IRRATIONAL_NUMBERS = [
  { name: 'π', value: Math.PI },
  { name: 'e', value: Math.E },
  { name: '√2', value: Math.SQRT2 },
  { name: '√3', value: Math.sqrt(3) },
  { name: '√5', value: Math.sqrt(5) },
  { name: 'φ', value: (1 + Math.sqrt(5)) / 2 }, // 黄金比例
];

// 常见分数（有理数）
const RATIONAL_FRACTIONS = [
  [22, 7],    // π的近似
  [355, 113], // π的更精确近似
  [3, 2],
  [5, 3],
  [7, 4],
  [11, 7],
  [13, 8],
  [17, 11],
];

/** 生成各种形式的页码：小数、无理数、有理数、整数、大数 */
function generatePageNumber(index: number, side: 'left' | 'right'): string {
  // 第一页保持原文：左边40514，右边999
  if (index === 0) {
    return side === 'left' ? '40514' : '999';
  }

  const a = Math.abs(index);
  const seed = side === 'left' ? SEED : 999;
  const multiplier = side === 'left' ? LARGE_PRIME : 40514;
  const hash1 = (seed + a * multiplier) % 1000;
  const hash2 = (seed * 7919 + a * 40514) % 1000;
  const hash3 = (a * 7919 * 40514) % 1000;

  // 使用多个hash值增加随机性和形式变化
  const formType = (hash1 + hash2) % 12;

  switch (formType) {
    case 0: // 小数（如40.514）
      const decimalInt = (hash1 * 7919) % 100000;
      const decimalPlaces = (hash2 % 4) + 1; // 1-4位小数
      return decimalInt.toFixed(decimalPlaces);
    
    case 1: // 无理数（π, e, √2等）- 带符号形式
      const irrIndex = hash1 % IRRATIONAL_NUMBERS.length;
      const irr = IRRATIONAL_NUMBERS[irrIndex];
      const irrDecimal = (hash2 % 6) + 1; // 1-6位小数
      return `${irr.name} ≈ ${irr.value.toFixed(irrDecimal)}`;
    
    case 2: // 有理数（分数形式）
      const fracIndex = hash1 % RATIONAL_FRACTIONS.length;
      const [num, den] = RATIONAL_FRACTIONS[fracIndex];
      return `${num}/${den}`;
    
    case 3: // 大整数（八位数）
      const eightDigit = ((hash1 * 7919 + seed) % 89999999) + 10000000;
      return eightDigit.toLocaleString('en-US', { useGrouping: true });
    
    case 4: // 科学计数法
      const sciBase = (hash1 * 40514) % 9999 + 1;
      const sciExp = (hash2 % 9) + 1;
      return `${sciBase.toFixed(2)}×10^${sciExp}`;
    
    case 5: // 带小数的大数（八位数+小数）
      const largeDecimal = ((hash1 * 7919) % 89999999) + 10000000;
      const largeFrac = (hash2 % 1000);
      const largeFracPlaces = (hash3 % 3) + 1;
      return `${largeDecimal.toLocaleString('en-US')}.${largeFrac.toString().padStart(3, '0').substring(0, largeFracPlaces)}`;
    
    case 6: // 混合形式：整数+小数部分（如40514.999）
      const mixedInt = (hash1 * 40514) % 99999;
      const mixedFrac = (hash2 * 7919) % 1000;
      return `${mixedInt}.${mixedFrac.toString().padStart(3, '0')}`;
    
    case 7: // 无理数的近似值（只显示数值，如3.14159）
      const irrValueIndex = hash1 % IRRATIONAL_NUMBERS.length;
      const irrValue = IRRATIONAL_NUMBERS[irrValueIndex].value;
      const irrPlaces = (hash2 % 7) + 2; // 2-8位小数
      return irrValue.toFixed(irrPlaces);
    
    case 8: // 非常大的整数（九位数）
      const veryLarge = ((hash1 * 7919 * 40514) % 899999999) + 100000000;
      return veryLarge.toLocaleString('en-US', { useGrouping: true });
    
    case 9: // 特殊形式：根号
      const sqrtBase = (hash1 % 100) + 2;
      const sqrtValue = Math.sqrt(sqrtBase);
      const sqrtPlaces = (hash2 % 5) + 2; // 2-6位小数
      return `√${sqrtBase} ≈ ${sqrtValue.toFixed(sqrtPlaces)}`;
    
    case 10: // 小数形式的大数（如40514.514）
      const largeWithDecimal = (hash1 * 40514) % 99999;
      const decimalPart = (hash2 * 7919) % 1000;
      return `${largeWithDecimal}.${decimalPart.toString().padStart(3, '0')}`;
    
    case 11: // 整数（中等大小）
      const mediumInt = (hash1 * 7919 + hash2 * 40514) % 999999 + 1000;
      return mediumInt.toLocaleString('en-US', { useGrouping: true });
    
    default:
      const defaultNum = (hash1 * 7919) % 999999 + 1000;
      return defaultNum.toString();
  }
}

/** Format with commas; or "n^9" for ninth power (story: "elevated to the ninth power"). */
export function formatPageNumber(n: string | number, usePower: boolean = false): string {
  if (usePower) {
    const num = typeof n === 'string' ? parseFloat(n) || 0 : n;
    const base = (Math.abs(num) % 7) + 2;
    return `${base}^9`;
  }
  
  // 如果已经是字符串（包含特殊格式），直接返回
  if (typeof n === 'string') {
    return n;
  }
  
  // 否则格式化为带逗号的数字
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

export function getPageNumbers(index: number): { left: string; right: string; usePower: boolean } {
  const left = generatePageNumber(index, 'left');
  const right = generatePageNumber(index, 'right');
  const usePower = index !== 0 && index % 7 === 0;
  return { left, right, usePower };
}

/** Every ILLUSTRATION_INTERVAL pages there is a small illustration; never repeated (unique per index). */
export function getIllustration(index: number): number | null {
  if (index % ILLUSTRATION_INTERVAL !== 0) return null;
  // Use the index itself as illustration ID to ensure uniqueness
  // This ensures every 2000th page has a unique illustration
  return Math.floor(index / ILLUSTRATION_INTERVAL);
}
