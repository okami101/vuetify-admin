import Vue from "vue";
import App from "./App.vue";
import AdminVue from "vuetify-admin";

Vue.config.productionTip = false;

AdminVue(App).$mount("#app");
