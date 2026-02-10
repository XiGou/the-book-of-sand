# 技术规划：无限内容生成系统

## 需求分析

1. **电视切换频道**：CSS 实现的频道切换动画，不同频道显示不同内容
2. **抖音**：短视频流，无限滚动，视频播放
3. **小红书**：图文流，卡片布局，无限滚动
4. **大字报**：大字报风格的内容展示，文字突出、排版特殊
5. **消费主义**：商品展示、广告流，无限商品列表
6. **核心目标**：有限资源 + 随机组合 = 真正的无限内容

## 技术栈推荐

### 🎯 **推荐方案：CSS + HTML + React（主要）**

**理由：**
- ✅ 性能优秀：CSS 动画由浏览器 GPU 加速，性能远超 JS 动画
- ✅ SEO 友好：HTML 内容可被搜索引擎索引
- ✅ 响应式好：CSS 天然支持响应式布局
- ✅ 维护简单：符合项目现有技术栈（React + CSS）
- ✅ 无障碍性好：屏幕阅读器可访问
- ✅ 文件体积小：无需引入大型库

**适用场景：**
- 电视切换频道动画（CSS `transform` + `transition`）
- 抖音/小红书无限滚动（CSS `scroll-snap` + React 虚拟列表）
- 卡片布局、图文混排
- 简单的视频播放（HTML5 `<video>`）

---

### 🎨 **Canvas（按需使用）**

**适用场景：**
- 复杂的图形生成（如随机图案、噪点效果）
- 像素级控制的内容渲染
- 动态生成的图像（如随机头像、背景）

**不推荐用于：**
- 主要 UI 布局（SEO 不友好）
- 文本内容展示（渲染复杂）
- 响应式布局（需要手动计算）

**推荐库：**
- `fabric.js` - 如果需要复杂的图形操作
- `konva.js` - 2D Canvas 库（React 版本：`react-konva`）

---

### 🚀 **WebGL（不推荐）**

**不推荐理由：**
- ❌ 过度设计：这些页面不需要 3D 效果
- ❌ 学习曲线陡峭
- ❌ 移动端性能问题
- ❌ 文件体积大

**仅当需要时考虑：**
- 3D 电视切换效果
- 复杂的粒子系统
- 3D 场景展示

**推荐库（如需要）：**
- `three.js` - 3D 库（React 版本：`@react-three/fiber`）
- `babylon.js` - 另一个 3D 引擎

---

## 具体实现方案

### 1. 电视切换频道

#### 技术选择：**纯 CSS + React**

**实现思路：**
```typescript
// 使用 CSS transform + transition 实现频道切换
// 每个频道是一个独立的组件，通过 CSS 控制显示/隐藏
```

**CSS 动画方案：**
- `transform: translateX()` - 水平滑动切换
- `transform: scale()` + `opacity` - 缩放淡入淡出
- `clip-path` - 裁剪动画（模拟 CRT 电视效果）

**推荐库：**
- **无需库**：CSS 动画足够
- 可选：`framer-motion`（如果需要更复杂的动画，但会增加体积）

**内容生成：**
```typescript
// 有限资源池
const channelTemplates = [
  { type: 'news', templates: [...] },
  { type: 'variety', templates: [...] },
  { type: 'drama', templates: [...] }
]

// 随机组合生成无限内容
function generateChannelContent(seed: number) {
  const template = channelTemplates[seed % channelTemplates.length]
  return combineRandomly(template)
}
```

---

### 2. 抖音（短视频流）

#### 技术选择：**CSS + React + HTML5 Video**

**实现思路：**
- 垂直无限滚动：CSS `scroll-snap-type: y mandatory`
- 视频播放：HTML5 `<video>` + React 控制
- 虚拟列表：只渲染可见区域（性能优化）

**推荐库：**
- `react-window` 或 `react-virtualized` - 虚拟滚动（按需）
- 如果内容不多，可以不用虚拟列表

**内容生成：**
```typescript
// 有限视频片段 + 随机组合
const videoSegments = [...] // 短视频片段
const audioTracks = [...]   // 音频轨道
const captions = [...]      // 字幕模板

function generateVideoContent(seed: number) {
  return {
    video: combineSegments(videoSegments, seed),
    audio: selectRandom(audioTracks, seed),
    caption: generateCaption(captions, seed)
  }
}
```

**CSS 实现：**
```css
.video-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

.video-item {
  scroll-snap-align: start;
  height: 100vh;
}
```

---

### 3. 小红书（图文流）

#### 技术选择：**CSS Grid + React**

**实现思路：**
- 瀑布流布局：CSS Grid 或 Flexbox（Grid 更灵活）
- 无限滚动：Intersection Observer API
- 图片懒加载：`loading="lazy"`

**推荐库：**
- **无需库**：CSS Grid 足够
- 可选：`react-intersection-observer` - 简化 Intersection Observer 使用

**内容生成：**
```typescript
// 有限图片 + 文本模板 + 随机组合
const imagePool = [...]      // 图片资源池
const textTemplates = [...]  // 文本模板
const layoutTemplates = [...] // 布局模板

function generatePost(seed: number) {
  return {
    images: selectRandom(imagePool, seed, count),
    text: combineTemplates(textTemplates, seed),
    layout: selectLayout(layoutTemplates, seed)
  }
}
```

**CSS 实现：**
```css
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
```

---

### 4. 大字报

#### 技术选择：**CSS Typography + React**

**实现思路：**
- 大字报风格：超大字体、粗体、红色/黑色对比
- 动态排版：文字大小、位置、旋转角度随机变化
- 无限滚动：垂直或水平滚动展示不同的大字报
- 文字生成：有限词汇 + 模板组合生成无限标语

**视觉特点：**
- 超大字体（`font-size: 4rem - 8rem`）
- 粗体（`font-weight: 900`）
- 高对比度（红色 `#ff0000` / 黑色 `#000000`）
- 手写风格字体（可选：`@font-face` 引入手写字体）
- 随机旋转角度（`transform: rotate(-2deg to 2deg)`）
- 纸张质感背景（`background-image` 或 CSS `filter`）

**推荐库：**
- **无需库**：CSS 足够实现
- 可选：`react-spring` - 如果需要复杂的动画效果（但会增加体积）

**内容生成：**
```typescript
// 大字报资源池
const dazibaoResources = {
  // 标语模板
  slogans: [
    '{action} {target}!',
    '坚决{action} {target}！',
    '{target}必须{action}！',
    '打倒{target}！',
    '支持{action}！'
  ],
  // 动作词汇
  actions: ['打倒', '支持', '批判', '拥护', '反对', '消灭'],
  // 目标词汇
  targets: ['敌人', '反动派', '资本主义', '修正主义', '帝国主义'],
  // 修饰词
  modifiers: ['彻底', '坚决', '完全', '永远', '绝对'],
  // 字体大小池
  fontSizes: ['4rem', '5rem', '6rem', '7rem', '8rem'],
  // 颜色池
  colors: ['#ff0000', '#000000', '#8b0000'],
  // 旋转角度池
  rotations: [-3, -2, -1, 0, 1, 2, 3]
}

function generateDazibao(seed: number) {
  const gen = new ContentGenerator(seed)
  const slogan = gen.selectFrom(dazibaoResources.slogans)
  const action = gen.selectFrom(dazibaoResources.actions)
  const target = gen.selectFrom(dazibaoResources.targets)
  const modifier = gen.selectFrom(dazibaoResources.modifiers)
  
  return {
    text: gen.generateText(slogan, { action, target, modifier }),
    fontSize: gen.selectFrom(dazibaoResources.fontSizes),
    color: gen.selectFrom(dazibaoResources.colors),
    rotation: gen.selectFrom(dazibaoResources.rotations),
    position: {
      x: gen.random.next() * 100, // 0-100%
      y: gen.random.next() * 100
    }
  }
}
```

**CSS 实现：**
```css
.dazibao-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background: #f5f5dc; /* 纸张色 */
  background-image: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
  min-height: 100vh;
}

.dazibao-item {
  position: relative;
  padding: 2rem;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 2px solid #333;
  break-inside: avoid;
}

.dazibao-text {
  font-weight: 900;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transform-origin: center;
  /* 手写风格效果 */
  text-shadow: 
    1px 1px 0 rgba(0,0,0,0.1),
    -1px -1px 0 rgba(255,255,255,0.1);
}

/* 随机旋转效果 */
.dazibao-text.rotate-1 { transform: rotate(1deg); }
.dazibao-text.rotate-2 { transform: rotate(2deg); }
.dazibao-text.rotate-3 { transform: rotate(3deg); }
.dazibao-text.rotate-neg-1 { transform: rotate(-1deg); }
.dazibao-text.rotate-neg-2 { transform: rotate(-2deg); }
.dazibao-text.rotate-neg-3 { transform: rotate(-3deg); }
```

**布局方案：**
- **方案 A（垂直滚动）**：单列布局，每张大字报占满宽度
- **方案 B（水平滚动）**：横向滚动，每张大字报占满高度
- **方案 C（网格布局）**：多张大字报并排展示

---

### 5. 消费主义（商品展示）

#### 技术选择：**CSS Grid + React + 图片懒加载**

**实现思路：**
- 商品卡片网格：类似电商网站的网格布局
- 无限商品流：Intersection Observer 触发加载更多
- 商品信息生成：有限商品模板 + 随机组合
- 价格、评分、标签等动态生成

**视觉特点：**
- 商品卡片：图片 + 标题 + 价格 + 评分
- 促销标签：`NEW`、`HOT`、`SALE`、`限时特价`
- 价格显示：原价 + 现价 + 折扣
- 评分星级：CSS 实现的星级显示
- 无限滚动：向下滚动自动加载更多商品

**推荐库：**
- **无需库**：CSS Grid + Intersection Observer 足够
- 可选：`react-intersection-observer` - 简化 Intersection Observer 使用

**内容生成：**
```typescript
// 消费主义资源池
const consumerismResources = {
  // 商品类别
  categories: [
    '智能手机', '笔记本电脑', '耳机', '手表', '相机',
    '运动鞋', 'T恤', '背包', '化妆品', '香水',
    '咖啡', '茶叶', '零食', '保健品', '图书'
  ],
  // 品牌池
  brands: [
    'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony',
    'Canon', 'Dior', 'Chanel', 'Starbucks', 'Nestle'
  ],
  // 商品名称模板
  productTemplates: [
    '{brand} {category} {model}',
    '{brand} {model} {category}',
    '{model} {category} - {brand}',
    '{brand} {feature} {category}'
  ],
  // 型号/特征
  models: ['Pro', 'Max', 'Ultra', 'Plus', 'Elite', 'Premium'],
  features: ['智能', '专业', '豪华', '经典', '限量'],
  // 价格范围（元）
  priceRanges: [
    { min: 99, max: 299 },
    { min: 299, max: 599 },
    { min: 599, max: 1299 },
    { min: 1299, max: 2999 },
    { min: 2999, max: 9999 }
  ],
  // 促销标签
  tags: ['NEW', 'HOT', 'SALE', '限时特价', '包邮', '秒杀'],
  // 评分范围
  ratingRange: { min: 3.5, max: 5.0 },
  // 评论数范围
  reviewCountRange: { min: 100, max: 50000 }
}

function generateProduct(seed: number) {
  const gen = new ContentGenerator(seed)
  const category = gen.selectFrom(consumerismResources.categories)
  const brand = gen.selectFrom(consumerismResources.brands)
  const model = gen.selectFrom(consumerismResources.models)
  const feature = gen.selectFrom(consumerismResources.features)
  const template = gen.selectFrom(consumerismResources.productTemplates)
  
  const priceRange = gen.selectFrom(consumerismResources.priceRanges)
  const originalPrice = Math.floor(
    gen.random.next() * (priceRange.max - priceRange.min) + priceRange.min
  )
  const discount = gen.random.next() < 0.3 ? gen.random.next() * 0.5 + 0.1 : 0 // 30% 概率有折扣
  const currentPrice = Math.floor(originalPrice * (1 - discount))
  
  const rating = (
    gen.random.next() * 
    (consumerismResources.ratingRange.max - consumerismResources.ratingRange.min) + 
    consumerismResources.ratingRange.min
  ).toFixed(1)
  
  const reviewCount = Math.floor(
    gen.random.next() * 
    (consumerismResources.reviewCountRange.max - consumerismResources.reviewCountRange.min) + 
    consumerismResources.reviewCountRange.min
  )
  
  return {
    name: gen.generateText(template, { brand, category, model, feature }),
    category,
    brand,
    originalPrice,
    currentPrice,
    discount: discount > 0 ? Math.floor(discount * 100) : 0,
    rating: parseFloat(rating),
    reviewCount,
    tag: gen.random.next() < 0.4 ? gen.selectFrom(consumerismResources.tags) : null,
    image: `product-${seed % 100}.jpg` // 假设有 100 张商品图片
  }
}
```

**CSS 实现：**
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background: #f5f5f5;
}

.product-info {
  padding: 1rem;
}

.product-name {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.current-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #e63946;
}

.original-price {
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background: #e63946;
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  width: 14px;
  height: 14px;
  background: #ddd;
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
}

.star.filled {
  background: #ffc107;
}

.product-tag {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ff6b6b;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 1;
}
```

**布局方案：**
- **网格布局**：响应式网格，自动调整列数
- **无限滚动**：Intersection Observer 检测最后一个商品，触发加载
- **图片懒加载**：使用 `loading="lazy"` 或 Intersection Observer

---

## 内容生成系统设计

### 核心原则：有限资源 + 确定性随机 = 无限内容

```typescript
// 伪随机数生成器（基于种子）
class SeededRandom {
  constructor(seed: number) {
    this.seed = seed
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

// 内容生成器
class ContentGenerator {
  private random: SeededRandom
  
  constructor(seed: number) {
    this.random = new SeededRandom(seed)
  }
  
  // 从资源池中随机选择
  selectFrom<T>(pool: T[]): T {
    return pool[Math.floor(this.random.next() * pool.length)]
  }
  
  // 组合多个资源
  combine<T>(pools: T[][]): T[] {
    return pools.map(pool => this.selectFrom(pool))
  }
  
  // 生成文本（模板 + 变量替换）
  generateText(template: string, variables: Record<string, string[]>): string {
    let result = template
    for (const [key, values] of Object.entries(variables)) {
      const value = this.selectFrom(values)
      result = result.replace(`{${key}}`, value)
    }
    return result
  }
}
```

### 资源池设计

```typescript
// 电视频道资源
const tvResources = {
  news: {
    anchors: ['主持人A', '主持人B', ...],
    topics: ['国际新闻', '国内新闻', ...],
    backgrounds: ['news-bg-1.jpg', ...]
  },
  variety: {
    hosts: ['主持人C', ...],
    games: ['游戏1', ...],
    music: ['音乐1', ...]
  }
}

// 抖音资源
const douyinResources = {
  videoSegments: ['segment1.mp4', ...],
  audioTracks: ['audio1.mp3', ...],
  effects: ['effect1', ...],
  captions: ['{emoji} {text}', ...]
}

// 小红书资源
const xiaohongshuResources = {
  images: ['img1.jpg', ...],
  titles: ['{emoji} {topic}分享', ...],
  content: ['今天来分享{product}...', ...],
  tags: ['#标签1', ...]
}

// 大字报资源
const dazibaoResources = {
  slogans: ['{action} {target}!', ...],
  actions: ['打倒', '支持', ...],
  targets: ['敌人', '反动派', ...],
  modifiers: ['彻底', '坚决', ...],
  fontSizes: ['4rem', '5rem', ...],
  colors: ['#ff0000', '#000000', ...],
  rotations: [-3, -2, -1, 0, 1, 2, 3]
}

// 消费主义资源
const consumerismResources = {
  categories: ['智能手机', '笔记本电脑', ...],
  brands: ['Apple', 'Samsung', ...],
  productTemplates: ['{brand} {category} {model}', ...],
  models: ['Pro', 'Max', ...],
  features: ['智能', '专业', ...],
  priceRanges: [{ min: 99, max: 299 }, ...],
  tags: ['NEW', 'HOT', 'SALE', ...],
  ratingRange: { min: 3.5, max: 5.0 },
  reviewCountRange: { min: 100, max: 50000 }
}
```

---

## 推荐的技术栈总结

| 页面 | 主要技术 | 辅助技术 | 是否需要库 |
|------|---------|---------|-----------|
| 电视切换 | CSS Transform | React State | ❌ 无需 |
| 抖音 | CSS Scroll Snap | HTML5 Video | ⚠️ 可选虚拟列表 |
| 小红书 | CSS Grid | Intersection Observer | ⚠️ 可选 Intersection Observer |
| 大字报 | CSS Typography | React State | ❌ 无需 |
| 消费主义 | CSS Grid | Intersection Observer | ⚠️ 可选 Intersection Observer |

### 最小依赖方案（推荐）

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 增强方案（按需添加）

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-intersection-observer": "^9.5.0",  // 简化 Intersection Observer
    "react-window": "^1.8.10"                  // 仅当内容很多时需要虚拟列表
  }
}
```

---

## 实现优先级

### Phase 1: 基础实现（CSS + React）
1. ✅ 电视切换频道 - CSS 动画
2. ✅ 抖音无限滚动 - CSS Scroll Snap
3. ✅ 小红书瀑布流 - CSS Grid
4. ✅ 大字报展示 - CSS Typography
5. ✅ 消费主义商品流 - CSS Grid

### Phase 2: 内容生成系统
1. ✅ 实现 SeededRandom 类
2. ✅ 实现 ContentGenerator 类
3. ✅ 创建资源池（图片、文本、模板）

### Phase 3: 性能优化（按需）
1. ⚠️ 虚拟列表（仅当内容很多时）
2. ⚠️ 图片懒加载
3. ⚠️ 视频预加载策略

---

## 总结

**最佳方案：CSS + React + 原生 JS API**

- ✅ 符合项目现有技术栈
- ✅ 性能优秀
- ✅ 文件体积小
- ✅ 易于维护
- ✅ 无需引入大型库

**仅在以下情况考虑 Canvas/WebGL：**
- 需要复杂的图形生成（如随机图案）
- 需要 3D 效果
- 需要像素级控制

**推荐库（按需）：**
- `react-intersection-observer` - 简化无限滚动检测
- `react-window` - 仅当内容非常多时需要虚拟列表
