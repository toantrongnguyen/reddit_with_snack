import axios from 'axios'
import { ACCESS_TOKEN } from '@/constants'

const baseRequest = ({ method, options }) => {
  return axios({
    ...options,
    method,
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  })
    .then(response => Promise.resolve(options.originData ? response : response.data))
}

const request = ({ method, options }) => {
  return baseRequest({ method, options }).catch(error => {
    return Promise.reject(error.response.data)
  })
}

const Request = {
  get: (options) => {
    return request({ method: 'GET', options })
  },

  post: (options) => {
    return request({ method: 'POST', options })
  },

  put: (options) => {
    return request({ method: 'PUT', options })
  },

  patch: (options) => {
    return request({ method: 'PATCH', options })
  },

  delete: (options) => {
    return request({ method: 'DELETE', options })
  },
}

export default {
  baseRequest,
  Request,
}
