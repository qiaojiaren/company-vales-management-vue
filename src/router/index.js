import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/login')
  },
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: () => import( '../layout'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import( '../views/home/index.vue')
      },
      {
        path: 'contracts/operation',
        name: 'operation',
        component: () => import('@/views/contracts/operation.vue')
      },
      {
        path: 'contracts/unFulfillment',
        name: 'unFulfillment',
        component: () => import('@/views/contracts/unFulfillment.vue')
      },
      {
        path: 'contracts/create',
        name: 'create',
        component: () => import('@/views/contracts/create.vue')
      },
      {
        path: 'inventory/operation',
        name: 'inventoryOperation',
        component: () => import('@/views/inventory/operation.vue')
      },
      {
        path: 'inventory/purchaseOrder',
        name: 'inventoryPurchaseOrder',
        component: () => import('@/views/inventory/purchaseOrder.vue')
      },
      {
        path: 'delivery/operation',
        name: 'deliveryOperation',
        component: () => import('@/views/delivery/operation.vue')
      },
      {
        path: 'customer/operation',
        name: 'customerOperation',
        component: () => import('@/views/customer/operation.vue')
      },
      {
        path: 'salesperson/operation',
        name: 'salespersonOperation',
        component: () => import('@/views/salesperson/operation.vue')
      },
      {
        path: 'statistics/totalSales',
        name: 'statisticsTotalSales',
        component: () => import('@/views/statistics/totalSales.vue')
      },
      {
        path: 'statistics/customerPays',
        name: 'statisticscustomerPays',
        component: () => import('@/views/statistics/customerPays.vue')
      },
      {
        path: 'statistics/performance',
        name: 'statistiPerformance',
        component: () => import('@/views/statistics/performance.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



export default router
