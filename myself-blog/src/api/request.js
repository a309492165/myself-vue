// 在http.js中引入axios
import axios from 'axios' // 引入axios
import Vue from 'vue'
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
    if (isShowLoading(config)) {
      Vue.prototype.$load.open()
    }
    // 登录拦截
    // debugger
    // if (!config.headers.hasOwnProperty('Authorization')) {
    //   config.headers['Authorization'] = sessionStorage.getItem('token')
    // }
    return config
  },
  error => {
    Vue.prototype.$load.close()
    Message.error({
      message: '加载超时'
    })
    return Promise.reject(error.request)
  }
)

// http响应拦截器
axios.interceptors.response.use(
  response => {
    return response
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    // if (response.status === 200) {
    //   return Promise.resolve(response)
    // } else {
    //   return Promise.reject(response)
    // }
  },
  error => {
    errorHandler(error)
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

function isShowLoading (config) {
  let isShowLoading = true
  if (config.data) {
    if (config.data.isLoading === false) {
      isShowLoading = false
    }
  }
  if (config.params) {
    if (config.params.isLoading === false) {
      isShowLoading = false
    }
  }
  return isShowLoading
}

function checkStatus (response) {
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400)
  ) {
    return response.data
  }
  return {
    success: false,
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  Vue.prototype.$load.close()
  if (res.code === 0) {
    return res.data
  } else {
    Message.error({
      message: res.msg
    })
    return Promise.reject(res)
  }
}

function errorHandler (error) {
  Vue.prototype.$load.close()
  if (error && error.status) {
    switch (error.response.status) {
      case 400:
        error.msg = '错误请求'
        break
      case 401:
        error.msg = '未授权，请重新登录'
        break
      case 403:
        error.msg = '拒绝访问'
        break
      case 404:
        error.msg = '请求错误，未找到该资源'
        break
      case 405:
        error.msg = '请求方法未允许'
        break
      case 408:
        error.msg = '请求超时'
        break
      case 500:
        error.msg = '服务器端出错'
        break
      case 501:
        error.msg = '网络未实现'
        break
      case 502:
        error.msg = '网络错误'
        break
      case 503:
        error.msg = '服务不可用'
        break
      case 504:
        error.msg = '网络超时'
        break
      case 505:
        error.msg = 'http版本不支持该请求'
        break
      default:
        error.msg = `连接错误${error.response.status}`
    }
  } else {
    error.msg = '连接到服务器失败'
  }
  // console.log(error.msg)
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
        return checkStatus(response)
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
        return checkStatus(response)
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
        return checkStatus(response)
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
        return checkStatus(response)
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
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  default: axios.defaults
}
