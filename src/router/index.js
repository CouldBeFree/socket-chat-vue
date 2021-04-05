import Vue from 'vue'
import Router from 'vue-router'

const lazyLoading = name => () => import(`@/views/${name}.vue`)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: lazyLoading('Login')
    },
    {
      path: '/register',
      name: 'register',
      component: lazyLoading('Register')
    },
    {
      path: '/chat',
      name: 'chat',
      component: lazyLoading('Chat')
    }
  ]
})

export default router
