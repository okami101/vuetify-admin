import Vue from "vue";
import VueRouter from "vue-router";
import AuthLayout from "@/layouts/Auth";
import Login from "@/views/auth/Login";
import i18n from "@/i18n";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
          title: i18n.t("routes.login"),
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
