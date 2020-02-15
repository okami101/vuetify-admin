import Vue from "vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyAdmin from "vuetify-admin";
import App from "./App.vue";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import i18n from "./i18n";

Vue.config.productionTip = false;

Vue.use(VuetifyAdmin);

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

new Vue({
  router: router(i18n),
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
