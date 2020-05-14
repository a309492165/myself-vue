// 在http.js中引入axios
import axios from 'axios' // 引入axios
import { Message } from 'element-ui'
import router from '../router'

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // 开发环境请求地址
  axios.defaults.baseURL = 'http://127.0.0.1:7001'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境请求地址
  axios.defaults.baseURL = '/api'
}

// 设置请求超时
axios.defaults.timeout = 10000
// 允许携带cookie
axios.defaults.withCredentials = true
// 设置请求头
const header = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:7001',
  'Access-Control-Allow-Methods': 'OPTIONS,HEAD,GET,PUT,POST,DELETE,PATCH'
}
const postHeader = Object.assign({}, header, {
  'Content-Type': 'application/json;charset=UTF-8'
})
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// http请求拦截
axios.interceptors.request.use(
  config => {
    // 登录拦截
    // debugger
    // if (!config.headers.hasOwnProperty('Authorization')) {
    //   config.headers['Authorization'] = sessionStorage.getItem('token')
    // }
    return config
  },
  error => {
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error.request)
  }
)

// http响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.warning({
            message: '登录过期，请重新登录',
            duration: 1000
          })
          break

        // 404请求不存在
        case 404:
          Message.error({
            message: '加载超时404',
            duration: 1500
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          Message.error({
            message: error.response.data.message,
            duration: 1500
          })
      }
      return Promise.reject(error.response)
    }
  }
)

function checkCode(res) {
  if (!res.data.code || res.data.code === -1) {
    // hideFullScreenLoading()
    return res.data
  } else if (!res.code) {
    // 请求upm系统判断
    return res.data
  } else {
    Message.error({
      message: res.data.message,
      duration: 1500
    })
  }
}

// 导出通用请求方法
export default {
  get(url, params, timeout = 300000) {
    return axios({
      method: 'get',
      url,
      params,
      timeout,
      headers: header
    })
      .then(response => {
        return response
      })
      .then(res => {
        return checkCode(res)
      })
  },
  post(url, params, timeout = 300000) {
    return axios({
      method: 'post',
      url,
      data: params,
      timeout,
      headers: postHeader
    })
      .then(response => {
        return response
      })
      .then(res => {
        // showFullScreenLoading ('#app')
        return checkCode(res)
      })
  },
  delete(url, params) {
    return axios({
      method: 'delete',
      url,
      params,
      headers: header
    })
      .then(response => {
        return response
      })
      .then(res => {
        return checkCode(res)
      })
  },
  put(url, params) {
    return axios({
      method: 'put',
      url,
      data: params,
      headers: postHeader
    })
      .then(response => {
        return response
      })
      .then(res => {
        return checkCode(res)
      })
  },
  patch(url, params) {
    return axios({
      method: 'patch',
      url,
      data: params,
      headers: postHeader
    })
      .then(response => {
        return response
      })
      .then(res => {
        return checkCode(res)
      })
  },
  default: axios.defaults
}
