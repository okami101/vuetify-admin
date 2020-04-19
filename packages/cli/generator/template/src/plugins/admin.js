import Vue from "vue";
import VtecAdmin from "vtec-admin";
import "vtec-admin/dist/admin.css";

import { laravelDataProvider, sanctumAuthProvider } from "vtec-admin";
import { en, fr } from "vtec-admin";

import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import axios from "axios";

/**
 * Load external libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Axios instance
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

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

/**
 * Init admin
 */
export default new VtecAdmin({
  router,
  store,
  i18n,
  title: "Vtec Admin",
  locales: {
    ui: { en, fr },
    translations: {
      en: i18n.t("locales.english"),
      fr: i18n.t("locales.french"),
    },
  },
  authProvider: sanctumAuthProvider(http, {
    routes: {
      login: "/auth/login",
      logout: "/auth/logout",
      user: "/api/user",
    },
  }),
  dataProvider: laravelDataProvider(http),
  resources: [
    {
      icon: "mdi-account",
      name: "users",
      only: ["list"],
    },
  ],
});
