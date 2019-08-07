import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    // Настраиваем обработчик ошибок
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = nul
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth
  }
})
