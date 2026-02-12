/**
 * Conway's Game of Life illustration component
 * Generates CSS-based Game of Life patterns
 */

import { useMemo } from 'react'
import { Anchor } from 'lucide-react'
import { generateGameOfLife, getGameOfLifeConfig } from '../lib/gameOfLife'
import './GameOfLifeIllustration.css'

interface GameOfLifeIllustrationProps {
  id: number
  /** 是否显示船锚（看一次即消失） */
  showAnchor?: boolean
}

export function GameOfLifeIllustration({ id, showAnchor = true }: GameOfLifeIllustrationProps) {
  const config = useMemo(() => getGameOfLifeConfig(id), [id])
  const grid = useMemo(() => generateGameOfLife(config), [config])

  return (
    <figure className="page-illustration game-of-life-illustration">
      <div 
        className="game-of-life-grid"
        style={{
          gridTemplateColumns: `repeat(${config.width}, 1fr)`,
          gridTemplateRows: `repeat(${config.height}, 1fr)`,
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`game-of-life-cell ${cell ? 'alive' : 'dead'}`}
            />
          ))
        )}
      </div>
      {/* 船锚图标，博尔赫斯《沙之书》中的插画；看一次即消失 */}
      {showAnchor && (
        <div className="anchor-overlay-wrapper">
          <Anchor className="anchor-icon" size={64} strokeWidth={2.5} aria-hidden />
        </div>
      )}
    </figure>
  )
}
