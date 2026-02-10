import { useState, useEffect, useRef, useCallback } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { dazibaoResources } from '../data/resources'
import './Dazibao.css'

interface DazibaoContent {
  id: number
  title: string
  content: string
  rotation: number
}

function generateDazibao(seed: number): DazibaoContent {
  const gen = new ContentGenerator(seed)
  
  // 选择人物
  const character = gen.selectFrom(dazibaoResources.characters)
  
  // 选择标题模板并填入人物
  const titleTemplate = gen.selectFrom(dazibaoResources.titles)
  const title = titleTemplate.replace('{}', character)
  
  // 选择正文模板并填入人物
  const contentTemplate = gen.selectFrom(dazibaoResources.contents)
  const content = contentTemplate.replace(/{}/g, character)
  
  // 生成随机角度：竖直±15度
  const rotation = gen.getRandom().nextFloat(-15, 15)
  
  return {
    id: seed,
    title,
    content,
    rotation,
  }
}

export function Dazibao() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentDazibao = generateDazibao(currentIndex)

  const scrollToPage = useCallback((direction: 'next' | 'prev') => {
    if (isScrolling) return
    
    setIsScrolling(true)
    setCurrentIndex(prev => direction === 'next' ? prev + 1 : Math.max(0, prev - 1))
    
    setTimeout(() => {
      setIsScrolling(false)
    }, 300)
  }, [isScrolling])

  // 键盘事件：上下键切换
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        scrollToPage(e.key === 'ArrowDown' ? 'next' : 'prev')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [scrollToPage])

  // 鼠标滚轮事件
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        scrollToPage('next')
      } else if (e.deltaY < 0) {
        scrollToPage('prev')
      }
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [scrollToPage])

  return (
    <div className="dazibao-container" ref={containerRef}>
      <div className="dazibao-page">
        <div 
          className={`dazibao-item ${isScrolling ? 'scrolling' : ''}`}
          style={{
            transform: `rotate(${currentDazibao.rotation}deg)`,
          }}
        >
          <div className="dazibao-title">
            {currentDazibao.title}
          </div>
          <div className="dazibao-content">
            {currentDazibao.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="dazibao-hint">
        使用 ↑↓ 键或鼠标滚轮切换大字报
      </div>
    </div>
  )
}
