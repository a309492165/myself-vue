import Vue from 'vue'
import Vuex from 'vuex'
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
  }
})

export default store
