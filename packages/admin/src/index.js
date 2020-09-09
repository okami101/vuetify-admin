/**
 * All UI Vue Components
 */
import * as layout from "./components/layout";
import * as ui from "./components/ui";
import * as guessers from "./components/guessers";

/**
 * Main JS App
 */
import VuetifyAdmin from "./admin";

/**
 * Main admin entry
 */
export default VuetifyAdmin;

/**
 * Vue install plugin
 */
VuetifyAdmin.install = (Vue) => {
  /**
   * Register Admin UI components
   */
  [layout, ui, guessers].forEach((c) => {
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
