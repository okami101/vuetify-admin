import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      label: "Dashboard"
    }
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/Help"),
    meta: {
      label: "Help"
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/Settings"),
    meta: {
      label: "Settings"
    }
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("../views/Feedback"),
    meta: {
      label: "Feedback"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
