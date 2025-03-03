import axios from './axios'

// 登录接口/login/login
export const login = (params) => {
  return axios.post('/login/login', params)
}

// 注册/login/register
export const register = (params) => {
  return axios.post('/login/register', params)
}

// 获取个人信息 /home/login/detail
export const getLoginDetail = (params) => {
  return axios.post('/home/login/detail', params)
}

// 生成图形验证码/login/generate/graphical/captcha
export const generateGraphicalCaptcha = (params) => {
  return axios.post('/login/generate/graphical/captcha', params)
}

// 获取手机验证码 /login/phone
export const getPhoneCode = (params) => {
  return axios.post('/login/phone', params)
}
