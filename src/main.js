import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDguL0ATL-FyfxE2IbgPyHPNm5wO6FSveI",
  authDomain: "poke-dex-pokemon.firebaseapp.com",
  projectId: "poke-dex-pokemon",
  storageBucket: "poke-dex-pokemon.appspot.com",
  messagingSenderId: "785504391091",
  appId: "1:785504391091:web:5930817d7c5655692205c6",
};

//Inicializar firebase
initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
