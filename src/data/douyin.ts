import { worldCities, newsEvents } from './television'

/**
 * 抖音资源数据
 */
// 抖音标题（100个）
export const douyinTitles = [
  '太震撼了！', '绝了！', '必须收藏', '学到了', '太真实了',
  '笑死我了', '太可爱了', '这是什么神仙操作', '太厉害了', '绝绝子',
  'yyds', '破防了', '绝了绝了', '太牛了', '这是什么神仙',
  '太强了', '太棒了', '太赞了', '太厉害了', '太绝了',
  '这是什么操作', '太神奇了', '太好玩了', '太有趣了', '太搞笑了',
  '这是什么神仙', '太美了', '太帅了', '太酷了', '太飒了',
  '这是什么神仙颜值', '太甜了', '太暖了', '太治愈了', '太感动了',
  '这是什么神仙爱情', '太浪漫了', '太幸福了', '太美好了', '太完美了',
  '这是什么神仙生活', '太羡慕了', '太向往了', '太想去了', '太想拥有了',
  '这是什么神仙美食', '太香了', '太诱人了', '太想吃了', '太馋了',
  '这是什么神仙穿搭', '太时尚了', '太有范了', '太有气质了', '太有品味了',
  '这是什么神仙技能', '太专业了', '太厉害了', '太牛了', '太强了',
  '这是什么神仙创意', '太有才了', '太有想法了', '太有创意了', '太有想象力了',
  '这是什么神仙表演', '太精彩了', '太震撼了', '太惊艳了', '太绝了',
  '这是什么神仙音乐', '太好听了', '太治愈了', '太感动了', '太有感觉了',
  '这是什么神仙舞蹈', '太美了', '太优雅了', '太有力量了', '太有感染力了',
  '这是什么神仙风景', '太美了', '太壮观了', '太震撼了', '太想去了',
  '这是什么神仙动物', '太可爱了', '太萌了', '太有趣了', '太治愈了',
  '这是什么神仙瞬间', '太美好了', '太感动了', '太温暖了', '太治愈了',
  '这是什么神仙时刻', '太珍贵了', '太美好了', '太幸福了', '太完美了',
]

// 视频类型和emoji场景组合（110个）
// 格式：{ type: 类型名, name: 显示名称, description: 描述文本, emojis: [{ emoji: 'emoji', x: 位置%, y: 位置%, size: 大小rem }], useText: 是否使用新闻文本（可选） }
export const douyinVideoTypes = [
  // 荒野求生类
  { type: 'survival', name: '荒野求生', description: '几个人在荒野中探索', emojis: [
    { emoji: '⛰️', x: 50, y: 50, size: 9 },
    { emoji: '🧑', x: 30, y: 60, size: 2 },
    { emoji: '🧑', x: 70, y: 60, size: 2 },
    { emoji: '🌲', x: 20, y: 30, size: 2.5 },
    { emoji: '🌲', x: 80, y: 30, size: 2.5 },
  ]},
  { type: 'camping', name: '露营', description: '夜晚在野外露营', emojis: [
    { emoji: '⛺', x: 50, y: 50, size: 9 },
    { emoji: '🔥', x: 50, y: 65, size: 2 },
    { emoji: '🌙', x: 50, y: 20, size: 2 },
    { emoji: '⭐', x: 30, y: 15, size: 1.5 },
    { emoji: '⭐', x: 70, y: 15, size: 1.5 },
  ]},
  { type: 'hiking', name: '徒步', description: '几个人在山上徒步', emojis: [
    { emoji: '🏔️', x: 50, y: 40, size: 9 },
    { emoji: '🚶', x: 40, y: 70, size: 2 },
    { emoji: '🚶', x: 60, y: 70, size: 2 },
    { emoji: '🌄', x: 50, y: 25, size: 9 },
  ]},
  
  // 新闻类（使用地名+事件）
  { type: 'news', name: '新闻', description: '新闻播报现场', emojis: [
    { emoji: '📰', x: 50, y: 30, size: 9 },
    { emoji: '📺', x: 30, y: 50, size: 2 },
    { emoji: '📺', x: 70, y: 50, size: 2 },
    { emoji: '📡', x: 50, y: 70, size: 2 },
  ], useText: true },
  { type: 'breaking', name: '突发新闻', description: '突发新闻紧急播报', emojis: [
    { emoji: '🚨', x: 50, y: 40, size: 9 },
    { emoji: '📢', x: 30, y: 60, size: 2 },
    { emoji: '📢', x: 70, y: 60, size: 2 },
  ], useText: true },
  { type: 'xinhua', name: '新华社', description: '新华社新闻发布', emojis: [
    { emoji: '📰', x: 50, y: 40, size: 9 },
    { emoji: '🏛️', x: 50, y: 65, size: 2 },
  ], useText: true },
  { type: 'people', name: '人民日报', description: '人民日报新闻报道', emojis: [
    { emoji: '📰', x: 50, y: 40, size: 9 },
    { emoji: '🇨🇳', x: 50, y: 65, size: 2 },
  ], useText: true },
  
  // 美食类
  { type: 'food', name: '美食', description: '一碗热气腾腾的面条', emojis: [
    { emoji: '🍜', x: 50, y: 50, size: 9 },
    { emoji: '🥢', x: 40, y: 50, size: 1.5 },
    { emoji: '🥢', x: 60, y: 50, size: 1.5 },
    { emoji: '🍲', x: 30, y: 70, size: 2 },
    { emoji: '🍲', x: 70, y: 70, size: 2 },
  ]},
  { type: 'cooking', name: '烹饪', description: '厨师在厨房做菜', emojis: [
    { emoji: '👨‍🍳', x: 50, y: 50, size: 9 },
    { emoji: '🍳', x: 40, y: 60, size: 2 },
    { emoji: '🥘', x: 60, y: 60, size: 2 },
    { emoji: '🔥', x: 50, y: 75, size: 1.5 },
  ]},
  { type: 'restaurant', name: '探店', description: '在餐厅品尝美食', emojis: [
    { emoji: '🍽️', x: 50, y: 50, size: 9 },
    { emoji: '🍕', x: 30, y: 40, size: 2 },
    { emoji: '🍔', x: 70, y: 40, size: 2 },
    { emoji: '🍰', x: 30, y: 70, size: 2 },
    { emoji: '🍰', x: 70, y: 70, size: 2 },
  ]},
  
  // 旅行类
  { type: 'travel', description: '一个人在旅行', name: '旅行', emojis: [
    { emoji: '✈️', x: 50, y: 40, size: 9 },
    { emoji: '🌍', x: 50, y: 60, size: 9 },
    { emoji: '🗺️', x: 30, y: 50, size: 2 },
    { emoji: '📸', x: 70, y: 50, size: 2 },
  ]},
  { type: 'beach', description: '几个人在海滩', name: '海滩', emojis: [
    { emoji: '🏖️', x: 50, y: 60, size: 9 },
    { emoji: '🌊', x: 50, y: 40, size: 9 },
    { emoji: '☀️', x: 50, y: 20, size: 2 },
    { emoji: '🏖️', x: 30, y: 70, size: 1.5 },
    { emoji: '🏖️', x: 70, y: 70, size: 1.5 },
  ]},
  { type: 'mountain', description: '几个人在登山', name: '登山', emojis: [
    { emoji: '⛰️', x: 50, y: 45, size: 9 },
    { emoji: '🧗', x: 45, y: 55, size: 2 },
    { emoji: '🧗', x: 55, y: 55, size: 2 },
    { emoji: '☁️', x: 50, y: 25, size: 2 },
  ]},
  
  // 舞蹈类
  { type: 'dance', name: '舞蹈', description: '一个女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🎵', x: 30, y: 40, size: 1.5 },
    { emoji: '🎵', x: 70, y: 40, size: 1.5 },
    { emoji: '🎤', x: 50, y: 30, size: 2 },
  ]},
  { type: 'hiphop', name: '街舞', description: '一个人在跳街舞', emojis: [
    { emoji: '🕺', x: 50, y: 50, size: 9 },
    { emoji: '🎧', x: 40, y: 40, size: 2 },
    { emoji: '🎧', x: 60, y: 40, size: 2 },
    { emoji: '💿', x: 50, y: 70, size: 2 },
  ]},
  
  // 访谈类
  { type: 'interview', description: '两个人在访谈', name: '访谈', emojis: [
    { emoji: '🎤', x: 50, y: 40, size: 9 },
    { emoji: '👤', x: 40, y: 55, size: 2.5 },
    { emoji: '👤', x: 60, y: 55, size: 2.5 },
    { emoji: '📺', x: 50, y: 70, size: 2 },
  ]},
  { type: 'talk', description: '一个人在说脱口秀', name: '脱口秀', emojis: [
    { emoji: '🎭', x: 50, y: 45, size: 9 },
    { emoji: '🎤', x: 50, y: 60, size: 2 },
    { emoji: '👥', x: 30, y: 70, size: 2 },
    { emoji: '👥', x: 70, y: 70, size: 2 },
  ]},
  
  // 摆摊类
  { type: 'stall', description: '一个人在摆摊', name: '摆摊', emojis: [
    { emoji: '🛒', x: 50, y: 50, size: 9 },
    { emoji: '💰', x: 30, y: 40, size: 1.5 },
    { emoji: '💰', x: 70, y: 40, size: 1.5 },
    { emoji: '📦', x: 30, y: 70, size: 2 },
    { emoji: '📦', x: 70, y: 70, size: 2 },
  ]},
  { type: 'market', description: '几个人在集市', name: '集市', emojis: [
    { emoji: '🏪', x: 50, y: 50, size: 9 },
    { emoji: '🛍️', x: 30, y: 50, size: 2 },
    { emoji: '🛍️', x: 70, y: 50, size: 2 },
    { emoji: '👥', x: 50, y: 70, size: 2 },
  ]},
  
  // 其他类型
  { type: 'pet', description: '一只宠物', name: '宠物', emojis: [
    { emoji: '🐕', x: 50, y: 50, size: 9 },
    { emoji: '🐱', x: 30, y: 50, size: 2 },
    { emoji: '🐹', x: 70, y: 50, size: 2 },
    { emoji: '🦴', x: 50, y: 70, size: 1.5 },
  ]},
  { type: 'fitness', description: '一个人在健身', name: '健身', emojis: [
    { emoji: '💪', x: 50, y: 50, size: 9 },
    { emoji: '🏋️', x: 40, y: 60, size: 2 },
    { emoji: '🏋️', x: 60, y: 60, size: 2 },
    { emoji: '🔥', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'gaming', description: '一个人在打游戏', name: '游戏', emojis: [
    { emoji: '🎮', x: 50, y: 50, size: 9 },
    { emoji: '🕹️', x: 40, y: 50, size: 2 },
    { emoji: '🕹️', x: 60, y: 50, size: 2 },
    { emoji: '🎯', x: 50, y: 70, size: 2 },
  ]},
  { type: 'music', description: '一个人在演奏音乐', name: '音乐', emojis: [
    { emoji: '🎵', x: 50, y: 50, size: 9 },
    { emoji: '🎸', x: 30, y: 50, size: 2 },
    { emoji: '🎹', x: 70, y: 50, size: 2 },
    { emoji: '🎤', x: 50, y: 70, size: 2 },
  ]},
  { type: 'fashion', description: '一个人在展示时尚', name: '时尚', emojis: [
    { emoji: '👗', x: 50, y: 50, size: 9 },
    { emoji: '👠', x: 30, y: 60, size: 2 },
    { emoji: '👠', x: 70, y: 60, size: 2 },
    { emoji: '💄', x: 50, y: 30, size: 2 },
  ]},
  { type: 'beauty', description: '一个人在化妆', name: '美妆', emojis: [
    { emoji: '💄', x: 50, y: 50, size: 9 },
    { emoji: '💋', x: 30, y: 50, size: 2 },
    { emoji: '💋', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'comedy', description: '一个人在搞笑', name: '搞笑', emojis: [
    { emoji: '😂', x: 50, y: 50, size: 9 },
    { emoji: '🤣', x: 30, y: 50, size: 2 },
    { emoji: '🤣', x: 70, y: 50, size: 2 },
    { emoji: '🎭', x: 50, y: 30, size: 2 },
  ]},
  { type: 'education', description: '一个人在学习教育', name: '教育', emojis: [
    { emoji: '📚', x: 50, y: 50, size: 9 },
    { emoji: '✏️', x: 30, y: 50, size: 2 },
    { emoji: '📝', x: 70, y: 50, size: 2 },
    { emoji: '🎓', x: 50, y: 30, size: 2 },
  ]},
  { type: 'tech', description: '一个人在展示科技', name: '科技', emojis: [
    { emoji: '💻', x: 50, y: 50, size: 9 },
    { emoji: '📱', x: 30, y: 50, size: 2 },
    { emoji: '⌚', x: 70, y: 50, size: 2 },
    { emoji: '🚀', x: 50, y: 30, size: 2 },
  ]},
  { type: 'sports', description: '一个人在运动', name: '运动', emojis: [
    { emoji: '⚽', x: 50, y: 50, size: 9 },
    { emoji: '🏀', x: 30, y: 50, size: 2 },
    { emoji: '🏐', x: 70, y: 50, size: 2 },
    { emoji: '🏆', x: 50, y: 30, size: 2 },
  ]},
  { type: 'car', description: '一辆汽车', name: '汽车', emojis: [
    { emoji: '🚗', x: 50, y: 50, size: 9 },
    { emoji: '🛣️', x: 50, y: 70, size: 2 },
    { emoji: '⛽', x: 30, y: 60, size: 2 },
    { emoji: '🏁', x: 70, y: 60, size: 2 },
  ]},
  { type: 'home', description: '一个家居场景', name: '家居', emojis: [
    { emoji: '🏠', x: 50, y: 50, size: 9 },
    { emoji: '🛋️', x: 30, y: 60, size: 2 },
    { emoji: '🛏️', x: 70, y: 60, size: 2 },
    { emoji: '💡', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'art', description: '一个人在创作艺术', name: '艺术', emojis: [
    { emoji: '🎨', x: 50, y: 50, size: 9 },
    { emoji: '🖼️', x: 30, y: 50, size: 2 },
    { emoji: '🖼️', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'nature', description: '一个自然场景', name: '自然', emojis: [
    { emoji: '🌳', x: 50, y: 50, size: 9 },
    { emoji: '🌲', x: 30, y: 50, size: 2 },
    { emoji: '🌲', x: 70, y: 50, size: 2 },
    { emoji: '🦋', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'weather', description: '一个天气场景', name: '天气', emojis: [
    { emoji: '☀️', x: 50, y: 40, size: 9 },
    { emoji: '☁️', x: 30, y: 30, size: 2 },
    { emoji: '☁️', x: 70, y: 30, size: 2 },
    { emoji: '🌈', x: 50, y: 60, size: 2 },
  ]},
  { type: 'night', description: '一个夜景', name: '夜景', emojis: [
    { emoji: '🌙', x: 50, y: 30, size: 9 },
    { emoji: '⭐', x: 30, y: 20, size: 1.5 },
    { emoji: '⭐', x: 70, y: 20, size: 1.5 },
    { emoji: '🌃', x: 50, y: 60, size: 9 },
  ]},
  { type: 'wedding', description: '一个婚礼场景', name: '婚礼', emojis: [
    { emoji: '💒', x: 50, y: 50, size: 9 },
    { emoji: '💑', x: 50, y: 60, size: 2 },
    { emoji: '💐', x: 30, y: 50, size: 2 },
    { emoji: '💐', x: 70, y: 50, size: 2 },
  ]},
  { type: 'birthday', description: '一个生日场景', name: '生日', emojis: [
    { emoji: '🎂', x: 50, y: 50, size: 9 },
    { emoji: '🎉', x: 30, y: 40, size: 2 },
    { emoji: '🎉', x: 70, y: 40, size: 2 },
    { emoji: '🎈', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'party', description: '一个派对场景', name: '派对', emojis: [
    { emoji: '🎊', x: 50, y: 50, size: 9 },
    { emoji: '🎉', x: 30, y: 50, size: 2 },
    { emoji: '🎉', x: 70, y: 50, size: 2 },
    { emoji: '🥳', x: 50, y: 70, size: 2 },
  ]},
  { type: 'work', description: '一个人在工作', name: '工作', emojis: [
    { emoji: '💼', x: 50, y: 50, size: 9 },
    { emoji: '📊', x: 30, y: 50, size: 2 },
    { emoji: '📈', x: 70, y: 50, size: 2 },
    { emoji: '💻', x: 50, y: 70, size: 2 },
  ]},
  { type: 'study', description: '一个人在学习', name: '学习', emojis: [
    { emoji: '📖', x: 50, y: 50, size: 9 },
    { emoji: '✏️', x: 30, y: 50, size: 2 },
    { emoji: '📝', x: 70, y: 50, size: 2 },
    { emoji: '💡', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'shopping', description: '一个人在购物', name: '购物', emojis: [
    { emoji: '🛍️', x: 50, y: 50, size: 9 },
    { emoji: '🛒', x: 30, y: 50, size: 2 },
    { emoji: '💰', x: 70, y: 50, size: 2 },
    { emoji: '💳', x: 50, y: 70, size: 2 },
  ]},
  { type: 'health', description: '一个人在健身', name: '健康', emojis: [
    { emoji: '💚', x: 50, y: 50, size: 9 },
    { emoji: '🥗', x: 30, y: 50, size: 2 },
    { emoji: '🏃', x: 70, y: 50, size: 2 },
    { emoji: '💪', x: 50, y: 70, size: 2 },
  ]},
  { type: 'yoga', description: '一个人在练瑜伽', name: '瑜伽', emojis: [
    { emoji: '🧘', x: 50, y: 50, size: 9 },
    { emoji: '🧘‍♀️', x: 30, y: 50, size: 2 },
    { emoji: '🧘‍♂️', x: 70, y: 50, size: 2 },
    { emoji: '🕉️', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meditation', description: '一个人在冥想', name: '冥想', emojis: [
    { emoji: '🧘', x: 50, y: 50, size: 9 },
    { emoji: '🕯️', x: 30, y: 50, size: 2 },
    { emoji: '🕯️', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'reading', description: '一个人在阅读', name: '阅读', emojis: [
    { emoji: '📚', x: 50, y: 50, size: 9 },
    { emoji: '📖', x: 30, y: 50, size: 2 },
    { emoji: '📖', x: 70, y: 50, size: 2 },
    { emoji: '☕', x: 50, y: 70, size: 2 },
  ]},
  { type: 'coffee', description: '一个人在喝咖啡', name: '咖啡', emojis: [
    { emoji: '☕', x: 50, y: 50, size: 9 },
    { emoji: '🥐', x: 30, y: 50, size: 2 },
    { emoji: '🍰', x: 70, y: 50, size: 2 },
    { emoji: '💭', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'sunset', description: '一个日落场景', name: '日落', emojis: [
    { emoji: '🌅', x: 50, y: 50, size: 9 },
    { emoji: '🌇', x: 50, y: 60, size: 9 },
    { emoji: '☀️', x: 50, y: 30, size: 2 },
  ]},
  { type: 'ocean', description: '一个海洋场景', name: '海洋', emojis: [
    { emoji: '🌊', x: 50, y: 50, size: 9 },
    { emoji: '🐋', x: 30, y: 50, size: 2 },
    { emoji: '🐬', x: 70, y: 50, size: 2 },
    { emoji: '⛵', x: 50, y: 30, size: 2 },
  ]},
  { type: 'forest', description: '一个森林场景', name: '森林', emojis: [
    { emoji: '🌲', x: 50, y: 50, size: 9 },
    { emoji: '🌳', x: 30, y: 50, size: 2 },
    { emoji: '🌳', x: 70, y: 50, size: 2 },
    { emoji: '🦌', x: 50, y: 70, size: 2 },
  ]},
  { type: 'city', description: '一个城市场景', name: '城市', emojis: [
    { emoji: '🏙️', x: 50, y: 50, size: 9 },
    { emoji: '🏢', x: 30, y: 50, size: 2 },
    { emoji: '🏢', x: 70, y: 50, size: 2 },
    { emoji: '🚗', x: 50, y: 70, size: 2 },
  ]},
  { type: 'countryside', description: '一个乡村场景', name: '乡村', emojis: [
    { emoji: '🌾', x: 50, y: 50, size: 9 },
    { emoji: '🚜', x: 30, y: 60, size: 2 },
    { emoji: '🐄', x: 70, y: 60, size: 2 },
    { emoji: '🌻', x: 50, y: 30, size: 2 },
  ]},
  
  // 网络烂梗类（30个）
  { type: 'meme1', description: '一个人在说yyds', name: 'yyds', emojis: [
    { emoji: '🔥', x: 50, y: 50, size: 9 },
    { emoji: '💯', x: 30, y: 40, size: 2 },
    { emoji: '💯', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme2', description: '一个人破防了', name: '破防了', emojis: [
    { emoji: '😭', x: 50, y: 50, size: 9 },
    { emoji: '💔', x: 30, y: 50, size: 2 },
    { emoji: '💔', x: 70, y: 50, size: 2 },
    { emoji: '😢', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme3', description: '一个人在说绝绝子', name: '绝绝子', emojis: [
    { emoji: '👏', x: 50, y: 50, size: 9 },
    { emoji: '🎉', x: 30, y: 40, size: 2 },
    { emoji: '🎊', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme4', description: '一个人在说栓Q', name: '栓Q', emojis: [
    { emoji: '🙏', x: 50, y: 50, size: 9 },
    { emoji: '😅', x: 30, y: 50, size: 2 },
    { emoji: '😅', x: 70, y: 50, size: 2 },
    { emoji: '💦', x: 50, y: 70, size: 1.5 },
  ]},
  { type: 'meme5', description: '一个人在说芭比Q了', name: '芭比Q了', emojis: [
    { emoji: '🔥', x: 50, y: 50, size: 9 },
    { emoji: '💀', x: 30, y: 50, size: 2 },
    { emoji: '💀', x: 70, y: 50, size: 2 },
    { emoji: '😱', x: 50, y: 30, size: 2 },
  ]},
  { type: 'meme6', description: '一个人真的会谢', name: '我真的会谢', emojis: [
    { emoji: '🙄', x: 50, y: 50, size: 9 },
    { emoji: '😑', x: 30, y: 50, size: 2 },
    { emoji: '😑', x: 70, y: 50, size: 2 },
    { emoji: '💭', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme7', description: '一个人在摆烂', name: '摆烂', emojis: [
    { emoji: '🛌', x: 50, y: 50, size: 9 },
    { emoji: '😴', x: 30, y: 50, size: 2 },
    { emoji: '😴', x: 70, y: 50, size: 2 },
    { emoji: '💤', x: 50, y: 70, size: 1.5 },
  ]},
  { type: 'meme8', description: '一个人在躺平', name: '躺平', emojis: [
    { emoji: '🛏️', x: 50, y: 50, size: 9 },
    { emoji: '😌', x: 30, y: 50, size: 2 },
    { emoji: '😌', x: 70, y: 50, size: 2 },
    { emoji: '🌙', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme9', description: '一个人在内卷', name: '内卷', emojis: [
    { emoji: '📚', x: 50, y: 50, size: 9 },
    { emoji: '💻', x: 30, y: 50, size: 2 },
    { emoji: '💻', x: 70, y: 50, size: 2 },
    { emoji: '🔥', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme10', description: '一个人社死了', name: '社死', emojis: [
    { emoji: '😳', x: 50, y: 50, size: 9 },
    { emoji: '🙈', x: 30, y: 50, size: 2 },
    { emoji: '🙈', x: 70, y: 50, size: 2 },
    { emoji: '💀', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme11', description: '一个人在emo', name: 'emo', emojis: [
    { emoji: '😔', x: 50, y: 50, size: 9 },
    { emoji: '🌙', x: 30, y: 40, size: 2 },
    { emoji: '⭐', x: 70, y: 40, size: 1.5 },
    { emoji: '💔', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme12', description: '一个人蚌埠住了', name: '蚌埠住了', emojis: [
    { emoji: '😂', x: 50, y: 50, size: 9 },
    { emoji: '🤣', x: 30, y: 50, size: 2 },
    { emoji: '🤣', x: 70, y: 50, size: 2 },
    { emoji: '💦', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme13', description: '一个人在夺笋', name: '夺笋', emojis: [
    { emoji: '🎋', x: 50, y: 50, size: 9 },
    { emoji: '😏', x: 30, y: 50, size: 2 },
    { emoji: '😏', x: 70, y: 50, size: 2 },
    { emoji: '😈', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme14', description: '一个人在说YYDS', name: 'YYDS', emojis: [
    { emoji: '👑', x: 50, y: 50, size: 9 },
    { emoji: '🏆', x: 30, y: 50, size: 2 },
    { emoji: '🏆', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme15', description: '一个打工人', name: '打工人', emojis: [
    { emoji: '💼', x: 50, y: 50, size: 9 },
    { emoji: '☕', x: 30, y: 50, size: 2 },
    { emoji: '💻', x: 70, y: 50, size: 2 },
    { emoji: '😫', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme16', description: '一个干饭人', name: '干饭人', emojis: [
    { emoji: '🍚', x: 50, y: 50, size: 9 },
    { emoji: '🍜', x: 30, y: 50, size: 2 },
    { emoji: '🍲', x: 70, y: 50, size: 2 },
    { emoji: '😋', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme17', description: '一个人在凡尔赛', name: '凡尔赛', emojis: [
    { emoji: '👑', x: 50, y: 50, size: 9 },
    { emoji: '💎', x: 30, y: 40, size: 2 },
    { emoji: '💎', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 70, size: 1.5 },
  ]},
  { type: 'meme18', description: '一个社牛', name: '社牛', emojis: [
    { emoji: '😎', x: 50, y: 50, size: 9 },
    { emoji: '🎤', x: 30, y: 50, size: 2 },
    { emoji: '🎉', x: 70, y: 50, size: 2 },
    { emoji: '🔥', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme19', description: '一个社恐', name: '社恐', emojis: [
    { emoji: '😰', x: 50, y: 50, size: 9 },
    { emoji: '🙈', x: 30, y: 50, size: 2 },
    { emoji: '😅', x: 70, y: 50, size: 2 },
    { emoji: '💦', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme20', description: '一个人在PUA', name: 'PUA', emojis: [
    { emoji: '😈', x: 50, y: 50, size: 9 },
    { emoji: '💭', x: 30, y: 50, size: 2 },
    { emoji: '🎭', x: 70, y: 50, size: 2 },
    { emoji: '😏', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme21', description: '一个人在CPU', name: 'CPU', emojis: [
    { emoji: '💻', x: 50, y: 50, size: 9 },
    { emoji: '🧠', x: 30, y: 50, size: 2 },
    { emoji: '⚙️', x: 70, y: 50, size: 2 },
    { emoji: '💡', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme22', description: '一个人在KTV', name: 'KTV', emojis: [
    { emoji: '🎤', x: 50, y: 50, size: 9 },
    { emoji: '🎵', x: 30, y: 40, size: 2 },
    { emoji: '🎵', x: 70, y: 40, size: 2 },
    { emoji: '🎉', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme23', description: '一个小孩在乱跳', name: '整活', emojis: [
    { emoji: '🎭', x: 50, y: 50, size: 9 },
    { emoji: '🎪', x: 30, y: 50, size: 2 },
    { emoji: '🎨', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme24', description: '一个小孩在乱跳', name: '整活2', emojis: [
    { emoji: '🤹', x: 50, y: 50, size: 9 },
    { emoji: '🎪', x: 30, y: 40, size: 2 },
    { emoji: '🎨', x: 70, y: 40, size: 2 },
    { emoji: '🎉', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme25', description: '一个小孩在乱跳', name: '整活3', emojis: [
    { emoji: '🎬', x: 50, y: 50, size: 9 },
    { emoji: '📹', x: 30, y: 50, size: 2 },
    { emoji: '🎥', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme26', description: '一个小孩在乱跳', name: '整活4', emojis: [
    { emoji: '🎪', x: 50, y: 50, size: 9 },
    { emoji: '🎭', x: 30, y: 50, size: 2 },
    { emoji: '🎨', x: 70, y: 50, size: 2 },
    { emoji: '🎉', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme27', description: '一个小孩在乱跳', name: '整活5', emojis: [
    { emoji: '🎨', x: 50, y: 50, size: 9 },
    { emoji: '🖌️', x: 30, y: 50, size: 2 },
    { emoji: '🎭', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme28', description: '一个小孩在乱跳', name: '整活6', emojis: [
    { emoji: '🎪', x: 50, y: 50, size: 9 },
    { emoji: '🤹', x: 30, y: 50, size: 2 },
    { emoji: '🎭', x: 70, y: 50, size: 2 },
    { emoji: '🎉', x: 50, y: 70, size: 2 },
  ]},
  { type: 'meme29', description: '一个小孩在乱跳', name: '整活7', emojis: [
    { emoji: '🎬', x: 50, y: 50, size: 9 },
    { emoji: '📽️', x: 30, y: 50, size: 2 },
    { emoji: '🎥', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'meme30', description: '一个小孩在乱跳', name: '整活8', emojis: [
    { emoji: '🎭', x: 50, y: 50, size: 9 },
    { emoji: '🎪', x: 30, y: 40, size: 2 },
    { emoji: '🎨', x: 70, y: 40, size: 2 },
    { emoji: '🎉', x: 50, y: 70, size: 2 },
  ]},
  
  // 软色情擦边跳舞类（30个）
  { type: 'dance1', name: '热舞', description: '一个衣衫不整的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🔥', x: 30, y: 40, size: 2 },
    { emoji: '🔥', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance2', name: '性感舞', description: '一个性感的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💋', x: 30, y: 50, size: 2 },
    { emoji: '💋', x: 70, y: 50, size: 2 },
    { emoji: '💄', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance3', name: '擦边舞', description: '一个女人在跳擦边舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '👠', x: 30, y: 60, size: 2 },
    { emoji: '👠', x: 70, y: 60, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance4', name: '诱惑舞', description: '一个诱惑的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌹', x: 30, y: 40, size: 2 },
    { emoji: '🌹', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance5', name: '魅惑舞', description: '一个魅惑的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💫', x: 30, y: 40, size: 2 },
    { emoji: '💫', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance6', name: '撩人舞', description: '一个撩人的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '👀', x: 30, y: 50, size: 2 },
    { emoji: '👀', x: 70, y: 50, size: 2 },
    { emoji: '💋', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance7', name: '妩媚舞', description: '一个妩媚的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💄', x: 30, y: 50, size: 2 },
    { emoji: '💄', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance8', name: '妖娆舞', description: '一个妖娆的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌺', x: 30, y: 40, size: 2 },
    { emoji: '🌺', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance9', name: '风情舞', description: '一个风情的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💐', x: 30, y: 40, size: 2 },
    { emoji: '💐', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance10', name: '迷人舞', description: '一个迷人的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💎', x: 30, y: 50, size: 2 },
    { emoji: '💎', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance11', name: '热辣舞', description: '一个热辣的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🔥', x: 30, y: 40, size: 2 },
    { emoji: '🔥', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance12', name: '火辣舞', description: '一个火辣的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌶️', x: 30, y: 50, size: 2 },
    { emoji: '🌶️', x: 70, y: 50, size: 2 },
    { emoji: '🔥', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance13', name: '激情舞', description: '一个激情的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '❤️', x: 30, y: 40, size: 2 },
    { emoji: '❤️', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance14', name: '动感舞', description: '一个动感的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🎵', x: 30, y: 40, size: 2 },
    { emoji: '🎵', x: 70, y: 40, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance15', name: '节奏舞', description: '一个女人在跳节奏舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🥁', x: 30, y: 50, size: 2 },
    { emoji: '🎸', x: 70, y: 50, size: 2 },
    { emoji: '🎵', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance16', name: '摇摆舞', description: '一个女人在跳摇摆舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🎤', x: 30, y: 40, size: 2 },
    { emoji: '🎤', x: 70, y: 40, size: 2 },
    { emoji: '🎵', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance17', name: '律动舞', description: '一个女人在跳律动舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🎧', x: 30, y: 50, size: 2 },
    { emoji: '🎧', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance18', name: '活力舞', description: '一个活力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '⚡', x: 30, y: 40, size: 2 },
    { emoji: '⚡', x: 70, y: 40, size: 2 },
    { emoji: '🔥', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance19', name: '魅力舞', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💫', x: 30, y: 50, size: 2 },
    { emoji: '💫', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance20', name: '魅力舞2', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌟', x: 30, y: 40, size: 2 },
    { emoji: '🌟', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance21', name: '魅力舞3', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💎', x: 30, y: 50, size: 2 },
    { emoji: '💎', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance22', name: '魅力舞4', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '👑', x: 30, y: 40, size: 2 },
    { emoji: '👑', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance23', name: '魅力舞5', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌹', x: 30, y: 50, size: 2 },
    { emoji: '🌹', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance24', name: '魅力舞6', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '💐', x: 30, y: 40, size: 2 },
    { emoji: '💐', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance25', name: '魅力舞7', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌸', x: 30, y: 50, size: 2 },
    { emoji: '🌸', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance26', name: '魅力舞8', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌺', x: 30, y: 40, size: 2 },
    { emoji: '🌺', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance27', name: '魅力舞9', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌷', x: 30, y: 50, size: 2 },
    { emoji: '🌷', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance28', name: '魅力舞10', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌻', x: 30, y: 40, size: 2 },
    { emoji: '🌻', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
  { type: 'dance29', name: '魅力舞11', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌼', x: 30, y: 50, size: 2 },
    { emoji: '🌼', x: 70, y: 50, size: 2 },
    { emoji: '✨', x: 50, y: 30, size: 1.5 },
  ]},
  { type: 'dance30', name: '魅力舞12', description: '一个魅力的女人在跳舞', emojis: [
    { emoji: '💃', x: 50, y: 50, size: 9 },
    { emoji: '🌸', x: 30, y: 40, size: 2 },
    { emoji: '🌸', x: 70, y: 40, size: 2 },
    { emoji: '💋', x: 50, y: 70, size: 2 },
  ]},
]

export const douyinResources = {
  titles: douyinTitles,
  videoTypes: douyinVideoTypes,
  worldCities: worldCities,
  newsEvents: newsEvents,
  audioTracks: ['audio-1', 'audio-2', 'audio-3', 'audio-4', 'audio-5'],
  effects: ['effect-1', 'effect-2', 'effect-3'],
  emojis: ['🔥', '💯', '✨', '🎉', '❤️', '👍', '😍', '🤩'],
}
