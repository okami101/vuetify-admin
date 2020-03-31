import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import sanctumAuthProvider from "vuetify-admin/providers/sanctumAuthProvider";
import laravelDataProvider from "vuetify-admin/providers/laravelDataProvider";

import en from "vuetify-admin/locales/en.json";
import fr from "vuetify-admin/locales/fr.json";

import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import axios from "@/plugins/axios";

/**
 * Load UI components
 */
Vue.use(VuetifyAdmin);

export default new VuetifyAdmin({
  router,
  store,
  i18n,
  title: "Bookstore Admin",
  locales: {
    ui: { en, fr },
    translations: {
      en: i18n.t("locales.english"),
      fr: i18n.t("locales.french"),
    },
  },
  authProvider: sanctumAuthProvider(axios, {
    routes: {
      login: "/auth/login",
      logout: "/auth/logout",
      user: "/api/user",
    },
  }),
  dataProvider: laravelDataProvider(axios),
  resources: [
    {
      name: "publishers",
      translatable: true,
    },
    { name: "books", translatable: true },
    {
      name: "authors",
      translatable: true,
    },
    "reviews",
    { name: "users", only: ["list"] },
  ],
  resourcesPath: "resources",
});
