import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://test.qaing.co',
  withCredentials: true,
})

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request interceptor', config)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log('response interceptor')
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  },
)

export default instance
