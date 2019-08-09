import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const categories =
          (await firebase
            .database()
            .ref(`users/${uid}/categories`)
            // val() позволяет сразу получить данные из базы
            .once("value")).val() || {};
        // Преобразуем полученные данные в объект
        // Object.keys - вернет массив ключей
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`users/${uid}/categories`)
          // Обращаемся к категории по id
          .child(id)
          // Обновляем
          .update({ title, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        // Ждем пока диспач получит uid и записываем его в переменную
        const uid = await dispatch("getUid");
        // Создаем список в базе - "Categories" и пушим туда объект и возвращаем категорию в переменную
        const category = await firebase
          .database()
          .ref(`users/${uid}/categories`)
          .push({ title, limit });
        // Возвращаем данные в CategoryCreate
        return { title, limit, id: category.key };
      } catch (e) {
        // Обработаем ошибку через мутацию index.js
        commit("setError", e);
        // В случае ошибки, не выполняем логику
        throw e;
      }
    }
  }
};
