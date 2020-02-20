export default {
  namespaced: true,
  state: {
    model: {},
    errors: {},
    saving: false
  },
  mutations: {
    update(state, { source, value }) {
      state.model[source] = value || "";
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setSaving(state, saving) {
      state.saving = saving;
    }
  },
  actions: {
    async save({ state, commit, dispatch }) {
      commit("setSaving", true);

      try {
        await dispatch("api/save", state.model, {
          root: true
        });

        commit("setSaving", false);
      } catch (e) {
        const { status, errors } = e;
        commit("setSaving", false);

        if (errors) {
          commit("setErrors", errors);
        }
        return Promise.reject(e);
      }
    }
  }
};
