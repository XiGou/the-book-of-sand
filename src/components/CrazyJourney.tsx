import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { destinations, sloganTemplates, type Destination } from '../data/crazyJourney'
import { useSwipeGesture } from '../lib/useSwipeGesture'
import './CrazyJourney.css'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function fillSlogan(template: string, destinationName: string): string {
  return template.replace(/xxx/g, destinationName).replace(/xx/g, destinationName)
}

// 生成随机样式配置
function generateRandomTitleStyle(seed: number) {
  const rng = (n: number) => {
    const x = Math.sin(seed * n) * 10000
    return x - Math.floor(x)
  }

  // 随机颜色（明亮、饱和的颜色）
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C',
    '#3498DB', '#2ECC71', '#E67E22', '#9B59B6', '#1ABC9C'
  ]
  const color = colors[Math.floor(rng(1) * colors.length)]

  // 随机字体大小 (3rem - 5rem)，移动端自动缩放
  const baseFontSize = 3 + rng(2) * 2
  const fontSize = `${baseFontSize}rem`

  // 随机边框宽度 (2px - 8px)
  const borderWidth = 2 + Math.floor(rng(3) * 7)

  // 随机边框颜色（与主色相近或对比）
  const borderColors = [
    color,
    '#FFFFFF',
    '#000000',
    '#333333',
    '#666666',
    color + 'CC', // 较不透明
  ]
  const borderColor = borderColors[Math.floor(rng(4) * borderColors.length)]

  // 随机边框样式
  const borderStyles = ['solid', 'double', 'dashed']
  const borderStyle = borderStyles[Math.floor(rng(5) * borderStyles.length)]

  return {
    color,
    fontSize,
    borderWidth: `${borderWidth}px`,
    borderColor,
    borderStyle,
    fontWeight: rng(6) > 0.5 ? 700 : 600,
    letterSpacing: `${rng(7) * 0.1}em`,
  }
}

export function CrazyJourney() {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [slogan, setSlogan] = useState<string>('')
  const [styleSeed, setStyleSeed] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const drawNext = useCallback(() => {
    const dest = pickRandom(destinations)
    const template = pickRandom(sloganTemplates)
    setDestination(dest)
    setSlogan(fillSlogan(template, dest.name))
    setStyleSeed(Math.random() * 10000)
  }, [])

  const titleStyle = useMemo(() => {
    return generateRandomTitleStyle(styleSeed)
  }, [styleSeed])

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

  useSwipeGesture({
    targetRef: containerRef,
    onSwipeLeft: drawNext,
    onSwipeRight: drawNext,
    onSwipeUp: drawNext,
    onSwipeDown: drawNext,
  })

  if (!destination) {
    return (
      <div className="crazy-journey-container" ref={containerRef}>
        <div className="crazy-journey-poster">加载中…</div>
      </div>
    )
  }

  return (
    <div className="crazy-journey-container" ref={containerRef}>
      <div className="crazy-journey-poster">
        {/* 顶部：地区信息 */}
        <div className="crazy-journey-location">
          {destination.country} · {destination.continent} · {destination.type}
        </div>

        {/* 中间：名称（随机样式） */}
        <div className="crazy-journey-title-wrapper">
          <h1 className="crazy-journey-title" style={titleStyle}>
            {destination.name}
          </h1>
        </div>

        {/* 介绍：常规正文布局 */}
        <div className="crazy-journey-intro">
          {destination.intro}
        </div>

        {/* 底部：蓝色路牌背景的slogan */}
        <div className="crazy-journey-sign-wrapper">
          <div className="crazy-journey-slogan-sign">
            <span className="crazy-journey-arrow-left">←</span>
            <span className="crazy-journey-slogan-text">{slogan}</span>
            <span className="crazy-journey-arrow-right">→</span>
          </div>
          <div className="crazy-journey-sign-pole"></div>
        </div>

        {/* 操作提示 */}
        <div className="crazy-journey-hint">
          方向键、空格或滑动也可换一站
        </div>
      </div>
    </div>
  )
}
