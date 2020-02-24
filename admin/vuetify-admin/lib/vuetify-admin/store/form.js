export default {
  namespaced: true,
  state: {
    model: {},
    errors: {},
    saving: false
  },
  mutations: {
    update(state, { source, value }) {
      state.model[source] = value === undefined ? "" : value;
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setSaving(state, saving) {
      state.saving = saving;
    }
  },
  actions: {
    async save({ state, commit, dispatch }, resource) {
      commit("setSaving", true);

      try {
        await dispatch(`${resource}/save`, state.model, {
          root: true
        });

        commit("setSaving", false);
      } catch (e) {
        const { errors } = e;
        commit("setSaving", false);

        if (errors) {
          commit("setErrors", errors);
        }
        return Promise.reject(e);
      }
    }
  }
};
