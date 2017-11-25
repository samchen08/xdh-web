import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import modules from './modules'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    ...state
  },
  modules: {
    ...modules
  },
  mutations: {
    ...mutations
  },
  getters: {
    ...getters
  }
})
