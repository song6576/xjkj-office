import axios from './axios'

// 订单列表order/order/page
export const getOrderList = (params) => axios.post('/order/order/page', params)
