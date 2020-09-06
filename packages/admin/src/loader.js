import Vue from "vue";
import "./resources";

/**
 * Load external libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Import dynamic and custom extended vuetify components
 */
import { VAutocomplete, VCombobox, VDraggableTreeview } from "./vuetify";

/**
 * Explicit registering of this components because dynamic
 */
Vue.component("VAutocomplete", VAutocomplete);
Vue.component("VCombobox", VCombobox);
Vue.component("VDraggableTreeview", VDraggableTreeview);

/**
 * Register portal and draggable
 */
Vue.use(PortalVue);
Vue.component("draggable", draggable);

/**
 * Include guess logger on dev only
 */
if (process.env.NODE_ENV === "development") {
  import("./utils/guess-logger").then(({ logger }) => {
    Vue.prototype.$guessLogger = logger;
  });
}
