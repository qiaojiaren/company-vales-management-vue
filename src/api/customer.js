import request from './request'

export const getCustomerList = (params) => {
  return request({
    url: '/customer/list',
    method: 'get',
    params
  })
}

export const createCustomer = (data) => {
  return request({
    url: '/customer/create',
    method: 'post',
    data
  })
}

export const modifyCustomer = (data) => {
  return request({
    url: '/customer/modify',
    method: 'put',
    data
  })
}

export const deleteCustomer = (id) => {
  return request({
    url: `/customer/delete/${id}`,
    method: 'delete'
  })
}