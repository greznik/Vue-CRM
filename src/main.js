import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Фильтр даты и времени
import dateFilter from "@/filters/date.filter";
// Toast сообщение при выходе из системы
import messagePlugin from "@/utils/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter("date", dateFilter);

// Инициализируем конфиг firebase не забываем установить его в npm i firebase
firebase.initializeApp({
  apiKey: "AIzaSyBtLSWqNLerKtypJxzDHFh4Tay5B0SuC10",
  authDomain: "vue-crmtraining.firebaseapp.com",
  databaseURL: "https://vue-crmtraining.firebaseio.com",
  projectId: "vue-crmtraining",
  storageBucket: "",
  messagingSenderId: "864759906550",
  appId: "1:864759906550:web:bc2e5426c6579ecf"
});
// Проверка на инициализацию приложения, во избежания постоянного рендера
let app;

// Рендерим страницу только когда получим ответ от сервера
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
