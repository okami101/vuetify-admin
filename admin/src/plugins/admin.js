import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import airlockAuthProvider from "vuetify-admin/providers/airlockAuthProvider";
import laravelDataProvider from "vuetify-admin/providers/laravelDataProvider";

import en from "vuetify-admin/locales/en.json";
import fr from "vuetify-admin/locales/fr.json";

/**
 * Load UI components
 */
Vue.use(VuetifyAdmin);

/**
 * Init
 *
 * @param {*} router
 * @param {*} store
 * @param {*} i18n
 * @param {*} axios
 */
const admin = (router, store, i18n, axios) => {
  VuetifyAdmin.init({
    router,
    store,
    i18n,
    locales: { en, fr },
    authProvider: airlockAuthProvider(axios, {
      routes: {
        login: "/auth/login",
        logout: "/auth/logout",
        user: "/api/user"
      }
    }),
    dataProvider: laravelDataProvider(axios),
    resources: ["publishers", "books", "authors", "reviews"]
  });
};

export default admin;
