import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "@/filters/date.filter";
import messagePlugin from "@/command/message.plugin";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("date", dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyAXHLQ-r3PQZkQv5cJlAi0zZBSNLKjdG9M",
  authDomain: "vue-crm-1.firebaseapp.com",
  databaseURL: "https://vue-crm-1.firebaseio.com",
  projectId: "vue-crm-1",
  storageBucket: "",
  messagingSenderId: "694837843442",
  appId: "1:694837843442:web:7a57ad5a5314f7b9"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
