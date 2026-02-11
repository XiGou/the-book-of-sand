import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { 
  worldCities, 
  channelTypes, 
  newsEvents, 
  dramas, 
  varietyShows 
} from '../data/television'
import { useSwipeGesture } from '../lib/useSwipeGesture'
import './Television.css'

type ChannelType = 'news' | 'variety' | 'drama'

interface Channel {
  id: number
  city: string
  type: ChannelType
  name: string
}

interface ChannelContent {
  type: ChannelType
  title: string
  content: string
  background: string
}

// 生成频道（城市 + 类型）
function generateChannel(seed: number): Channel {
  const gen = new ContentGenerator(seed)
  const city = gen.selectFrom(worldCities)
  const type = gen.selectFrom(['news', 'variety', 'drama'] as ChannelType[])
  const typeName = channelTypes[type]
  
  return {
    id: seed,
    city,
    type,
    name: `${city}${typeName}频道`,
  }
}

// 生成频道内容
function generateChannelContent(channel: Channel): ChannelContent {
  const gen = new ContentGenerator(channel.id)
  let title = ''
  let content = ''
  
  if (channel.type === 'news') {
    // 新闻：城市 + 新闻事件
    const event = gen.selectFrom(newsEvents)
    title = `${channel.city}${channelTypes.news} - ${event}`
    content = `【${channel.city}消息】今日${channel.city}发生${event}事件。\n\n据现场记者报道，事件发生后，相关部门迅速赶到现场处理。目前具体情况正在进一步调查中。\n\n本台将持续关注事件进展，为您带来最新报道。`
  } else if (channel.type === 'variety') {
    // 综艺：随机选择一种综艺类型和描述
    const varietyTypes = Object.keys(varietyShows)
    const varietyType = gen.selectFrom(varietyTypes)
    const descriptions = varietyShows[varietyType as keyof typeof varietyShows]
    const description = gen.selectFrom(descriptions)
    
    title = `${channel.city}${channelTypes.variety} - ${varietyType}`
    content = `【${varietyType}节目】\n\n${description}\n\n${channel.city}${channelTypes.variety}为您带来精彩内容，敬请收看。`
  } else {
    // 电视剧：从连续剧列表中随机选择
    const drama = gen.selectFrom(dramas)
    title = `${channel.city}${channelTypes.drama} - ${drama.name}`
    content = `【正在热播】${drama.name}\n\n${drama.summary}\n\n${channel.city}${channelTypes.drama}每晚黄金时段播出，欢迎收看。`
  }
  
  return {
    type: channel.type,
    title,
    content,
    background: `tv-bg-${channel.type}-${channel.id % 3 + 1}`,
  }
}

export function Television() {
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // 存储每个索引对应的随机seed，确保每次前进时随机，返回时保持一致
  const seedCacheRef = useRef<Map<number, number>>(new Map())
  
  // 获取或生成当前索引的随机seed
  const getSeedForIndex = useCallback((index: number): number => {
    if (!seedCacheRef.current.has(index)) {
      // 生成一个完全随机的seed（使用大范围的随机数）
      const randomSeed = Math.floor(Math.random() * 1000000000) + index * 7919
      seedCacheRef.current.set(index, randomSeed)
    }
    return seedCacheRef.current.get(index)!
  }, [])
  
  // 使用缓存的seed生成频道和内容
  const currentSeed = useMemo(() => getSeedForIndex(currentChannelIndex), [currentChannelIndex, getSeedForIndex])
  const currentChannel = useMemo(() => generateChannel(currentSeed), [currentSeed])
  const content = useMemo(() => generateChannelContent(currentChannel), [currentChannel])

  // 换台：切换到下一个频道
  const changeChannel = useCallback((direction: 'next' | 'prev' = 'next') => {
    if (isChanging) return
    
    setIsChanging(true)
    setCurrentChannelIndex(prevIndex => {
      const newIndex = direction === 'next' ? prevIndex + 1 : prevIndex - 1
      
      // 使用setTimeout确保状态更新后再生成内容
      setTimeout(() => {
        setIsChanging(false)
      }, 300)
      
      return newIndex
    })
  }, [isChanging])

  // 键盘快捷键：上下键换台
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        changeChannel(e.key === 'ArrowDown' ? 'next' : 'prev')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeChannel])

  useSwipeGesture({
    targetRef: containerRef,
    onSwipeUp: () => changeChannel('next'),
    onSwipeDown: () => changeChannel('prev'),
  })

  return (
    <div className="television-container" ref={containerRef}>
      <div className="television-screen">
        <div className={`tv-content ${isChanging ? 'changing' : ''}`}>
          <div className="tv-channel-info">
            <div className="tv-channel-number">CH {currentChannelIndex + 1}</div>
            <div className="tv-channel-name">{currentChannel.name}</div>
          </div>
          <div className="tv-main-content">
            <h2 className="tv-title">{content.title}</h2>
            <div className="tv-text-content">
              {content.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <div className="tv-scan-line"></div>
        </div>
      </div>
      
      <div className="tv-controls">
        <button
          className="tv-channel-btn"
          onClick={() => changeChannel('prev')}
          disabled={isChanging}
        >
          ⬆ 上一个频道
        </button>
        <div className="tv-channel-info-display">
          <div className="tv-current-channel">
            {currentChannel.name}
          </div>
          <div className="tv-channel-hint">
            使用 ↑↓ 键、上下滑动或按钮切换频道
          </div>
        </div>
        <button
          className="tv-channel-btn"
          onClick={() => changeChannel('next')}
          disabled={isChanging}
        >
          ⬇ 下一个频道
        </button>
      </div>
    </div>
  )
}
