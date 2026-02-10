/**
 * 内容资源池
 * 所有页面共享的资源池定义
 */

// 电视频道资源
export const tvResources = {
  news: {
    anchors: ['主持人A', '主持人B', '主持人C', '主持人D'],
    topics: ['国际新闻', '国内新闻', '财经新闻', '体育新闻', '科技新闻'],
    backgrounds: ['news-bg-1', 'news-bg-2', 'news-bg-3'],
  },
  variety: {
    hosts: ['主持人C', '主持人D', '主持人E'],
    games: ['猜谜游戏', '才艺展示', '互动环节'],
    music: ['流行音乐', '经典老歌', '民族音乐'],
  },
  drama: {
    titles: ['都市情感剧', '古装武侠剧', '现代悬疑剧'],
    actors: ['演员A', '演员B', '演员C'],
  },
}

// 抖音资源
export const douyinResources = {
  videoTypes: ['dance', 'comedy', 'food', 'travel', 'pet', 'tech'],
  audioTracks: ['audio-1', 'audio-2', 'audio-3', 'audio-4', 'audio-5'],
  effects: ['effect-1', 'effect-2', 'effect-3'],
  captions: [
    '{emoji} {text}',
    '{text} {emoji}',
    '{emoji} {text} {emoji}',
  ],
  emojis: ['🔥', '💯', '✨', '🎉', '❤️', '👍', '😍', '🤩'],
  captionTexts: [
    '太棒了！',
    '绝了！',
    '必须收藏',
    '学到了',
    '太真实了',
    '笑死我了',
    '太可爱了',
  ],
}

// 小红书资源
export const xiaohongshuResources = {
  topics: ['穿搭', '美妆', '美食', '旅行', '健身', '读书', '家居', '宠物'],
  titles: [
    '{emoji} {topic}分享',
    '{topic}好物推荐',
    '{emoji} {topic}心得',
    '{topic}避雷指南',
  ],
  contentTemplates: [
    '今天来分享{product}，真的太好用了！',
    '最近入手了{product}，性价比超高！',
    '{product}使用心得，姐妹们快来看！',
  ],
  products: ['这个', '那个', '它', '这款产品'],
  tags: ['#好物分享', '#种草', '#避雷', '#心得', '#推荐'],
  emojis: ['✨', '💕', '🌟', '🎀', '💖', '🌸'],
}

// 大字报资源
export const dazibaoResources = {
  slogans: [
    '{action} {target}!',
    '坚决{action} {target}！',
    '{target}必须{action}！',
    '打倒{target}！',
    '支持{action}！',
    '{modifier}{action}{target}！',
  ],
  actions: ['打倒', '支持', '批判', '拥护', '反对', '消灭', '推翻'],
  targets: ['敌人', '反动派', '资本主义', '修正主义', '帝国主义', '封建主义'],
  modifiers: ['彻底', '坚决', '完全', '永远', '绝对', '必须'],
  fontSizes: ['4rem', '5rem', '6rem', '7rem', '8rem'],
  colors: ['#ff0000', '#000000', '#8b0000'],
  rotations: [-3, -2, -1, 0, 1, 2, 3],
}

// 消费主义资源
export const consumerismResources = {
  categories: [
    '智能手机',
    '笔记本电脑',
    '耳机',
    '手表',
    '相机',
    '运动鞋',
    'T恤',
    '背包',
    '化妆品',
    '香水',
    '咖啡',
    '茶叶',
    '零食',
    '保健品',
    '图书',
  ],
  brands: [
    'Apple',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'Canon',
    'Dior',
    'Chanel',
    'Starbucks',
    'Nestle',
    'Uniqlo',
    'Zara',
    'Xiaomi',
    'Huawei',
    'Lenovo',
  ],
  productTemplates: [
    '{brand} {category} {model}',
    '{brand} {model} {category}',
    '{model} {category} - {brand}',
    '{brand} {feature} {category}',
  ],
  models: ['Pro', 'Max', 'Ultra', 'Plus', 'Elite', 'Premium', 'Classic'],
  features: ['智能', '专业', '豪华', '经典', '限量', '定制'],
  priceRanges: [
    { min: 99, max: 299 },
    { min: 299, max: 599 },
    { min: 599, max: 1299 },
    { min: 1299, max: 2999 },
    { min: 2999, max: 9999 },
  ],
  tags: ['NEW', 'HOT', 'SALE', '限时特价', '包邮', '秒杀'],
  ratingRange: { min: 3.5, max: 5.0 },
  reviewCountRange: { min: 100, max: 50000 },
}
