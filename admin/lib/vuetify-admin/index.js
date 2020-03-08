import Vue from "vue";
import * as core from "./components/Core";
import * as ui from "./components/UI";
import PortalVue from "portal-vue";
import isEmpty from "lodash/isEmpty";

import layout from "./store/layout";
import aside from "./store/aside";
import auth from "./store/auth";
import api from "./store/api";
import form from "./store/form";

import resourceCrudModule from "./store/resource";
import resourceCrudRoutes from "./router/resource";

export default {
  install(Vue) {
    Vue.use(PortalVue);

    [core, ui].forEach(c => {
      Object.keys(c).forEach(name => {
        Vue.component(`Va${name}`, c[name]);
      });
    });
  },
  init({
    router,
    store,
    i18n,
    locales,
    authProvider,
    dataProvider,
    resources
  }) {
    /**
     * Format usable resources object
     */
    resources = resources
      .map(r => {
        return typeof r === "string"
          ? {
              name: r
            }
          : r;
      })
      .map(r => {
        return {
          ...r,
          actions: ["list", "show", "create", "edit", "delete"].filter(a => {
            if ((r.only || []).length) {
              return r.only.includes(a);
            }

            if ((r.except || []).length) {
              return !r.except.includes(a);
            }

            return true;
          })
        };
      });

    /**
     * Load i18n locales
     */
    Object.keys(locales).forEach(locale => {
      i18n.mergeLocaleMessage(locale, { va: locales[locale] });
    });

    /**
     * Auth store & api dispatcher module injection
     */
    store.registerModule("layout", layout(i18n));
    store.registerModule("aside", aside);
    store.registerModule("api", api);
    store.registerModule("auth", auth(authProvider, router));
    store.registerModule("form", form);

    /**
     * Add API resources modules dynamically
     */
    resources.forEach(r =>
      store.registerModule(
        r.name,
        resourceCrudModule(dataProvider, r.name, r.actions)
      )
    );

    /**
     * Add resources routes dynamically
     */
    router.addRoutes(
      resources.map(r => resourceCrudRoutes(store, i18n, r.name, r.actions))
    );

    /**
     * Check Auth after each navigation
     */
    router.beforeEach(async (to, from, next) => {
      if (to.path !== from.path) {
        /**
         * Check and reload authenticated user with permissions
         * after each navigation
         */
        if (to.name !== "login") {
          await store.dispatch("auth/checkAuth");
        }

        store.commit("aside/close");
      }

      next();
    });

    /**
     * Permissions helper & directive
     */
    const can = permissions => {
      return !isEmpty(
        (Array.isArray(permissions) ? permissions : [permissions]).filter(
          p => -1 !== store.getters["auth/getPermissions"].indexOf(p)
        )
      );
    };

    Vue.directive("can", (el, binding, vnode) => {
      if (!can(binding.value)) {
        // replace HTMLElement with comment node
        const comment = document.createComment("");
        vnode.elm = comment;
        vnode.text = "";
        vnode.isComment = true;

        if (el.parentNode) {
          el.parentNode.replaceChild(comment, el);
        }
      }
    });
    Vue.prototype.$can = can;
  }
};
