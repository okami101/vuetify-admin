import * as methods from "../providers/data/actions";

let storeActions = {};

Object.values(methods).forEach((action) => {
  storeActions[action] = ({ dispatch }, { resource, params }) => {
    return dispatch(`${resource}/${action}`, params, {
      root: true,
    });
  };
});

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    ...storeActions,
    refresh({ dispatch }, resource) {
      return dispatch(
        `${resource}/refresh`,
        {},
        {
          root: true,
        }
      );
    },
  },
};
