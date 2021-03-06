import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

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
      path: '/',
      name: 'chat',
      component: lazyLoading('Chat'),
      async beforeEnter(to, from, next) {
        await store.dispatch('getUser')
        if (store.getters.user) return next()
        next('/login')
      }
    }
  ]
})

export default router
