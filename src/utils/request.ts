import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})

// 刷新token
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

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
let isRefreshing = false
let requests: any[] = [] // 存储刷新token时发送的请求
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user && !store.state.user.refresh_token) { // 没有refresh_token，就直接跳到登录页重新登录
        Message.error('Token无效')
        store.commit('setUser', null)
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      } else { // 如果存在refresh_token，就通过刷新token接口刷新token，并且把之前的接口继续请求执行
        if (!isRefreshing) {
          isRefreshing = true
          return refreshToken().then(res => {
            if (!res.data.success) {
              throw new Error('刷新 Token 失败')
            }
            // 刷新 token 成功了
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            return request(error.config)
          }).catch(error => {
            console.log(error)
            store.commit('setUser', null)
            router.push({
              name: 'login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 刷新状态下，把请求挂起放到 requests 数组中
          return new Promise((resolve) => {
            requests.push(() => {
              resolve(request(error.config))
            })
          })
        }
      }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('内部服务错误')
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    Message.error('请求超时，请刷新重试')
  } else {
    // Something happened in setting up the request that triggered an Error
    Message.error(`请求失败，${error.message}`)
  }
  return Promise.reject(error)
})

export default request
