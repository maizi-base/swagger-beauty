import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store.js'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('./views/About.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch('getApiDoc').then(res => {
    next()
  })
})
export default router