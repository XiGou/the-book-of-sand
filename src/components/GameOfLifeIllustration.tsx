/**
 * Conway's Game of Life illustration component
 * Generates CSS-based Game of Life patterns
 */

import { useMemo } from 'react'
import { generateGameOfLife, getGameOfLifeConfig } from '../lib/gameOfLife'
import './GameOfLifeIllustration.css'

interface GameOfLifeIllustrationProps {
  id: number
}

export function GameOfLifeIllustration({ id }: GameOfLifeIllustrationProps) {
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
    </figure>
  )
}
