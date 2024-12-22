import request from './request'

export const createShoppingCart = (data) => {
  return request({
    url: '/shoppingCart/create',
    method: 'post',
    data
  })
}

export const getShoppingCart = () => {
  return request({
    url: '/shoppingCart/search'
  })
}

export const shoppingCartPlus = (data) => {
  return request({
    url: '/shoppingCart/plus',
    method: 'post',
    data
  })
}

export const shoppingCartSub = (data) => {
  return request({
    url: '/shoppingCart/sub',
    method: 'post',
    data
  })
}

export const deleteShoppingCart = () => {
  return request({
    url: '/shoppingCart/clean',
    method: 'delete'
  })
}