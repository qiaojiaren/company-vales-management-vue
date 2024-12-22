import request from './request'

export const getContracts = (params) => {
  return request({
    url: '/contracts/search',
    params
  })
}

export const editContract = (data) => {
  return request({
    url: '/contracts/modify',
    method: 'put',
    data
  })
}

export const deleteContract = (id) => {
  return request({
    url: `/contracts/delete/${id}`,
    method: 'delete'
  })
}

export const unFulfillment = (params) => {
  return request({
    url: '/contracts/unFulfillment/',
    params
  })
}

export const createContract = (data) => {
  return request({
    url: '/contracts/create',
    method: 'post',
    data
  })
}

export const fulfillment = (id) => {
  return request({
    url: `/contracts/fulfillment/${id}`,
    method: 'put'
  })
}