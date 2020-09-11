import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import admin from "./plugins/admin";
import "./plugins/i18n";
import "./plugins/base";
import "./plugins/chartist";
import "./sass/overrides.sass";
import FakeServer from "./server";

Vue.config.productionTip = false;

FakeServer();

/**
 * Specific badge color status function
 */
Vue.prototype.$statusColor = (s) => {
  const colors = {
    accepted: "success",
    pending: "warning",
    rejected: "error",
  };

  return colors[s];
};

new Vue({
  router,
  store,
  vuetify,
  i18n,
  admin,
  render: (h) => h(App),
}).$mount("#app");
