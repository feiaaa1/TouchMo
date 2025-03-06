import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { useStyleStateStore } from '@/stores/styleState'
const styleState = useStyleStateStore()
// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://kyz.free.svipss.top', // 替换为你的 API 基础 URL
  timeout: 20000, // 请求超时时间
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
    // 如果响应头中有 token，则更新本地存储中的 token
    if (response.headers.token) {
      localStorage.setItem('token', response.headers.token)
    }
    return response.data
  },
  (error) => {
    // 所有请求若网络超时都弹出网络错误
    console.log(error)
    if (error.message === 'Network Error') {
      ElMessage({
        message: '网络错误',
        type: 'error',
        plain: true,
      })
    } else if (error.message.includes('timeout')) {
      ElMessage({
        message: '请求超时',
        type: 'error',
      })
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
