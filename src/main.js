import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    // this.$store.commit('setUrl', localStorage.apiUrl)
  },
  render: h => h(App)
}).$mount('#app')
