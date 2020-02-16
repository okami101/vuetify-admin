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
      name(state) {
        return provider.getUsername(state.user);
      },
      email(state) {
        return provider.getUserEmail(state.user);
      },
      permissions(state) {
        return provider.getPermissions(state.user);
      }
    },
    actions: {
      login: ({}, credentials) => {
        return provider.login(credentials);
      },
      logout: async ({ commit }) => {
        await provider.logout();
        commit("setUser", null);
      },
      loadUser: async ({ commit }) => {
        try {
          let user = await provider.getUser();
          commit("setUser", user);
        } catch (e) {
          commit("setUser", null);
          throw e;
        }
      }
    }
  };
};
