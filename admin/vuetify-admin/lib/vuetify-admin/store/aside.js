export default {
  namespaced: true,
  state: {
    opened: false
  },
  mutations: {
    open(state) {
      state.opened = true;
    },
    close(state) {
      state.opened = false;
    },
    toggle(state) {
      state.opened = !state.opened;
    }
  }
};
