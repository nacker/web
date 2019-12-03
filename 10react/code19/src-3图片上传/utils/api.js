import axios from 'axios'
import { BASE_URL } from './url'
import { getToken, removeToken } from './token'

// 创建axios实例
const API = axios.create({
  baseURL: BASE_URL
})

/* 
  ① 在 api.js 中，添加请求拦截器。
  ② 获取到当前请求的接口路径（url）。
  ③ 判断接口路径，是否是以 /user 开头，并且不是登录或注册接口（只给需要的接口添加请求头）。
  ④ 如果是，就添加请求头 Authorization。
  ⑤ 添加响应拦截器。
  ⑥ 判断返回值中的状态码。
  ⑦ 如果是 400，表示 token 超时或异常，直接移除 token。
*/

// 添加请求拦截器
API.interceptors.request.use(config => {
  // console.log(config, config.url)
  const { url } = config

  // 注册接口地址：/user/registered?redirectUrl=/rent/add
  // 登录接口地址：/user/login
  // true && !(false || true)
  if (
    url.startsWith('/user') &&
    // !(url.startsWith('/user/registered') || url.startsWith('/user/login'))
    !url.startsWith('/user/registered') &&
    !url.startsWith('/user/login')
  ) {
    config.headers.authorization = getToken()
  }

  return config
})

// 添加响应拦截器
API.interceptors.response.use(res => {
  // console.log('响应拦截器：', res)

  if (res.data.status === 400) {
    // token 失效，直接移除 token
    removeToken()
  }

  return res
})

export { API }
