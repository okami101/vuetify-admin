import isEmpty from "lodash/isEmpty";

import loadI18n from "./i18n";
import aside from "./store/aside";
import messages from "./store/messages";
import auth from "./store/auth";
import guest from "./store/guest";
import api from "./store/api";

import resourceCrudModule from "./store/resource";
import resourceCrudRoutes from "./router/resource";

export default class VtecAdmin {
  constructor({
    router,
    store,
    i18n,
    title,
    routes,
    locales,
    translations,
    authProvider,
    dataProvider,
    fileBrowserUrl,
    resources,
  }) {
    /**
     * Options properties
     */
    this.title = title;
    this.locales = locales;
    this.translations = translations;
    this.authProvider = authProvider;
    this.dataProvider = dataProvider;
    this.fileBrowserUrl = fileBrowserUrl;

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
            if ((r.actions || []).length) {
              return r.actions.includes(a);
            }

            if ((r.except || []).length) {
              return !r.except.includes(a);
            }

            return true;
          }),
          getPermissions: (action) => {
            return r.permissions
              .filter((p) => {
                return typeof p === "string" || p.actions.includes(action);
              })
              .map((p) => {
                return typeof p === "string" ? p : p.name;
              });
          },
        };
      });

    /**
     * Prepare Vue I18n
     */
    loadI18n({ i18n, locales });

    /**
     * Auth store & api dispatcher module injection
     */
    store.registerModule("aside", aside);
    store.registerModule("messages", messages);
    store.registerModule("api", api);
    store.registerModule(
      "auth",
      this.authProvider ? auth(this.authProvider, router) : guest
    );

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
    routes.children = (routes.children || []).concat(
      this.resources.map((resource) =>
        resourceCrudRoutes({
          store,
          i18n,
          resource,
          title: this.title,
        })
      )
    );

    router.addRoutes([routes]);

    /**
     * Permissions helper & directive
     */
    this.can = (permissions) =>
      !authProvider ||
      isEmpty(permissions) ||
      !isEmpty(
        (Array.isArray(permissions) ? permissions : [permissions]).filter(
          (p) => -1 !== store.getters["auth/getPermissions"].indexOf(p)
        )
      );

    /**
     * Link resource helper
     */
    this.getResourceLink = (name, action = "list") => {
      let { icon, getPermissions } = this.resources.find(
        (r) => r.name === name
      );

      /**
       * For permissions, if advanced object return name only if action is inlcuded into
       */
      return {
        icon,
        text: i18n.tc(`resources.${name}.name`, 10),
        link: { name: `${name}_${action}` },
        permissions: getPermissions(action),
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
      if (to.name !== from.name) {
        /**
         * Set main and document title
         */
        document.title = to.meta.title
          ? `${to.meta.title} | ${this.title}`
          : this.title;

        /**
         * Auto close aside
         */
        store.commit("aside/close");

        /**
         * Check and refresh authenticated user with last permissions
         * after each navigation
         */
        await store.dispatch("auth/checkAuth", to);
      }

      next();
    });
  }
}
