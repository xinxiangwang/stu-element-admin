import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, err => {
  console.error(err)
  return Promise.reject(err)
})

service.interceptors.response.use(res => {
  res = res.data
  return res
}, err => {
  return Promise.reject(err)
})

export default service
