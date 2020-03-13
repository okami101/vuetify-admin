import * as methods from "vuetify-admin/utils/dataActions";

let storeActions = {};

Object.values(methods).forEach(action => {
  storeActions[action] = async ({ dispatch }, { resource, params }) => {
    return await dispatch(`${resource}/${action}`, params, {
      root: true
    });
  };
});

export default {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    ...storeActions,
    async refresh({ dispatch }, resource) {
      await dispatch(
        `${resource}/refresh`,
        {},
        {
          root: true
        }
      );
    }
  }
};
