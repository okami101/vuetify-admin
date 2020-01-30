import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import Admin from "./components/Admin";

const components = [Admin];

components.forEach(component => {
  Vue.component(component.name, component);
});

Vue.use(VueRouter);
Vue.use(Vuex);

export default (App, routes = []) => {
  const router = new VueRouter({
    routes
  });
  const store = new Vuex.Store({});

  return new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  });
};
