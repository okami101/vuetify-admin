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
import objectToFormData from "./utils/objectToFormData";
import {
  laravelDataProvider,
  sanctumAuthProvider,
  jwtAuthProvider,
} from "./providers";
import { en, fr } from "./locales";

/**
 * Main admin entry
 */
export default VtecAdmin;

/**
 * Some utils
 */
export { objectToFormData };

/**
 * All providers
 */
export { laravelDataProvider, sanctumAuthProvider, jwtAuthProvider };

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
