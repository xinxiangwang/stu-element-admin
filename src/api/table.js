import request from '@/utils/request'

export function fetchTable() {
  return request({
    url: '/table',
    method: 'get'
  })
}

export function fetchUserTable() {
  return request({
    url: '/userTable',
    method: 'get'
  })
}
