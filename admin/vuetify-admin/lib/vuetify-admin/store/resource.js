import * as methods from "../utils/dataActions";

export default (provider, resource, actions) => {
  let storeActions = {};

  Object.values(methods).forEach(
    action =>
      (storeActions[action] = ({}, params) => {
        return provider[action](resource, params);
      })
  );

  return {
    namespaced: true,
    state: {
      actions
    },
    getters: {
      can: state => action => {
        return state.actions.includes(action);
      }
    },
    actions: storeActions
  };
};
