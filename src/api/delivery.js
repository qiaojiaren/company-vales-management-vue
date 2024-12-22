import request from './request'

export const getDelivery = (params) => {
  return request({
    url: '/delivery/search',
    method: 'get',
    params
  })
}

export const getNotDeliver = (params) => {
  return request({
    url: '/delivery/findNotDeliver',
    method: 'get',
    params
  })
}

export const modifyDelivery = (data) => {
  return request({
    url: '/delivery/modify',
    method: 'put',
    data
  })
}

export const deliver = (data) => {
  return request({
    url: '/delivery/deliver',
    method: 'put',
    data
  })
}