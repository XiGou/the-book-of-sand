import { useState, useEffect, useRef, useCallback } from 'react'
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

// Emoji场景组件
function EmojiScene({ videoType, seed }: { videoType: typeof douyinResources.videoTypes[number]; seed: number }) {
  const gen = new ContentGenerator(seed)
  
  // 为每个emoji添加随机偏移，使位置更自然
  const emojisWithOffset = videoType.emojis.map(emoji => ({
    ...emoji,
    x: emoji.x + gen.getRandom().nextFloat(-5, 5),
    y: emoji.y + gen.getRandom().nextFloat(-5, 5),
    size: emoji.size * gen.getRandom().nextFloat(0.9, 1.1), // 大小也有随机变化
  }))
  
  return (
    <div className="emoji-scene">
      {emojisWithOffset.map((item, index) => (
        <div
          key={index}
          className="emoji-item"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}rem`,
            transform: `translate(-50%, -50%) rotate(${gen.getRandom().nextFloat(-10, 10)}deg)`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  )
}

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
  const [videos, setVideos] = useState<VideoContent[]>(() => {
    return Array.from({ length: 3 }, (_, i) => generateVideoContent(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const currentVideo = videos[currentIndex]

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
    
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = direction === 'next' ? prev + 1 : Math.max(0, prev - 1)
        
        // 预加载更多视频
        if (newIndex >= videos.length - 1) {
          const newVideos = Array.from({ length: 2 }, (_, i) => 
            generateVideoContent(videos.length + i)
          )
          setVideos(prev => [...prev, ...newVideos])
        }
        
        return newIndex
      })
      
      setIsTransitioning(false)
    }, 300)
  }, [isTransitioning, videos.length])

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

  return (
    <div className="douyin-container" ref={containerRef}>
      <div 
        className={`douyin-video-wrapper ${isTransitioning ? 'transitioning' : ''}`}
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
        }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="douyin-video-item">
            <div className="douyin-video-content">
              <EmojiScene videoType={video.videoType} seed={video.id} />
              {video.newsText && <NewsText text={video.newsText} />}
              <div className="video-type-label">{video.videoType.name}</div>
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
