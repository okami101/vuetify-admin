import Vue from "vue";
import routerInit from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import admin from "./plugins/admin";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

let router = routerInit(i18n);

/**
 * Admin engine initialization
 */
admin(router, store, i18n, axios);

/**
 * Register resource crud pages
 */
const files = require.context("./resources", true, /\.vue$/i);
files.keys().map(key => {
  const segments = key.split("/");
  const name = segments.pop();
  const dir = segments.pop();

  Vue.component(`${dir}${name.split(".")[0]}`, files(key).default);
});

Vue.prototype.$statusColor = s => {
  const colors = {
    published: "success",
    pending: "warning",
    denied: "error"
  };

  return colors[s];
};

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
