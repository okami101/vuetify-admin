export default {
  namespaced: true,
  state: {
    aside: false
  },
  mutations: {
    openAside(state) {
      state.aside = true;
    },
    closeAside(state) {
      state.aside = false;
    },
    toggleAside(state) {
      state.aside = !state.aside;
    }
  }
};
