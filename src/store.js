import Vue from 'vue'
import Vuex from 'vuex'
import cart from './store/cart'
import alert from './store/alert'
import dialog from './store/dialog'
import auth from './store/auth'
import login from './views/LoginPage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBar: false,
  },
  getters: {
    sideBar: state => state.sideBar,
  },
  mutations: {
    setsideBar: (state, value)=>{
      state.sideBar=value
    },
  },
  actions: {
    setSideBar: ({commit}, value) => {
      commit('setsideBar', value)
    },
  },
  modules: {
    cart,
    alert,
    dialog,
    auth,
    login,
  }
})
