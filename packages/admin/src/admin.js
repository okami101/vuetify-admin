import isEmpty from "lodash/isEmpty";
import upperFirst from "lodash/upperFirst";

import aside from "./store/aside";
import messages from "./store/messages";
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
    this.resources = Object.keys(resources)
      .map((name) => {
        return {
          name,
          ...resources[name],
        };
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
     * I18n date format
     */
    i18n.setDateTimeFormat("en", {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      },
      longWithTime: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    });

    i18n.setDateTimeFormat("fr", {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      },
      longWithTime: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    });

    /**
     * I18n number format
     */
    i18n.setNumberFormat("en", {
      currency: {
        style: "currency",
        currency: "USD",
      },
    });

    i18n.setNumberFormat("fr", {
      currency: {
        style: "currency",
        currency: "EUR",
      },
    });

    /**
     * Auth store & api dispatcher module injection
     */
    store.registerModule("aside", aside);
    store.registerModule("messages", messages);
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
     * Global confirm dialog function
     */
    this.confirm = (title, message) =>
      store.dispatch("messages/confirm", { title, message });

    /**
     * Global toaster object
     */
    this.toast = ["success", "error", "info", "warning", "message"].reduce(
      (o, action) => ({
        ...o,
        [action]: (message) =>
          store.commit("messages/showToast", {
            color: action !== "message" ? action : null,
            message,
          }),
      }),
      {}
    );

    /**
     * Check Auth after each navigation
     */
    router.beforeEach(async (to, from, next) => {
      let go = () => {
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
      };

      /**
       * Check and reload authenticated user with permissions
       * after each navigation
       */
      let authenticated = await store.dispatch("auth/checkAuth");

      /**
       * Redirect to home if login page and connected
       */
      if (to.name === "login") {
        return authenticated ? next("/") : go();
      }

      if (authenticated) {
        return go();
      }

      /**
       * Fallback to login if not authenticated
       */
      next("/login");
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
