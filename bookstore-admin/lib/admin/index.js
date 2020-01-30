import Admin from "./components/admin";

const components = [Admin];

export default {
  install(Vue, options) {
    components.forEach(component => {
      console.log(component.name);
      Vue.component(component.name, component);
    });
  }
};
