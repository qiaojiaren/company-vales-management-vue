import request from './request'

export const purchaseOrderSearch = (params) => {
  return request({
    url: '/purchaseOrder/search',
    method: 'get',
    params
  })
}

export const purchaseOrderModify = (data) => {
  return request({
    url: '/purchaseOrder/modify',
    method: 'put',
    data
  })
}

export const purchase = (id) => {
  return request({
    url: `/inventory/purchase/${id}`,
    method: 'put'
  })
}