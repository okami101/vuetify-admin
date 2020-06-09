import Vue from "vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import vuetify from "./plugins/vuetify";
import admin from "./plugins/admin";
import App from "./App.vue";

import "./plugins/i18n";
import "./plugins/base";
import "./plugins/chartist";
import "./sass/overrides.sass";

Vue.config.productionTip = false;

/**
 * Specific badge color status function
 */
Vue.prototype.$statusColor = (s) => {
  const colors = {
    published: "success",
    pending: "warning",
    denied: "error",
  };

  return colors[s];
};

/**
 * Instancing & mounting Vue
 */
new Vue({
  router,
  store,
  vuetify,
  i18n,
  admin,
  render: (h) => h(App),
}).$mount("#app");
