import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import VuetifyAdmin from "vue-relay-admin";

import sanctumAuthProvider from "vue-relay-admin/providers/sanctumAuthProvider";
import laravelDataProvider from "vue-relay-admin/providers/laravelDataProvider";

import en from "vue-relay-admin/locales/en.json";
import fr from "vue-relay-admin/locales/fr.json";

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

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

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
