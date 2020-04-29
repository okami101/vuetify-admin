import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import admin from "./plugins/admin";
import "./plugins/base";
import "./plugins/chartist";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  admin,
  render: (h) => h(App),
}).$mount("#app");
