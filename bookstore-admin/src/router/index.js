import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login"
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: "/help",
    name: "help",
    component: () => import("../views/Help"),
    meta: {
      title: "Help"
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/Settings"),
    meta: {
      title: "Settings"
    }
  },
  {
    path: "/feedback",
    name: "feedback",
    component: () => import("../views/Feedback"),
    meta: {
      title: "Feedback"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
