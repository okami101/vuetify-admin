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
    locales: { en, fr },
    authProvider: airlockAuthProvider(axios, {
      routes: {
        login: "/auth/login",
        logout: "/auth/logout",
        user: "/api/user"
      }
    }),
    dataProvider: laravelDataProvider(axios),
    resources: ["publishers", "books", "authors", "reviews"],
    resourcesPath: "resources"
  });
};

export default admin;
