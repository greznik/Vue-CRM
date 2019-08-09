import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      // Изменяем state
      state.info = info;
    },
    // Чтобы не кэшировался state, когда мы делаем logout. Чтобы сессии не пересекались
    clearInfo(state) {
      state.info = {};
    }
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = {...getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Обращаемся к базе данных и получаем ID пользователя
    async fetchInfo({ dispatch, commit }) {
      try {
        // Получаем ID
        const uid = await dispatch("getUid");
        // Делаем запрос к Firebase Database - работа с базой. Ref - указываем путь, где лежит ID. Once - получаем Value. Val - получаем значение и записываем в info
        const info = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once("value")).val();
          // Передаем Info, чтобы изменить state
        commit("setInfo", info);
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    // Получаем стейт
    info: s => s.info
  }
};
