/**
 * Small dictionary-style illustrations; each appears once per 2000 pages.
 * "Never once was an illustration repeated."
 * Now uses Conway's Game of Life patterns generated with CSS.
 */

import { GameOfLifeIllustration } from './GameOfLifeIllustration';

export function Illustration({ id }: { id: number }) {
  // Use Game of Life for all illustrations
  // Each id generates a unique pattern
  return <GameOfLifeIllustration id={id} />;
}
