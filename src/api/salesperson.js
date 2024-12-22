import request from './request'

export const getSalespersonList = (params) => {
  return request({
    url: '/salesperson/list',
    method: 'get',
    params
  })
}

export const createSalesperson = (data) => {
  return request({
    url: '/salesperson/create',
    method: 'post',
    data
  })
}

export const modifySalesperson = (data) => {
  return request({
    url: '/salesperson/modify',
    method: 'put',
    data
  })
}

export const deleteSalesperson = (id) => {
  return request({
    url: `/salesperson/delete/${id}`,
    method: 'delete'
  })
}