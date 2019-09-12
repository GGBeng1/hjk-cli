import axios from 'axios'
import { Loading } from 'element-ui'
// import qs from 'qs'

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
axios.interceptors.request.use(
  config => {
    Loading.service({
      fullscreen: true,
      lock: true,
      text: '拼命加载中...'
    })

    return config
  },
  error => {
    const loading = Loading.service({})
    loading.close()
    return Promise.reject(error)
  }
)

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(
  response => {
    const loading = Loading.service({})
    loading.close()
    return response
  },
  error => {
    const loading = Loading.service({})
    loading.close()
    return Promise.resolve(error)
  }
)

axios.defaults.timeout = 10000
