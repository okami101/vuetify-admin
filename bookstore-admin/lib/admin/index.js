import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";

import Admin from "./components/admin";

const components = [Admin];

components.forEach(component => {
  console.log(component.name);
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
