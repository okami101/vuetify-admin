import Vue from "vue";
import VuetifyAdmin from "vue-relay-admin";
import "vue-relay-admin/dist/vue-relay-admin.css";

import "vue-relay-admin/src/utils/loadVuetifyComponents";

import sanctumAuthProvider from "vue-relay-admin/src/providers/sanctumAuthProvider";
import laravelDataProvider from "vue-relay-admin/src/providers/laravelDataProvider";

import en from "vue-relay-admin/src/locales/en.json";
import fr from "vue-relay-admin/src/locales/fr.json";

import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import axios from "@/plugins/axios";

/**
 * Load view resources
 */
const requireComponent = require.context("@/resources", true, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .replace(/^\.\//, "")
    .replace(/\//, "")
    .replace(/\.\w+$/, "");

  Vue.component(componentName, componentConfig.default || componentConfig);
});

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
});
