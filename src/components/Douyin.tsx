import { useState, useEffect, useRef } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { douyinResources } from '../data/resources'
import './Douyin.css'

interface VideoContent {
  id: number
  type: string
  caption: string
  emoji: string
}

function generateVideoContent(seed: number): VideoContent {
  const gen = new ContentGenerator(seed)
  const type = gen.selectFrom(douyinResources.videoTypes)
  const emoji = gen.selectFrom(douyinResources.emojis)
  const captionText = gen.selectFrom(douyinResources.captionTexts)
  const template = gen.selectFrom(douyinResources.captions)
  
  const caption = gen.generateText(template, {
    emoji: [emoji],
    text: [captionText],
  })
  
  return {
    id: seed,
    type,
    caption,
    emoji,
  }
}

export function Douyin() {
  const [videos, setVideos] = useState<VideoContent[]>(() => {
    return Array.from({ length: 10 }, (_, i) => generateVideoContent(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    const newVideos = Array.from({ length: 5 }, (_, i) => 
      generateVideoContent(videos.length + i)
    )
    setVideos(prev => [...prev, ...newVideos])
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollHeight - scrollTop - clientHeight < 100) {
        loadMore()
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [videos.length])

  return (
    <div className="douyin-container" ref={containerRef}>
      {videos.map((video) => (
        <div key={video.id} className="douyin-video-item">
          <div className="douyin-video-wrapper">
            <div className={`douyin-video-animation video-type-${video.type}`}>
              <div className="video-pattern"></div>
            </div>
            <div className="douyin-video-overlay">
              <div className="douyin-caption">{video.caption}</div>
              <div className="douyin-actions">
                <div className="douyin-action-btn">
                  <span className="action-icon">❤️</span>
                  <span className="action-count">{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="douyin-action-btn">
                  <span className="action-icon">💬</span>
                  <span className="action-count">{Math.floor(Math.random() * 1000)}</span>
                </div>
                <div className="douyin-action-btn">
                  <span className="action-icon">🔗</span>
                  <span className="action-count">{Math.floor(Math.random() * 500)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
