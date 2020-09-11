import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import "../loader";

import {
  jsonServerDataProvider,
  fakeAuthProvider,
} from "vuetify-admin/src/providers";
import { en, fr } from "vuetify-admin/src/locales";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";

/**
 * Load Admin UI components
 */
Vue.use(VuetifyAdmin);

/**
 * Api URL
 */
const baseURL =
  process.env.VUE_APP_API_URL || "https://jsonplaceholder.okami101.io";

/**
 * Init admin
 */
export default new VuetifyAdmin({
  router,
  store,
  i18n,
  title: "Vuetify Admin",
  routes,
  locales: { en, fr },
  dataProvider: jsonServerDataProvider(baseURL),
  authProvider: fakeAuthProvider(),
  resources,
  options: {
    dateFormat: "long",
  },
});
