import Admin from "./components/Admin";

const components = [Admin];

export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};
