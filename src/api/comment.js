import axios from './axios'

// 获取评论列表 comment/listPage
export const getCommentList = (params) => axios.post('/comment/personal/center/comment/list', params)

//文章评论-列表 comment/listPage
export const getArticleCommentList = (params) => axios.post('/comment/listPage', params)

//文章用户评论 /comment/article/comments
export const getArticleUserComment = (params) => axios.post('/comment/article/comments', params)

// 个人中心-评论列表 comment/personal/center/comment/list
