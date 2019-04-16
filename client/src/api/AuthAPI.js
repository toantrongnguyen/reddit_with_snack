import BaseRequest from '@/api/BaseRequest'

export function login({ data }) {
  return BaseRequest.Request.post({ url: 'login', data })
}
