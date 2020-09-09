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
import axios from "axios";

/**
 * Load Admin UI components
 */
Vue.use(VuetifyAdmin);

/**
 * Axios instance
 */
const baseURL =
  process.env.VUE_APP_API_URL || "https://jsonplaceholder.okami101.io";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

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
  dataProvider: jsonServerDataProvider(http),
  authProvider: fakeAuthProvider(),
  resources,
  axios: http,
  options: {
    dateFormat: "long",
  },
});
