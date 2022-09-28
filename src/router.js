import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    // Login
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component:  () => import('@/pages/Login')
    },
    {
      path: '/dash',
      component:  () => import('@/pages/Dashboard'),
      children:[
        {
          path: 'fispq',
          component: () => import('@/pages/Fispq'),
        },
        {
          path: 'user',
          component: () => import('@/pages/User'),
        },
        {          
          path: 'profile',
          component: () => import('@/pages/Profile')
        }
      
      ]
    }
  ]
})

export default router