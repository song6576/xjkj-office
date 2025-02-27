import axios from 'axios';

// 创建axios实例，方便进行统一配置
const instance = axios.create({
  baseURL: 'http://protalapi.xjkj66.com', // 从环境变量中获取基础URL，比如开发环境、生产环境可以配置不同的基础地址，需在.env文件中定义
  timeout: 5000, // 请求超时时间，单位是毫秒
  headers: {
    'Content-Type': 'application/json' // 设置请求头，指定参数格式为JSON
  }
});

// 请求拦截器，可在这里添加如添加token等通用逻辑
instance.interceptors.request.use(
  config => {
    // 假设从本地存储获取token，然后添加到请求头中（实际根据业务情况修改）
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      config.headers.token = `${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器，用于统一处理响应，比如处理错误提示、数据格式化等
instance.interceptors.response.use(
  response => {
    const { data } = response;
    // 可以根据后端返回的数据结构，在这里进行统一的数据处理判断等
    // 例如，如果后端返回的数据结构中有code表示状态码，0表示成功等，可以如下判断
    if (data.code === 200) {
      return data; // 返回实际的数据部分（假设数据在data.data中，按实际调整）
    }
  },
  error => {
    return Promise.reject(error.response.data.message);
  }
);

// 导出封装好的axios实例，方便在其他地方使用
export default instance;