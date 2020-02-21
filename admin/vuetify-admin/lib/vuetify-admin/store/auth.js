export default provider => {
  return {
    namespaced: true,
    state: { user: null, permissions: null },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
      setPermissions(state, permissions) {
        state.permissions = permissions;
      }
    },
    getters: {
      name(state) {
        return provider.getUsername(state.user);
      },
      email(state) {
        return provider.getUserEmail(state.user);
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
      loadUser: async ({ commit }, permissions = p => p) => {
        try {
          let user = await provider.getUser();
          commit("setUser", user);
          commit("setPermissions", permissions(provider.getPermissions(user)));
        } catch (e) {
          commit("setUser", null);
          commit("setPermissions", null);
          throw e;
        }
      }
    }
  };
};
