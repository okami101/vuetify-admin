import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import "vuetify-admin/src/loader";

import {
  hydraDataProvider,
  jwtAuthProvider,
} from "vuetify-admin/src/providers";
import { FetchHydra } from "vuetify-admin/src/providers";
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

const apiURL = process.env.VUE_APP_API_URL || "http://localhost:8080";

/**
 * Create fetch instance with custom authentication headers
 */
const httpClient = new FetchHydra(apiURL, {
  headers: () => {
    let headers = new Headers({
      Accept: "application/ld+json",
    });

    let token = localStorage.getItem("jwt_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
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
  dataProvider: hydraDataProvider(httpClient),
  authProvider: jwtAuthProvider(httpClient, {
    routes: {
      login: "authentication_token",
    },
    getToken: (r) => r.token,
  }),
  resources,
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
