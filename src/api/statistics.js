import request from './request'

export const getTotalSales = (beginDate, endDate) => {
  return request({
    url: '/statistics/totalSales',
    params: {
      beginDate,
      endDate
    }
  })
}



export const getCustomerPays = (beginDate, endDate) => {
  return request({
    url: '/statistics/customerPays',
    params: {
      begin: beginDate,
      end: endDate
    }
  })
}

export const getPerformance = (beginDate, endDate,id) => {
  return request({
    url: '/statistics/performance',
    params: {
      begin: beginDate,
      end: endDate,
      id: id
    }
  })
}