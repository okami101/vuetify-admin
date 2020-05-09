import Vue from "vue";
import VueRouter from "vue-router";
import AdminLayout from "@/layouts/Admin";
import Login from "@/views/Login";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";
import i18n from "@/i18n";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: i18n.t("routes.login"),
    },
  },
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
    component: AdminLayout,
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
    ],
  },
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
