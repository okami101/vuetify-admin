import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";
import Admin from "vuetify-admin";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Admin);

const router = new VueRouter({});
const store = new Vuex.Store({});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
