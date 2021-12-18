import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config && config.headers) {
    if (store.state.user && store.state.user.access_token) {
      config.headers.Authorization = store.state.user.access_token
    }
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
