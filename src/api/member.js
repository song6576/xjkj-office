import axios from './axios';

// 获取会员开通等级 home/membership/activation/level
export const getMemberLevel = () => axios.post('/home/membership/activation/level',{});

// 创建订单(唤醒二维码) order/order/create
export const createOrder = (params) => axios.post('/order/order/create', params);

// 查询订单状态(每二秒钟调用一次) order/order/create/detail
export const getOrderDetail = (params) => axios.post('/order/order/create/detail', params);
