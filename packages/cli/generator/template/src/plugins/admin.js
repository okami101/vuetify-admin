import Vue from "vue";
import VtecAdmin from "@vtec/admin";

import "@vtec/admin/dist/components.js";
import "@vtec/admin/dist/admin.css";

import { laravelDataProvider, sanctumAuthProvider } from "@vtec/admin";
import { en, fr } from "@vtec/admin";

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
Vue.use(VtecAdmin);

export default new VtecAdmin({
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