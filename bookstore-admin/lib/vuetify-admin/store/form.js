export default {
  namespaced: true,
  state: {
    model: {},
    errors: {},
    saving: false
  },
  mutations: {
    update(state, { source, value }) {
      state.model[source] = value;
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
      } catch ({ status, errors }) {
        if (status === 422) {
          this.errors = errors;
        }
      }

      commit("setSaving", false);
    }
  }
};
