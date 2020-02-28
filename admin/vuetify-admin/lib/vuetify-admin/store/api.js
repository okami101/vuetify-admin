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
    loading: false,
    references: {}
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    addReferenceId(state, { resource, reference, id }) {
      if (!state.references[resource]) {
        state.references[resource] = {
          [reference]: [id]
        };
      }

      state.references[resource][reference] = [
        ...state.references[resource][reference],
        id
      ];
    },
    cleanReferences(state, { resource }) {
      delete state.references[resource];
      state.references = { ...state.references };
    }
  },
  getters: {
    item: (state, getters, rootState, rootGetters) => resource => {
      return rootState[resource].item;
    },
    can: (state, getters, rootState, rootGetters) => (resource, action) => {
      return rootGetters[`${resource}/can`](action);
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
