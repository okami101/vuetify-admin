export default {
  state: { user: null },
  mutations: {
    setUser(user) {
      state.user = user;
    }
  }
};
