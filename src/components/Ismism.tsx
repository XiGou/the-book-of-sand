import { useState, useEffect, useCallback, useRef } from 'react'
import { isms } from '../data/isms'
import './Ismism.css'

export function Ismism() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set([0]))
  const containerRef = useRef<HTMLDivElement>(null)

  // 第一个固定显示索引0，后面的随机抽取
  const getNextIndex = useCallback(() => {
    if (currentIndex === 0) {
      // 从第一个切换到第二个时，随机选择一个未看过的
      const unseen = isms
        .map((_, i) => i)
        .filter(i => i !== 0 && !seenIndices.has(i))
      
      if (unseen.length === 0) {
        // 如果都看过了，重置（除了第一个）
        const allExceptFirst = isms.map((_, i) => i).filter(i => i !== 0)
        const randomIndex = allExceptFirst[Math.floor(Math.random() * allExceptFirst.length)]
        return randomIndex
      }
      
      const randomIndex = unseen[Math.floor(Math.random() * unseen.length)]
      return randomIndex
    } else {
      // 后续随机选择未看过的
      const unseen = isms
        .map((_, i) => i)
        .filter(i => i !== currentIndex && !seenIndices.has(i))
      
      if (unseen.length === 0) {
        // 如果都看过了，从所有（除了当前）中随机选择
        const allExceptCurrent = isms.map((_, i) => i).filter(i => i !== currentIndex)
        const randomIndex = allExceptCurrent[Math.floor(Math.random() * allExceptCurrent.length)]
        return randomIndex
      }
      
      const randomIndex = unseen[Math.floor(Math.random() * unseen.length)]
      return randomIndex
    }
  }, [currentIndex, seenIndices])

  const goNext = useCallback(() => {
    const nextIndex = getNextIndex()
    setCurrentIndex(nextIndex)
    setSeenIndices(prev => new Set([...prev, nextIndex]))
  }, [getNextIndex])

  const goPrev = useCallback(() => {
    // 返回上一个看过的，如果没有则返回第一个
    const seenArray = Array.from(seenIndices).sort((a, b) => a - b)
    const currentPos = seenArray.indexOf(currentIndex)
    if (currentPos > 0) {
      setCurrentIndex(seenArray[currentPos - 1])
    } else if (seenArray.length > 0) {
      setCurrentIndex(seenArray[0])
    }
  }, [currentIndex, seenIndices])

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const currentIsm = isms[currentIndex]

  return (
    <div className="ismism-container" ref={containerRef}>
      <div className="ismism-card">
        <div className="ismism-category">{currentIsm.category}</div>
        <h1 className="ismism-title">{currentIsm.name}</h1>
        <p className="ismism-description">{currentIsm.description}</p>
        <div className="ismism-navigation">
          <button 
            className="ismism-button ismism-button-prev"
            onClick={goPrev}
            aria-label="上一个"
          >
            ← 上一个
          </button>
          <span className="ismism-counter">
            {currentIndex + 1} / {isms.length}
          </span>
          <button 
            className="ismism-button ismism-button-next"
            onClick={goNext}
            aria-label="下一个"
          >
            下一个 →
          </button>
        </div>
        <div className="ismism-hint">
          使用方向键 ← → 或点击按钮切换
        </div>
      </div>
    </div>
  )
}
