import Vue from "vue";
import { routes } from "./router";
import App from "./App.vue";
import AdminVue from "vuetify-admin";

Vue.config.productionTip = false;

AdminVue(App, routes).$mount("#app");
