import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { v4 as uuidv4 } from 'uuid'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.PUBLIC_BACKEND_API_URL,
  // withCredentials: true, 작동 X
  timeout: 5000,
})

const retryCountMap = new Map<string, { count: number; timestamp: number }>()

axiosInstance.interceptors.request.use(config => {
  const reqId = uuidv4()
  config.headers['X-Request-ID'] = reqId

  retryCountMap.set(reqId, { count: 0, timestamp: Date.now() })

  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const reqId = response.config.headers['X-Request-ID']
    retryCountMap.delete(reqId)
    return response
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
