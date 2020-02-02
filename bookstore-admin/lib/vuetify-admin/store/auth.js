export default provider => {
  return {
    namespaced: true,
    state: { user: null },
    mutations: {
      setUser(state, user) {
        state.user = user;
      }
    },
    getters: {
      getUsername(state) {
        return provider.getUsername(state.user);
      },
      getUserEmail(state) {
        return provider.getUserEmail(state.user);
      },
      getPermissions(state) {
        return provider.getPermissions(state.user);
      }
    },
    actions: {
      login: async ({ dispatch }, credentials) => {
        await provider.login(credentials);
        await dispatch("loadUser");
      },
      logout: () => {
        provider.logout();
      },
      refresh: () => {
        provider.refresh();
      },
      loadUser: async ({ commit }) => {
        let user = await provider.getUser();
        commit("setUser", user);
      }
    }
  };
};
