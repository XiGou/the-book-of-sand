/**
 * 内容资源池
 * 所有页面共享的资源池定义
 */

import { worldCities, newsEvents } from './television'

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

