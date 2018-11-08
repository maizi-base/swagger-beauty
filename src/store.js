import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiDoc: {},//swagger 返回api文档
    setting: {//配置信息
      url: '',//请求地址
    },
    error:{//错误信息
      isError:false,
      errMessage:null
    }
  },
  mutations: {
    // 保存成功请求信息
    setApiDoc(state, apiDoc) {
      state.apiDoc = apiDoc
    },
    // 设置配置
    setSetting(state, setting) {
      state.setting = setting
    },
    // 设置请求url
    setUrl(state, url){
      localStorage.apiUrl = url
      state.setting.url = url
    },
    // 设置错误信息
    setError(state,error){
      state.error.isError = true;
      state.error.errMessage = error;
    },
    // 清除错误信息
    clearError(state){
      state.error.errMessage = null;
      state.error.isError = false;
    }
  },
  actions: {
    // 请求api
    getApiDoc({ state, commit },url) {
      if (url) commit("setUrl", url)
      let apiUrl = url || localStorage.apiUrl
      console.log('apiUrl', apiUrl)
      return axios.get(apiUrl).then(result=>{
        commit("setApiDoc", result.data)
        commit("clearError")
      }).catch(err=>{
        commit("setApiDoc", {})
        commit("setError", err.response)
      })
    }
  }
})
