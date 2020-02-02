export default (provider, router) => {
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
      login: async ({ dispatch }, credentials) => {
        await provider.login(credentials);
        await dispatch("loadUser");
      },
      logout: async ({ commit }) => {
        await provider.logout();
        commit("setUser", null);
        router.push("/login");
      },
      refresh: () => {
        provider.refresh();
      },
      loadUser: async ({ commit }) => {
        let isLoginPage = router.currentRoute.name === "login";
        try {
          let user = await provider.getUser();
          commit("setUser", user);

          /**
           * If login page redirect to home
           */
          if (isLoginPage) {
            router.push("/");
          }
        } catch (e) {
          /**
           * Redirect to login
           */
          commit("setUser", null);

          if (!isLoginPage) {
            router.push("/login");
          }
        }
      }
    }
  };
};
