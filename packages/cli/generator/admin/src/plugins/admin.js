import Vue from "vue";
import VtecAdmin from "vtec-admin";

import "vtec-admin/src/loader";

<%_ if (data === "custom") { _%>
import dataProvider from "@/providers/dataProvider";
<%_ } _%>
<%_ if (auth === "custom") { _%>
import authProvider from "@/providers/authProvider";
<%_ } _%>

import {
  <%_ if (data && data !== "custom") { _%>
  <%- data %>DataProvider,
  <%_ } _%>
  <%_ if (auth && auth !== "custom") { _%>
  <%- auth %>AuthProvider,
  <%_ } _%>
} from "vtec-admin/src/providers";
import {
  <%_ for (locale of locales) { _%>
  <%- locale %>,
  <%_ } _%>
} from "vtec-admin/src/locales";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";
import axios from "axios";
<%_ if (data === "laravel") { _%>
import trimEnd from "lodash/trimEnd";
<%_ } _%>

/**
 * Load Admin UI components
 */
Vue.use(VtecAdmin);

/**
 * Axios instance
 */
const baseURL = process.env.VUE_APP_API_URL || "<%- apiURL %>";

const http = axios.create({
  baseURL,
  <%_ if (auth === "sanctum") { _%>
  withCredentials: true,
  <%_ } _%>
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

/**
 * Init admin
 */
export default new VtecAdmin({
  router,
  store,
  i18n,
  title: "Vtec Admin",
  routes,
  locales: {
    <%_ for (locale of locales) { _%>
    <%- locale %>,
    <%_ } _%>
  },
  translations: [
    <%_ for (locale of locales) { _%>
    "<%- locale %>",
    <%_ } _%>
  ],
  <%_ if (data) { _%>
  <%_ if (data === "custom") { _%>
  dataProvider: dataProvider(axios),
  <%_ } else { _%>
  dataProvider: <%- data %>DataProvider(http),
  <%_ } _%>
  <%_ } _%>
  <%_ if (auth) { _%>
  <%_ if (data === "custom") { _%>
  authProvider: authProvider(axios),
  <%_ } else { _%>
  authProvider: <%- auth %>AuthProvider(
    <%_ if (auth !== "fake") { _%>
    http
    <%_ } _%>
  ),
  <%_ } _%>
  <%_ } _%>
  resources,
  axios: http,
  options: {
    dateFormat: "long",
    <%_ if (data === "laravel") { _%>
    tinyMCE: {
      language: navigator.language.replace("-", "_"),
      imageUploadUrl: "/api/upload",
      fileBrowserUrl: `${trimEnd(baseURL, "/")}/elfinder/tinymce5`,
    },
    <%_ } _%>
  },
});
