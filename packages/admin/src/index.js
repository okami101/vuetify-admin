/**
 * All UI Vue Components
 */
import * as core from "./components/core";
import * as layout from "./components/layout";
import * as ui from "./components/ui";

/**
 * Main JS App
 */
import VtecAdmin from "./admin";

/**
 * Main admin entry
 */
export default VtecAdmin;

/**
 * Vue install plugin
 */
VtecAdmin.install = (Vue) => {
  /**
   * Register Admin UI components
   */
  [core, layout, ui].forEach((c) => {
    Object.keys(c).forEach((name) => {
      Vue.component(`Va${name}`, c[name]);
    });
  });

  /**
   * Inject global admin conf
   */
  Vue.mixin({
    beforeCreate() {
      this.$admin = this.$root.$options.admin;
    },
  });
};
