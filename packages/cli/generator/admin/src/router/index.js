import Vue from "vue";
import VueRouter from "vue-router";
<%_ if (auth) { _%>
import AuthLayout from "@/layouts/Auth";
import Login from "@/views/auth/Login";
<%_ if (register) { _%>
import Register from "@/views/auth/Register";
<%_ } _%>
<%_ if (reset) { _%>
import ForgotPassword from "@/views/auth/ForgotPassword";
import ResetPassword from "@/views/auth/ResetPassword";
<%_ } _%>
import i18n from "@/i18n";
<%_ } _%>

Vue.use(VueRouter);

const routes = [
  <%_ if (auth) { _%>
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
      <%_ if (register) { _%>
      {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
          title: i18n.t("routes.register"),
        },
      },
      <%_ } _%>
      <%_ if (reset) { _%>
      {
        path: "/forgot-password",
        name: "forgot_password",
        component: ForgotPassword,
        meta: {
          title: i18n.t("routes.forgot_password"),
        },
      },
      {
        path: "/reset-password/:token",
        name: "reset_password",
        component: ResetPassword,
        props: true,
        meta: {
          title: i18n.t("routes.reset_password"),
        },
      },
      <%_ } _%>
    ],
  },
  <%_ } _%>
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
