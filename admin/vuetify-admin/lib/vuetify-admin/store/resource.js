import { DATA_PROVIDER_ACTIONS } from "../utils/actions";

export default (provider, resource, actions) => {
  let storeActions = {};

  DATA_PROVIDER_ACTIONS.forEach(
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
