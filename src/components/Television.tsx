import { useState, useEffect } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { tvResources } from '../data/resources'
import './Television.css'

type ChannelType = 'news' | 'variety' | 'drama'

interface ChannelContent {
  type: ChannelType
  title: string
  content: string
  background: string
}

function generateChannelContent(seed: number, type: ChannelType): ChannelContent {
  const gen = new ContentGenerator(seed)
  const resources = tvResources[type]
  
  let title = ''
  let content = ''
  
  if (type === 'news') {
    title = `新闻频道 - ${gen.selectFrom(resources.topics)}`
    content = `主持人：${gen.selectFrom(resources.anchors)}\n\n${gen.selectFrom(resources.topics)}正在播出...`
  } else if (type === 'variety') {
    title = `综艺频道 - ${gen.selectFrom(resources.games)}`
    content = `主持人：${gen.selectFrom(resources.hosts)}\n\n${gen.selectFrom(resources.games)}正在进行中...`
  } else {
    title = `电视剧频道 - ${gen.selectFrom(resources.titles)}`
    content = `正在播出：${gen.selectFrom(resources.titles)}\n主演：${gen.selectFrom(resources.actors)}`
  }
  
  return {
    type,
    title,
    content,
    background: `tv-bg-${type}-${seed % 3 + 1}`,
  }
}

export function Television() {
  const [currentChannel, setCurrentChannel] = useState<ChannelType>('news')
  const [isChanging, setIsChanging] = useState(false)
  const [content, setContent] = useState<ChannelContent>(() => generateChannelContent(0, 'news'))
  const [channelIndex, setChannelIndex] = useState(0)

  const channels: ChannelType[] = ['news', 'variety', 'drama']
  const channelNames = {
    news: '新闻',
    variety: '综艺',
    drama: '电视剧',
  }

  const changeChannel = (newChannel: ChannelType) => {
    if (newChannel === currentChannel || isChanging) return
    
    setIsChanging(true)
    setTimeout(() => {
      const newIndex = channelIndex + 1
      setChannelIndex(newIndex)
      setContent(generateChannelContent(newIndex, newChannel))
      setCurrentChannel(newChannel)
      setIsChanging(false)
    }, 300)
  }

  // 自动切换频道
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = channels.indexOf(currentChannel) + 1
      const nextChannel = channels[nextIndex % channels.length]
      changeChannel(nextChannel)
    }, 10000) // 每10秒自动切换

    return () => clearInterval(interval)
  }, [currentChannel])

  return (
    <div className="television-container">
      <div className="television-screen">
        <div className={`tv-content ${isChanging ? 'changing' : ''}`}>
          <div className="tv-channel-info">
            <div className="tv-channel-number">CH {channels.indexOf(currentChannel) + 1}</div>
            <div className="tv-channel-name">{channelNames[currentChannel]}</div>
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
        {channels.map((channel, index) => (
          <button
            key={channel}
            className={`tv-channel-btn ${currentChannel === channel ? 'active' : ''}`}
            onClick={() => changeChannel(channel)}
          >
            CH{index + 1} {channelNames[channel]}
          </button>
        ))}
      </div>
    </div>
  )
}
