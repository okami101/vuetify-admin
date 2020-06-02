import AdminLayout from "@/layouts/Admin";
import Dashboard from "@/views/Dashboard";
<%_ if (auth) { _%>
import Profile from "@/views/Profile";
<%_ } _%>
import i18n from "@/i18n";

export default {
  path: "/",
  name: "home",
  redirect: "/dashboard",
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
      <%_ if (auth) { _%>
      {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
          title: i18n.t("routes.profile"),
        },
      },
      <%_ } _%>
    },
  ],
};
