import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import vuetify from "./plugins/vuetify";
import admin from "./plugins/admin";

import "./plugins/i18n";
import AddressField from "./components/fields/AddressField";

Vue.component("VaAddressField", AddressField);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  admin,
  render: (h) => h(App),
}).$mount("#app");
