import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'
import GoodsList from '../components/goods/List.vue'
import Add from '../components/goods/Add.vue'
import Order from '../components/order/Order.vue'
import Report from '../components/report/Report.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    //  当用户访问/login路径的时候，通过components属性指定要展示的组件：Login,然后去APP根组件中放一个路由的占位符
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径，from代表从哪个路径跳转而来，
  // next是一个函数，表示放行，使用方法有两种：
  // 1.next()，直接放行
  // 2.next(./login)，强制跳转到login路径

  // 如果用户访问的登录页，直接放行
  if (to.path === '/login' || to.path === '/signup') return next()
  // 如果没有被放行，即用户访问的是其他有权限（需要登陆才能访问的页面），这时候需要看是否有token

  // 获取token:从 sessionStorage 中获取
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next('/login')
  // 有token，放行
  next()
})

export default router
