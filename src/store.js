import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiDoc: null,
    setting: {
      url: 'http://songshipeng.s1.natapp.cc/v2/api-docs'
    }
  },
  mutations: {
    setApiDoc(state, apiDoc) {
      state.apiDoc = apiDoc
    },
    setSetting(state, setting) {
      state.setting = setting
    },
    setUrl(state, url){
      state.setting.url = url
    }
  },
  actions: {
    getApiDoc({ state, commit }) {
      return axios.get(state.setting.url).then(res => {
        commit("setApiDoc", res.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
})
