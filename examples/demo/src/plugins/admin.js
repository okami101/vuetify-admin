import Vue from "vue";
import VtecAdmin from "vtec-admin";

import { laravelDataProvider, sanctumAuthProvider } from "vtec-admin";
import { en, fr } from "vtec-admin";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";
import axios from "axios";
import trimEnd from "lodash/trimEnd";

/**
 * Load external libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Axios instance
 */
const baseURL = process.env.VUE_APP_API_URL || "http://localhost:8000";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

Vue.prototype.$axios = http;

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
  routes,
  locales: { en, fr },
  translations: {
    en: i18n.t("locales.english"),
    fr: i18n.t("locales.french"),
  },
  authProvider: sanctumAuthProvider(http),
  dataProvider: laravelDataProvider(http),
  fileBrowserUrl: `${trimEnd(baseURL, "/")}/elfinder/tinymce5`,
  resources,
});
