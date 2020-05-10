import Vue from "vue";
import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";

/**
 * Autoload resources
 */
const requireComponent = require.context("@/resources", true, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = fileName
    .replace(/^\.\//, "")
    .replace(/\//, "")
    .replace(/\.\w+$/, "");

  Vue.component(
    upperFirst(camelCase(componentName)),
    componentConfig.default || componentConfig
  );
});
