import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../../lib/vuetify-admin/views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/contacts",
    name: "contacts",
    component: () => import("../views/Contacts")
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/Help")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/Settings")
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("../views/Feedback")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
