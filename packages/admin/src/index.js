/**
 * All UI Vue Components
 */
import * as core from "./components/Core";
import * as layout from "./components/Layout";
import * as ui from "./components/UI";

/**
 * Main JS App
 */
import VtecAdmin from "./admin";
import { laravelDataProvider, sanctumAuthProvider } from "./providers";
import { en, fr } from "./locales";

/**
 * Main admin entry
 */
export default VtecAdmin;

/**
 * All providers
 */
export { laravelDataProvider, sanctumAuthProvider };

/**
 * All locales
 */
export { en, fr };

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
