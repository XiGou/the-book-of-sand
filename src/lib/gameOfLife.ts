/**
 * Conway's Game of Life generator for illustrations
 * Generates deterministic patterns based on seed
 */

import { SeededRandom } from './contentGenerator'

export interface GameOfLifeConfig {
  width: number
  height: number
  generations: number
  seed: number
}

/**
 * Generate initial state for Game of Life based on seed
 */
function generateInitialState(width: number, height: number, seed: number): boolean[][] {
  const random = new SeededRandom(seed)
  const grid: boolean[][] = []
  
  for (let y = 0; y < height; y++) {
    grid[y] = []
    for (let x = 0; x < width; x++) {
      // Use different probability patterns for more interesting results
      const pattern = (x + y) % 3
      let probability = 0.3
      
      if (pattern === 0) {
        probability = 0.25
      } else if (pattern === 1) {
        probability = 0.35
      } else {
        probability = 0.3
      }
      
      grid[y][x] = random.next() < probability
    }
  }
  
  return grid
}

/**
 * Count live neighbors
 */
function countNeighbors(grid: boolean[][], x: number, y: number, width: number, height: number): number {
  let count = 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        if (grid[ny][nx]) count++
      }
    }
  }
  return count
}

/**
 * Run one generation of Game of Life
 */
function nextGeneration(grid: boolean[][], width: number, height: number): boolean[][] {
  const newGrid: boolean[][] = []
  
  for (let y = 0; y < height; y++) {
    newGrid[y] = []
    for (let x = 0; x < width; x++) {
      const neighbors = countNeighbors(grid, x, y, width, height)
      const isAlive = grid[y][x]
      
      // Conway's rules:
      // 1. Any live cell with 2-3 neighbors survives
      // 2. Any dead cell with exactly 3 neighbors becomes alive
      // 3. All other cells die or stay dead
      newGrid[y][x] = (isAlive && (neighbors === 2 || neighbors === 3)) || (!isAlive && neighbors === 3)
    }
  }
  
  return newGrid
}

/**
 * Generate Game of Life pattern
 */
export function generateGameOfLife(config: GameOfLifeConfig): boolean[][] {
  let grid = generateInitialState(config.width, config.height, config.seed)
  
  // Run multiple generations
  for (let gen = 0; gen < config.generations; gen++) {
    grid = nextGeneration(grid, config.width, config.height)
  }
  
  return grid
}

/**
 * Get Game of Life configuration for a given illustration ID
 */
export function getGameOfLifeConfig(illustrationId: number): GameOfLifeConfig {
  // Use different sizes and generations for variety
  const patterns = [
    { width: 20, height: 20, generations: 5 },
    { width: 24, height: 24, generations: 8 },
    { width: 18, height: 18, generations: 6 },
    { width: 22, height: 22, generations: 7 },
    { width: 20, height: 20, generations: 10 },
    { width: 16, height: 16, generations: 5 },
    { width: 20, height: 20, generations: 12 },
    { width: 24, height: 24, generations: 9 },
  ]
  
  const pattern = patterns[illustrationId % patterns.length]
  
  return {
    width: pattern.width,
    height: pattern.height,
    generations: pattern.generations,
    seed: illustrationId * 7919 + 40514, // Use large prime for better distribution
  }
}
