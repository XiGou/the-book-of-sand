import { useState, useEffect, useRef } from 'react'
import { ContentGenerator } from '../lib/contentGenerator'
import { consumerismResources } from '../data/resources'
import './Consumerism.css'

interface AdSlogan {
  text: string
  fontSize: string
  fontWeight: string
  rotation: number
  top: string
  left: string
}

interface ProductContent {
  id: number
  name: string
  product: string
  brand: string
  emoji: string
  originalPrice: number
  currentPrice: number
  discount: number
  rating: number
  reviewCount: number
  tag: string | null
  adSlogans: AdSlogan[]
}

function generateProduct(seed: number): ProductContent {
  const gen = new ContentGenerator(seed)
  
  // 选择商品和品牌
  const product = gen.selectFrom(consumerismResources.products) as string
  const brand = gen.selectFrom(consumerismResources.brands) as string
  
  // 标题：品牌 + 商品
  const name = `${brand} ${product}`
  
  // 获取商品对应的emoji
  const emoji = (consumerismResources.productEmojis as Record<string, string>)[product] || '📦'
  
  // 生成价格
  const priceRange = gen.selectFrom(consumerismResources.priceRanges) as { min: number; max: number }
  const originalPrice = Math.floor(
    gen.getRandom().nextFloat(priceRange.min, priceRange.max)
  )
  const hasDiscount = gen.getRandom().next() < 0.3
  const discount = hasDiscount ? gen.getRandom().nextFloat(0.1, 0.5) : 0
  const currentPrice = Math.floor(originalPrice * (1 - discount))
  
  // 生成评分
  const rating = parseFloat(
    gen.getRandom().nextFloat(
      consumerismResources.ratingRange.min,
      consumerismResources.ratingRange.max
    ).toFixed(1)
  )
  
  // 生成评论数
  const reviewCount = Math.floor(
    gen.getRandom().nextFloat(
      consumerismResources.reviewCountRange.min,
      consumerismResources.reviewCountRange.max
    )
  )
  
  // 生成标签
  const tag = gen.getRandom().next() < 0.4 
    ? (gen.selectFrom(consumerismResources.tags) as string)
    : null
  
  // 生成广告词（2-4条）
  const adCount = gen.getRandom().nextInt(2, 4)
  const adSlogans: AdSlogan[] = []
  for (let i = 0; i < adCount; i++) {
    const sloganText = gen.selectFrom(consumerismResources.adSlogans) as string
    const fontSize = gen.selectFrom(consumerismResources.adFontSizes) as string
    const fontWeight = gen.selectFrom(consumerismResources.adFontWeights) as string
    const rotation = gen.getRandom().nextFloat(-15, 15) // 随机角度
    const top = `${gen.getRandom().nextFloat(10, 90)}%` // 随机位置
    const left = `${gen.getRandom().nextFloat(5, 95)}%`
    
    adSlogans.push({
      text: sloganText,
      fontSize,
      fontWeight,
      rotation,
      top,
      left,
    })
  }
  
  return {
    id: seed,
    name,
    product,
    brand,
    emoji,
    originalPrice,
    currentPrice,
    discount: discount > 0 ? Math.floor(discount * 100) : 0,
    rating,
    reviewCount,
    tag,
    adSlogans,
  }
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${i < fullStars ? 'filled' : i === fullStars && hasHalfStar ? 'half' : ''}`}
        />
      ))}
    </div>
  )
}

export function Consumerism() {
  const [products, setProducts] = useState<ProductContent[]>(() => {
    return Array.from({ length: 12 }, (_, i) => generateProduct(i))
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    const newProducts = Array.from({ length: 6 }, (_, i) => 
      generateProduct(products.length + i)
    )
    setProducts(prev => [...prev, ...newProducts])
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

    const lastProduct = container.querySelector('.product-card:last-child')
    if (lastProduct) {
      observer.observe(lastProduct)
    }

    return () => observer.disconnect()
  }, [products.length])

  return (
    <div className="consumerism-container" ref={containerRef}>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.tag && (
              <div className="product-tag">{product.tag}</div>
            )}
            <div
              className="product-image"
              style={{
                background: `linear-gradient(135deg, ${getRandomColor(product.id)}, ${getRandomColor(product.id + 100)})`,
              }}
            >
              <div className="product-emoji">{product.emoji}</div>
              {/* 广告词 */}
              {product.adSlogans.map((ad, index) => (
                <div
                  key={index}
                  className="ad-slogan"
                  style={{
                    fontSize: ad.fontSize,
                    fontWeight: ad.fontWeight,
                    transform: `rotate(${ad.rotation}deg)`,
                    top: ad.top,
                    left: ad.left,
                  }}
                >
                  {ad.text}
                </div>
              ))}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="current-price">¥{product.currentPrice}</span>
                {product.discount > 0 && (
                  <>
                    <span className="original-price">¥{product.originalPrice}</span>
                    <span className="discount-badge">-{product.discount}%</span>
                  </>
                )}
              </div>
              <div className="product-rating">
                <StarRating rating={product.rating} />
                <span className="rating-value">{product.rating}</span>
                <span className="review-count">({product.reviewCount})</span>
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
