import Vue from "vue";
import VtecAdmin from "vtec-admin";

/**
 * On local demo only
 */
import "vtec-admin/vuetify.js";

/**
 * On external project
 */
//import "vtec-admin/dist/vuetify.js";
//import "vtec-admin/dist/admin.css";

import { laravelDataProvider, sanctumAuthProvider } from "vtec-admin";
import { en, fr } from "vtec-admin";

import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import axios from "@/plugins/axios";

/**
 * Load external libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Axios global config
 */
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Load Admin UI components
 */
Vue.use(VtecAdmin);

/**
 * Register portal and draggable
 */
Vue.use(PortalVue);
Vue.component("draggable", draggable);

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
      permissions: ["admin", "editor"],
    },
    {
      icon: "mdi-book",
      name: "books",
      translatable: true,
      permissions: ["admin", "editor", "author"],
    },
    {
      icon: "mdi-account",
      name: "authors",
      translatable: true,
      permissions: ["admin", "author"],
    },
    {
      icon: "mdi-comment",
      name: "reviews",
      permissions: ["admin", "editor", "author"],
    },
    {
      icon: "mdi-account",
      name: "users",
      only: ["list"],
      permissions: ["admin"],
    },
  ],
});
