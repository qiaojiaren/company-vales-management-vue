import router from './index'
import store from '@/store'


const whileList = ['/login']
const protectedRoutes = ['/contracts/operation', '/inventory/operation','/inventory/purchaseOrder',
  '/delivery/operation','/customer/operation','/salesperson/operation','/statistics/totalSales',
  '/statistics/customerPays'
];// 受保护的路由
router.beforeEach((to, from, next) => {
  const token = store.getters.token; // 获取用户 token
  const userRole = store.getters.user.is_manager; // 获取用户角色或权限等级
  if(token){
    if(to.path === '/login'){
      next('/')
    } else if (protectedRoutes.includes(to.path)){
      if(userRole === 0){// 权限为0的用户
        next('/home'); // 重定向到无权限页面
      } else {
        next(); // 允许访问
      }
    }else{
      // 非受保护路由允许访问
      next()
    }
  }else{
    if(whileList.includes(to.path)){
      next()
    } else{
      next('/login')
    }
  }
}) 

