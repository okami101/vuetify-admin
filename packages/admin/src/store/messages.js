export default {
  namespaced: true,
  state: {
    confirm: null,
    resolve: null,
    reject: null,
    toast: null,
  },
  mutations: {
    showConfirm(state, { title, message }) {
      state.confirm = { title, message };
    },
    hideConfirm(state) {
      state.confirm = null;
    },
    setResolve(state, resolve) {
      state.resolve = resolve;
    },
    setReject(state, reject) {
      state.reject = reject;
    },
    showToast(state, { color, message }) {
      state.toast = { color, message };
    },
  },
  actions: {
    confirm({ commit }, { title, message }) {
      commit("showConfirm", { title, message });

      return new Promise((resolve, reject) => {
        commit("setResolve", resolve);
        commit("setReject", reject);
      });
    },
    agree({ state, commit }) {
      state.resolve(true);
      commit("hideConfirm");
    },
    cancel({ state, commit }) {
      state.resolve(false);
      commit("hideConfirm");
    },
  },
};
