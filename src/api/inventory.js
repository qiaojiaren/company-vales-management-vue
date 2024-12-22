import request from './request'

export const getInventories = (params) => {
  return request({
    url: '/inventory/search',
    params
  })
}

export const createInventory = (data) => {
  return request({
    url: '/inventory/create',
    method: 'post',
    data
  })
}