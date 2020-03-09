import Vue from "vue";
import routerInit from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import adminInit from "./plugins/admin";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

/**
 * Register resource crud pages
 */
const files = require.context("@/resources", true, /\.vue$/i);
files.keys().map(key => {
  const segments = key.split("/");
  const name = segments.pop();
  const dir = segments.pop();

  Vue.component(`${dir}${name.split(".")[0]}`, files(key).default);
});

/**
 * Specific badge color status function
 */
Vue.prototype.$statusColor = s => {
  const colors = {
    published: "success",
    pending: "warning",
    denied: "error"
  };

  return colors[s];
};

let router = routerInit(i18n);
let admin = adminInit({
  router,
  store,
  i18n,
  axios
});

/**
 * Instancing & mounting Vue
 */
new Vue({
  router,
  store,
  vuetify,
  i18n,
  admin,
  render: h => h(App)
}).$mount("#app");
