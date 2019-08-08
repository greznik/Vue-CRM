import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import info from "./info";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // С помощью него мы будем передавать ошибки
    error: null
  },
  mutations: {
    // Настраиваем обработчик ошибок
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      // Fetch - возвращает promise поэтому ждем и заносим результат в переменную
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      // Парсим данные, которые пришли в JSON
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    info
  }
});
