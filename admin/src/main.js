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
  router: router({ i18n }),
  store,
  vuetify,
  i18n,
  admin: admin({ i18n, axios }),
  render: h => h(App)
}).$mount("#app");
