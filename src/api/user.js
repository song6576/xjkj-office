import axios from './axios'

// 上传头像 /user/picture/upload
export const uploadAvatar = (params) => axios.post('/user/picture/upload', params)
