import axios from './axios'

// 导航类文章列表页 /content/article/article/list
export const getNavContentList = (params) => axios.post('/content/article/article/list', params)

// 导航类文章banner /content/article/category/banner
export const getNavContentBanner = (params) => axios.post('/content/article/category/banner', params)

// 导航类文章列表页-筛选表头 /content/article/article/list/top
export const getNavContentListTop = () => axios.get('/content/article/article/list/top')

// 文章内容详细页 /content/article/detailed/article/content
export const getArticleContent = (params) => axios.post('/content/article/detailed/article/content', params)

// 点赞 /content/article/detailed/thumbs/collect
export const getArticleThumbs = (params) => axios.post('/content/article/detailed/thumbs/collect', params)
