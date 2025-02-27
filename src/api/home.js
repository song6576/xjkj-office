import axios from './axios'

// 获取首页导航栏/home/navigation/bar/dropdown/menu
export const getHomeNav = () => {
  return axios.get('/home/navigation/bar/dropdown/menu')
}

// 搜索标签/home/navigation/backage/dropdown
export const getHomeSearch = () => {
  return axios.get('/home/navigation/backage/dropdown')
}

// 红人标签列表 home/red/people/switch
export const getRedPeople = () => {
  return axios.get('/home/red/people/switch')
}

// 红人列表 home/red/people/list
export const getRedPeopleList = (params) => {
  return axios.post('/home/red/people/list',params)
}

// 文章列表home/homepage/article/list
export const getArticleList = (params) => {
  return axios.post('/home/homepage/article/list',params)
}

// 热门推荐home/popular/recommendations
export const getPopularRecommendations = () => {
  return axios.get('/home/popular/recommendations')
}

// 点赞 /content/article/detailed/thumbs/collect
export const getArticleThumbs = (params) => axios.post('/content/article/detailed/thumbs/collect', params)

