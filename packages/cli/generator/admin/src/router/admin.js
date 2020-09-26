import Vue from "vue";
import AdminLayout from "@/layouts/Admin";
import Dashboard from "@/views/Dashboard";
<%_ if (profile) { _%>
import Profile from "@/views/Profile";
<%_ } _%>
import Error from "@/views/Error";
import i18n from "@/i18n";

/**
 * Error component
 */
Vue.component("Error", Error);

export default {
  path: "",
  component: AdminLayout,
  meta: {
    title: i18n.t("routes.home"),
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: i18n.t("routes.dashboard"),
      },
    },
    <%_ if (profile) { _%>
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        title: i18n.t("routes.profile"),
      },
    },
    <%_ } _%>
    {
      path: "*",
      component: Error,
      meta: {
        title: i18n.t("routes.not_found"),
      },
    },
  ],
};
