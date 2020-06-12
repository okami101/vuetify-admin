import AdminLayout from "@/layouts/Admin";
import Dashboard from "@/views/Dashboard";
import NotFound from "@/views/404";
import i18n from "@/i18n";

export default {
  path: "/",
  component: AdminLayout,
  meta: {
    title: i18n.t("routes.home"),
  },
  children: [
    {
      path: "",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: i18n.t("routes.dashboard"),
      },
    },
    {
      path: "*",
      name: "not_found",
      component: NotFound,
      meta: {
        title: i18n.t("routes.not_found"),
      },
    },
  ],
};
