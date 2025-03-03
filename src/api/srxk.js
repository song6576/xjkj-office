import axios from './axios'

// /home/red/people/detail
export const geDetail = (params) => axios.post('/home/red/people/detail', params)

// 作品集分页home/portfolio/pagination
export const gePagination = (params) => axios.post('/home/portfolio/pagination', params)