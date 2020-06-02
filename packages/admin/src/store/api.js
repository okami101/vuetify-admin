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
    refresh: false,
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;

      if (!loading) {
        state.refresh = false;
      }
    },
    setRefresh(state, refresh) {
      state.refresh = refresh;
    },
  },
  actions: {
    ...storeActions,
    refresh({ commit, dispatch }, resource) {
      if (!resource) {
        return;
      }

      commit("setRefresh", true);

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
