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
          path: 'add-fispq',
          component: () => import('@/pages/AddFispq'),
        },
        {
          path: 'edit-fispq/:id',
          component:  () => import('@/pages/UpdateFispq')
        },
        {
          path: 'user',
          component: () => import('@/pages/User'),
        },
        {
          path: 'add-user',
          component: () => import('@/pages/AddUser'),
        },
        {
          path: 'edit-user/:id',
          component:  () => import('@/pages/UpdateUser')
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