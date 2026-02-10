import { useState, useEffect, useCallback } from 'react'
import { destinations, sloganTemplates, type Destination } from '../data/crazyJourney'
import './CrazyJourney.css'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function fillSlogan(template: string, destinationName: string): string {
  return template.replace(/xxx/g, destinationName).replace(/xx/g, destinationName)
}

export function CrazyJourney() {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [slogan, setSlogan] = useState<string>('')

  const drawNext = useCallback(() => {
    const dest = pickRandom(destinations)
    const template = pickRandom(sloganTemplates)
    setDestination(dest)
    setSlogan(fillSlogan(template, dest.name))
  }, [])

  useEffect(() => {
    drawNext()
  }, [drawNext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault()
        drawNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [drawNext])

  if (!destination) {
    return (
      <div className="crazy-journey-container">
        <div className="crazy-journey-card">加载中…</div>
      </div>
    )
  }

  return (
    <div className="crazy-journey-container">
      <div className="crazy-journey-card">
        <div className="crazy-journey-meta">
          <span className="crazy-journey-country">{destination.country}</span>
          <span className="crazy-journey-dot">·</span>
          <span className="crazy-journey-continent">{destination.continent}</span>
          <span className="crazy-journey-dot">·</span>
          <span className="crazy-journey-type">{destination.type}</span>
        </div>
        <h2 className="crazy-journey-title">{destination.name}</h2>
        <p className="crazy-journey-intro">{destination.intro}</p>
        <div className="crazy-journey-slogan">{slogan}</div>
        <div className="crazy-journey-actions">
          <button type="button" className="crazy-journey-button" onClick={drawNext}>
            下一站
          </button>
        </div>
        <p className="crazy-journey-hint">方向键或空格也可换一站</p>
      </div>
    </div>
  )
}
