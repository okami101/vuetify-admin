import * as core from "./components/Core";
import * as ui from "./components/UI";

export default {
  install(Vue) {
    [core, ui].forEach(c => {
      Object.keys(c).forEach(name => {
        Vue.component(`Va${name}`, c[name]);
      });
    });
  }
};
