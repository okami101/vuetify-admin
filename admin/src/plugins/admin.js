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
 * Init vuetify admin class with options
 */
const admin = axios => {
  return new VuetifyAdmin({
    title: "Bookstore Admin",
    locales: {
      ui: { en, fr },
      translations: { en: "locales.en", fr: "locales.fr" }
    },
    authProvider: airlockAuthProvider(axios, {
      routes: {
        login: "/auth/login",
        logout: "/auth/logout",
        user: "/api/user"
      }
    }),
    dataProvider: laravelDataProvider(axios),
    resources: [
      { name: "publishers", translatable: true },
      { name: "books", translatable: true },
      { name: "authors", translatable: true },
      "reviews"
    ],
    resourcesPath: "resources"
  });
};

export default admin;
