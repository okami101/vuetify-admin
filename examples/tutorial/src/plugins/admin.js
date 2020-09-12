import Vue from "vue";
import VuetifyAdmin from "vuetify-admin";

import {
  jsonServerDataProvider,
  fakeAuthProvider,
} from "vuetify-admin/src/providers";
import { en, fr } from "vuetify-admin/src/locales";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";

// #region Resources
/**
 * Users
 */
import UsersList from "@/resources/users/List";
import UsersShow from "@/resources/users/Show";
import UsersCreate from "@/resources/users/Create";
import UsersEdit from "@/resources/users/Edit";
import UsersForm from "@/resources/users/Form";

/**
 * Posts
 */
import PostsList from "@/resources/posts/List";
import PostsShow from "@/resources/posts/Show";
import PostsCreate from "@/resources/posts/Create";
import PostsEdit from "@/resources/posts/Edit";
import PostsForm from "@/resources/posts/Form";

/**
 * Users
 */
Vue.component("UsersList", UsersList);
Vue.component("UsersShow", UsersShow);
Vue.component("UsersCreate", UsersCreate);
Vue.component("UsersEdit", UsersEdit);
Vue.component("UsersForm", UsersForm);

/**
 * Posts
 */
Vue.component("PostsList", PostsList);
Vue.component("PostsShow", PostsShow);
Vue.component("PostsCreate", PostsCreate);
Vue.component("PostsEdit", PostsEdit);
Vue.component("PostsForm", PostsForm);
// #endregion

/**
 * Load Admin UI components
 */
Vue.use(VuetifyAdmin);

/**
 * Api URL
 */
const baseURL =
  process.env.VUE_APP_API_URL || "https://jsonplaceholder.okami101.io";

/**
 * Init admin
 */
export default new VuetifyAdmin({
  router,
  store,
  i18n,
  title: "Vuetify Admin",
  routes,
  locales: { en, fr },
  dataProvider: jsonServerDataProvider(baseURL),
  authProvider: fakeAuthProvider(),
  resources,
  options: {
    dateFormat: "long",
  },
});
