import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import store from './store'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('刷新', store.state.apiDoc)
  if(!store.state.apiDoc){
    store.dispatch('getApiDoc').then(res => {
      next()
    })
  }else{
    next()
  }
})
export default router