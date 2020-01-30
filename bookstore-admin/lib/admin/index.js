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

const router = new VueRouter({});
const store = new Vuex.Store({});

export default App =>
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  });
