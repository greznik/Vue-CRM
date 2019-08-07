import firebase from "firebase/app";
import { register } from "register-service-worker";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        // Передаем данные полученные из formData. Данные метод является асинхронным и он возвращает promise, поэтому применяем оператора await
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        // Чтобы не было редиректа при отсутствии логина в системе и мы продолжили эту ошибку
        throw e;
      }
    },
    // Получаем некоторые поля
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        // Создаем пользователя
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        // Dispatch, потому что во Vuex мы используем Action. Await - превращаем данный uid в реальный uid
        const uid = await dispatch("getUid");
        // Делаем запись в БД. Ref - обращение к БД. Set - передаем начальные значения
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 10000,
            name
          });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    // Получаем id пользователя из Firebase
    getUid() {
      const user = firebase.auth().currentUser;
      // Если мы находим ID, то возвращаем его
      return user ? user.uid : null;
    },
    // Отчищаем данные пользователя при логауте
    async logout() {
      // Возвращает промис
      await firebase.auth().signOut();
    }
  }
};
