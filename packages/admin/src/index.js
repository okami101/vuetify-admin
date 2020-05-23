/**
 * All UI Vue Components
 */
import * as layout from "./components/layout";
import * as ui from "./components/ui";
import field from "./mixins/field";
import input from "./mixins/input";

/**
 * Main JS App
 */
import VtecAdmin from "./admin";

/**
 * Main admin entry
 */
export default VtecAdmin;

/**
 * Mixins
 */
export { field, input };

/**
 * Vue install plugin
 */
VtecAdmin.install = (Vue) => {
  /**
   * Register Admin UI components
   */
  [layout, ui].forEach((c) => {
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
