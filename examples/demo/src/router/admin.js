import AdminLayout from "@/layouts/Admin";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";
import Feedback from "@/views/Feedback";
import Settings from "@/views/Settings";
import Help from "@/views/Help";
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
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        title: i18n.t("routes.profile"),
      },
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
      path: "/help",
      name: "help",
      component: Help,
      meta: {
        title: i18n.t("routes.help"),
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings,
      meta: {
        title: i18n.t("routes.settings"),
      },
    },
    {
      path: "/feedback",
      name: "feedback",
      component: Feedback,
      meta: {
        title: i18n.t("routes.feedback"),
      },
    },
  ],
};
