import Vue from "vue";
import VtecAdmin from "vtec-admin";

import "vtec-admin/src/loader";
import "vtec-admin/dist/admin.css";

import {
  laravelDataProvider,
  sanctumAuthProvider,
} from "vtec-admin/src/providers";
import { en, fr } from "vtec-admin/src/locales";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";
import axios from "axios";
import trimEnd from "lodash/trimEnd";

/**
 * Load Admin UI components
 */
Vue.use(VtecAdmin);

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
 * Init admin
 */
export default new VtecAdmin({
  router,
  store,
  i18n,
  title: "Vtec Admin",
  routes,
  locales: { en, fr },
  translations: {
    en: i18n.t("locales.english"),
    fr: i18n.t("locales.french"),
  },
  authProvider: sanctumAuthProvider(http),
  dataProvider: laravelDataProvider(http),
  resources,
  options: {
    dateFormat: "long",
    fileBrowserUrl: `${trimEnd(baseURL, "/")}/elfinder/tinymce5`,
  },
});
