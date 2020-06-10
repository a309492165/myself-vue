import Vue from 'vue'
import Vuex from 'vuex'
import adminBlog from './modules/adminBlog'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    routeName: '/',
    userinfo: null
  },
  mutations: {
    setRouteName (state, val) {
      state.routeName = val
    },
    setUserinfo (state, val) {
      state.userinfo = val
    }
  },
  modules: {
    adminBlog
  }
})

export default store
