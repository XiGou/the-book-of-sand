/**
 * Small dictionary-style illustrations; each appears once per 2000 pages.
 * "Never once was an illustration repeated."
 * Now uses Conway's Game of Life patterns generated with CSS.
 */

import { GameOfLifeIllustration } from './GameOfLifeIllustration';

interface IllustrationProps {
  id: number
  /** 船锚是否已看过（看过一次即消失） */
  anchorSeen?: boolean
}

export function Illustration({ id, anchorSeen = false }: IllustrationProps) {
  return (
    <GameOfLifeIllustration id={id} showAnchor={!anchorSeen} />
  )
}
