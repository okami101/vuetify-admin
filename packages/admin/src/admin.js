import isEmpty from "lodash/isEmpty";
import upperFirst from "lodash/upperFirst";

import aside from "./store/aside";
import auth from "./store/auth";
import api from "./store/api";

import resourceCrudModule from "./store/resource";
import resourceCrudRoutes from "./router/resource";

export default class VtecAdmin {
  constructor({
    router,
    store,
    i18n,
    title,
    locales,
    authProvider,
    dataProvider,
    resources,
  }) {
    /**
     * Options properties
     */
    this.title = title;
    this.locales = locales;
    this.authProvider = authProvider;
    this.dataProvider = dataProvider;

    /**
     * Format usable resources object
     */
    this.resources = resources
      .map((r) => {
        return typeof r === "string"
          ? {
              name: r,
            }
          : r;
      })
      .map((r) => {
        return {
          ...r,
          icon: r.icon || "mdi-view-grid",
          actions: ["list", "show", "create", "edit", "delete"].filter((a) => {
            if ((r.only || []).length) {
              return r.only.includes(a);
            }

            if ((r.except || []).length) {
              return !r.except.includes(a);
            }

            return true;
          }),
        };
      });

    /**
     * Load i18n locales
     */
    Object.keys(this.locales.ui).forEach((locale) => {
      i18n.mergeLocaleMessage(locale, { va: this.locales.ui[locale] });
    });

    /**
     * Default try to humanize i18n locale
     */
    i18n.missing = (locale, key, vm, values) => {
      let label = key;
      let lastIndex = key.lastIndexOf(".");

      if (lastIndex !== -1) {
        label = key.substr(lastIndex + 1, key.length);
      }

      return upperFirst(label.replace("_", " "));
    };

    /**
     * Auth store & api dispatcher module injection
     */
    store.registerModule("aside", aside);
    store.registerModule("api", api);
    store.registerModule("auth", auth(this.authProvider, router));

    /**
     * Add API resources modules dynamically
     */
    this.resources.forEach((resource) =>
      store.registerModule(
        resource.name,
        resourceCrudModule({
          provider: this.dataProvider,
          resource,
          i18n,
        })
      )
    );

    /**
     * Add resources routes dynamically
     */
    router.addRoutes(
      this.resources.map((resource) =>
        resourceCrudRoutes({
          store,
          i18n,
          resource,
          title: this.title,
        })
      )
    );

    /**
     * Permissions helper & directive
     */
    this.can = (permissions) =>
      isEmpty(permissions) ||
      !isEmpty(
        (Array.isArray(permissions) ? permissions : [permissions]).filter(
          (p) => -1 !== store.getters["auth/getPermissions"].indexOf(p)
        )
      );

    /**
     * Link resource helper
     */
    this.getResourceLink = (name) => {
      let { icon, permissions } = this.resources.find((r) => r.name === name);

      return {
        icon,
        text: i18n.tc(`resources.${name}.name`, 10),
        link: `/${name}`,
        permissions,
      };
    };

    /**
     * Check Auth after each navigation
     */
    router.beforeEach((to, from, next) => {
      /**
       * Check and reload authenticated user with permissions
       * after each navigation
       */
      store.dispatch("auth/checkAuth");

      /**
       * Auto close aside
       */
      store.commit("aside/close");

      /**
       * Set main and document title
       */
      document.title = to.meta.title
        ? `${to.meta.title} | ${this.title}`
        : this.title;

      next();
    });

    /**
     * Recheck auth on app visible (switching tabs,...)
     */
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        store.dispatch("auth/checkAuth");
      }
    });
  }
}
