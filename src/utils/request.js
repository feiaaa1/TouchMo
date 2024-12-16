import axios from 'axios'

// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://www.free.svipss.top/', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 从本地存储（例如 localStorage）获取 token
    const token = localStorage.getItem('token')

    if (token) {
      // 如果 token 存在，则将其作为请求头的一部分
      config.headers.token = `${token}`
    }

    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  },
)

export default axiosInstance
