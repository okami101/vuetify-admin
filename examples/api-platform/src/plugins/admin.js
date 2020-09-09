import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import "vuetify-admin/src/loader";

import { hydraDataProvider, jwtAuthProvider } from "vuetify-admin/src/providers";
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
const baseURL = process.env.VUE_APP_API_URL || "http://localhost:8080";

const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/ld+json",
  },
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
  locales: {
    en,
    fr,
  },
  translations: ["en", "fr"],
  dataProvider: hydraDataProvider(http),
  authProvider: jwtAuthProvider(http, {
    routes: {
      login: "/authentication_token",
    },
    getToken: (r) => r.token,
  }),
  resources,
  axios: http,
  options: {
    dateFormat: "long",
    list: {
      disableGlobalSearch: true,
      disableItemsPerPage: true,
      itemsPerPage: 30,
      itemsPerPageOptions: [30],
    },
  },
});
