import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { douyinResources } from '../data/resources'
import './Douyin.css'

interface VideoContent {
  id: number
  videoType: typeof douyinResources.videoTypes[number]
  title: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  newsText?: string // 新闻类的大字文本
}

// 简单的彩色像素背景组件 - 使用memo避免不必要的重新渲染
const PixelBackground = memo(function PixelBackground({ seed }: { seed: number }) {
  const gen = new ContentGenerator(seed)
  const gridSize = 15 // 减少到15x15的像素网格，提升性能
  
  // 使用useMemo缓存像素块数据，避免每次渲染都重新计算
  const pixelBlocks = useMemo(() => {
    return Array.from({ length: gridSize * gridSize }, (_, i) => {
      const hue = (gen.getRandom().nextInt(0, 360) + i * 10) % 360
      const delay = gen.getRandom().nextFloat(0, 2)
      return {
        key: i,
        hue,
        delay,
      }
    })
  }, [seed])
  
  return (
    <div className="pixel-background">
      {pixelBlocks.map(({ key, hue, delay }) => (
        <div
          key={key}
          className="pixel-block"
          style={{
            background: `hsl(${hue}, 70%, 50%)`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  )
})

function generateVideoContent(seed: number): VideoContent {
  const gen = new ContentGenerator(seed)
  const videoType = gen.selectFrom(douyinResources.videoTypes)
  const title = gen.selectFrom(douyinResources.titles)
  
  // 生成互动数据
  const likes = gen.getRandom().nextInt(100, 99999)
  const comments = gen.getRandom().nextInt(10, 9999)
  const shares = gen.getRandom().nextInt(5, 999)
  const isLiked = gen.getRandom().next() < 0.3 // 30%概率已点赞
  
  // 如果是新闻类，生成地名+事件的大字文本
  let newsText: string | undefined
  if (videoType.useText) {
    const city = gen.selectFrom(douyinResources.worldCities)
    const event = gen.selectFrom(douyinResources.newsEvents)
    newsText = `${city}${event}`
  }
  
  return {
    id: seed,
    videoType,
    title,
    likes,
    comments,
    shares,
    isLiked,
    newsText,
  }
}

// Emoji场景组件 - 使用memo和useMemo优化性能
const EmojiScene = memo(function EmojiScene({ videoType, seed }: { videoType: typeof douyinResources.videoTypes[number]; seed: number }) {
  const gen = new ContentGenerator(seed)
  
  // 使用useMemo缓存emoji偏移计算，避免每次渲染都重新计算
  const emojisWithOffset = useMemo(() => {
    return videoType.emojis.map((emoji, index) => {
      const random = gen.getRandom()
      return {
        ...emoji,
        x: emoji.x + random.nextFloat(-5, 5),
        y: emoji.y + random.nextFloat(-5, 5),
        size: emoji.size * random.nextFloat(0.9, 1.1),
        rotation: random.nextFloat(-10, 10),
        key: index,
      }
    })
  }, [videoType.emojis, seed])
  
  return (
    <div className="emoji-scene">
      {emojisWithOffset.map((item) => (
        <div
          key={item.key}
          className="emoji-item"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
})

// 新闻大字文本组件
function NewsText({ text }: { text: string }) {
  return (
    <div className="news-text">
      {text}
    </div>
  )
}

export function Douyin() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [containerHeight, setContainerHeight] = useState(0)
  const [videos, setVideos] = useState<VideoContent[]>(() => {
    return Array.from({ length: 3 }, (_, i) => generateVideoContent(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // 监听容器高度变化
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight)
      }
    }
    
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const formatCount = (count: number): string => {
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}w`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const changeVideo = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    
    // 使用requestAnimationFrame来批量更新，减少reflow
    requestAnimationFrame(() => {
      setCurrentIndex(prev => {
        const newIndex = direction === 'next' ? prev + 1 : Math.max(0, prev - 1)
        
        // 预加载更多视频（当接近末尾时）
        setVideos(currentVideos => {
          if (newIndex >= currentVideos.length - 2) {
            const newVideos = Array.from({ length: 3 }, (_, i) => 
              generateVideoContent(currentVideos.length + i)
            )
            return [...currentVideos, ...newVideos]
          }
          return currentVideos
        })
        
        return newIndex
      })
      
      // 延迟重置transition状态，确保动画完成
      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    })
  }, [isTransitioning])

  // 键盘事件
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        changeVideo(e.key === 'ArrowDown' ? 'next' : 'prev')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeVideo])

  // 鼠标滚轮事件
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        changeVideo('next')
      } else if (e.deltaY < 0) {
        changeVideo('prev')
      }
    }
    
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [changeVideo])

  // 使用useMemo缓存transform值，避免每次渲染都重新计算
  // wrapper高度是videos.length * containerHeight（像素值）
  // 每个item高度是containerHeight（calc(100vh - var(--nav-height, 7rem))）
  // transform移动currentIndex个item = currentIndex * containerHeight
  const wrapperStyle = useMemo(() => {
    if (containerHeight > 0 && videos.length > 0) {
      // 使用像素值：wrapper总高度是videos.length * containerHeight
      // 每个item高度是containerHeight
      // 移动currentIndex个item = currentIndex * containerHeight
      return {
        height: `${videos.length * containerHeight}px`,
        transform: `translateY(-${currentIndex * containerHeight}px)`,
      }
    }
    // 如果container高度还未计算，使用百分比作为fallback
    return {
      height: `${videos.length * 100}%`,
      transform: `translateY(calc(-${currentIndex} * 100% / ${videos.length}))`,
    }
  }, [currentIndex, videos.length, containerHeight])

  return (
    <div className="douyin-container" ref={containerRef}>
      <div 
        ref={wrapperRef}
        className={`douyin-video-wrapper ${isTransitioning ? 'transitioning' : ''}`}
        style={wrapperStyle}
      >
        {videos.map((video) => (
          <div key={video.id} className="douyin-video-item">
            <div className="douyin-video-content">
              <PixelBackground seed={video.id} />
              <EmojiScene videoType={video.videoType} seed={video.id} />
              {video.newsText && <NewsText text={video.newsText} />}
              <div className="video-type-label">{video.videoType.name}</div>
              {video.videoType.description && (
                <div className="video-description">{video.videoType.description}</div>
              )}
            </div>
            <div className="douyin-video-overlay">
              <div className="douyin-title">{video.title}</div>
            </div>
            <div className="douyin-side-actions">
              <div className={`douyin-action-btn ${video.isLiked ? 'liked' : ''}`}>
                <span className="action-icon">{video.isLiked ? '❤️' : '🤍'}</span>
                <span className="action-count">{formatCount(video.likes)}</span>
              </div>
              <div className="douyin-action-btn">
                <span className="action-icon">💬</span>
                <span className="action-count">{formatCount(video.comments)}</span>
              </div>
              <div className="douyin-action-btn">
                <span className="action-icon">🔗</span>
                <span className="action-count">{formatCount(video.shares)}</span>
              </div>
              <div className={`douyin-action-btn ${video.isLiked ? 'liked' : ''}`}>
                <span className="action-icon">⭐</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
