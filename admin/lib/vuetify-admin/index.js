import * as core from "./components/Core";
import * as ui from "./components/UI";
import PortalVue from "portal-vue";

export default {
  install(Vue) {
    Vue.use(PortalVue);

    [core, ui].forEach(c => {
      Object.keys(c).forEach(name => {
        Vue.component(`Va${name}`, c[name]);
      });
    });
  }
};
