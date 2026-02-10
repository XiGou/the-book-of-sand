import { useState, useEffect, useRef } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { dazibaoResources } from '../data/resources'
import './Dazibao.css'

interface DazibaoContent {
  id: number
  text: string
  fontSize: string
  color: string
  rotation: number
}

function generateDazibao(seed: number): DazibaoContent {
  const gen = new ContentGenerator(seed)
  const slogan = gen.selectFrom(dazibaoResources.slogans)
  const action = gen.selectFrom(dazibaoResources.actions)
  const target = gen.selectFrom(dazibaoResources.targets)
  const modifier = gen.selectFrom(dazibaoResources.modifiers)
  
  const text = gen.generateText(slogan, { action, target, modifier })
  const fontSize = gen.selectFrom(dazibaoResources.fontSizes)
  const color = gen.selectFrom(dazibaoResources.colors)
  const rotation = gen.selectFrom(dazibaoResources.rotations)
  
  return {
    id: seed,
    text,
    fontSize,
    color,
    rotation,
  }
}

export function Dazibao() {
  const [dazibaos, setDazibaos] = useState<DazibaoContent[]>(() => {
    return Array.from({ length: 10 }, (_, i) => generateDazibao(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    const newDazibaos = Array.from({ length: 5 }, (_, i) => 
      generateDazibao(dazibaos.length + i)
    )
    setDazibaos(prev => [...prev, ...newDazibaos])
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore()
          }
        })
      },
      { threshold: 0.1 }
    )

    const lastDazibao = container.querySelector('.dazibao-item:last-child')
    if (lastDazibao) {
      observer.observe(lastDazibao)
    }

    return () => observer.disconnect()
  }, [dazibaos.length])

  return (
    <div className="dazibao-container" ref={containerRef}>
      {dazibaos.map((dazibao) => (
        <div key={dazibao.id} className="dazibao-item">
          <div
            className="dazibao-text"
            style={{
              fontSize: dazibao.fontSize,
              color: dazibao.color,
              transform: `rotate(${dazibao.rotation}deg)`,
            }}
          >
            {dazibao.text}
          </div>
        </div>
      ))}
    </div>
  )
}
