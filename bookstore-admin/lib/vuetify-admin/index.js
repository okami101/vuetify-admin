import Admin from "./components/Admin";
import Resource from "./components/Resource";

const components = [Admin, Resource];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
