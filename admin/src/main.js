import Vue from "vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "./plugins/axios";
import vuetify from "./plugins/vuetify";
import admin from "./plugins/admin";
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

/**
 * Instancing & mounting Vue
 */
new Vue({
  router: router(i18n),
  store,
  vuetify,
  i18n,
  admin: admin(axios),
  render: h => h(App)
}).$mount("#app");
