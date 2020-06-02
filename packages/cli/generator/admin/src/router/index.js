import Vue from "vue";
import VueRouter from "vue-router";
<%_ if (auth) { _%>
import Login from "@/views/Login";
import i18n from "@/i18n";
<%_ } _%>

Vue.use(VueRouter);

const routes = [
  <%_ if (auth) { _%>
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: i18n.t("routes.login"),
    },
  },
  <%_ } _%>
];

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
