import Vue from "vue";
import VtecAdmin from "@vtec/admin";

/**
 * Local demo only
 */
import "@vtec/admin/components.js";

/**
 * On external project
 */
//import "@vtec/admin/dist/components.js";
//import "@vtec/admin/dist/admin.css";

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
      icon: "mdi-globe-model",
      name: "publishers",
      translatable: true,
    },
    { icon: "mdi-book", name: "books", translatable: true },
    {
      icon: "mdi-account",
      name: "authors",
      translatable: true,
    },
    { icon: "mdi-comment", name: "reviews" },
    { icon: "mdi-account", name: "users", only: ["list"] },
  ],
});
