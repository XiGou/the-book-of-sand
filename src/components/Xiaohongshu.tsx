import { useState, useEffect, useRef } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { xiaohongshuResources } from '../data/resources'
import './Xiaohongshu.css'

interface ImageStyle {
  scale: number
  rotation: number
  overlayText: string | null
}

interface PostContent {
  id: number
  title: string
  content: string
  topic: string
  tags: string[]
  emoji: string
  imageCount: number
  imageStyles: ImageStyle[]
}

function generatePost(seed: number): PostContent {
  const gen = new ContentGenerator(seed)
  const topic = gen.selectFrom(xiaohongshuResources.topics)
  const emoji = gen.selectFrom(xiaohongshuResources.emojis)
  const titleTemplate = gen.selectFrom(xiaohongshuResources.titles)
  const contentTemplate = gen.selectFrom(xiaohongshuResources.contentTemplates)
  const product = gen.selectFrom(xiaohongshuResources.products)
  
  const title = gen.generateText(titleTemplate, { emoji: [emoji], topic: [topic] })
  const content = gen.generateText(contentTemplate, { product: [product] })
  
  const tags = gen.selectMultiple(xiaohongshuResources.tags, gen.getRandom().nextInt(2, 4))
  
  const imageCount = gen.getRandom().nextInt(1, 4)
  
  // 为每个图片生成样式：缩放、倾斜、叠加词句
  const imageStyles: ImageStyle[] = []
  for (let i = 0; i < imageCount; i++) {
    const imageSeed = seed + i * 1000
    const imageGen = new ContentGenerator(imageSeed)
    
    // 缩放：0.8-1.2倍
    const scale = imageGen.getRandom().nextFloat(0.8, 1.2)
    
    // 倾斜：-15到15度
    const rotation = imageGen.getRandom().nextFloat(-15, 15)
    
    // 30%概率叠加词句
    const hasOverlayText = imageGen.getRandom().next() < 0.3
    const overlayText = hasOverlayText 
      ? imageGen.selectFrom(xiaohongshuResources.internetSlang)
      : null
    
    imageStyles.push({
      scale,
      rotation,
      overlayText,
    })
  }
  
  return {
    id: seed,
    title,
    content,
    topic,
    tags,
    emoji,
    imageCount,
    imageStyles,
  }
}

export function Xiaohongshu() {
  const [posts, setPosts] = useState<PostContent[]>(() => {
    return Array.from({ length: 12 }, (_, i) => generatePost(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    const newPosts = Array.from({ length: 6 }, (_, i) => 
      generatePost(posts.length + i)
    )
    setPosts(prev => [...prev, ...newPosts])
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

    const lastPost = container.querySelector('.xiaohongshu-post:last-child')
    if (lastPost) {
      observer.observe(lastPost)
    }

    return () => observer.disconnect()
  }, [posts.length])

  return (
    <div className="xiaohongshu-container" ref={containerRef}>
      <div className="xiaohongshu-grid">
        {posts.map((post) => (
          <div key={post.id} className="xiaohongshu-post">
            <div className="post-images">
              {Array.from({ length: post.imageCount }).map((_, i) => {
                const imageStyle = post.imageStyles[i]
                return (
                  <div
                    key={i}
                    className={`post-image image-${i + 1}`}
                    style={{
                      background: `linear-gradient(135deg, ${getRandomColor(post.id + i)}, ${getRandomColor(post.id + i + 100)})`,
                    }}
                  >
                    <div 
                      className="image-placeholder"
                      style={{
                        transform: `scale(${imageStyle.scale}) rotate(${imageStyle.rotation}deg)`,
                      }}
                    >
                      {post.emoji}
                    </div>
                    {imageStyle.overlayText && (
                      <div className="overlay-text">
                        {imageStyle.overlayText}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-text">{post.content}</p>
              <div className="post-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="post-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getRandomColor(seed: number): string {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731',
    '#a55eea', '#26de81', '#fd79a8', '#fdcb6e',
    '#6c5ce7', '#00b894', '#e17055', '#74b9ff',
  ]
  return colors[seed % colors.length]
}
