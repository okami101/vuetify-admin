import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "../utils/authActions";

export default (provider, router) => {
  return {
    namespaced: true,
    state: { user: null, loaded: false },
    mutations: {
      setUser(state, user) {
        state.user = user;
        state.loaded = true;
      },
    },
    getters: {
      [GET_NAME](state) {
        if (state.user) {
          return provider.getName(state.user);
        }
      },
      [GET_EMAIL](state) {
        if (state.user) {
          return provider.getEmail(state.user);
        }
      },
      [GET_PERMISSIONS](state) {
        if (state.user) {
          return provider.getPermissions(state.user);
        }
        return [];
      },
    },
    actions: {
      /**
       * Server login with given credentials
       * checkAuth action will set fresh user infos on store automatically
       */
      [LOGIN]: async ({}, credentials) => {
        await provider.login(credentials);
        router.push("/");
      },
      /**
       * Explicit logout action, remove user from storage
       */
      [LOGOUT]: async ({ state }) => {
        if (state.user) {
          await provider.logout();
          router.push("/login");
        }
      },
      /**
       * Check valid auth on target route server by retrieving user infos
       * Set fresh user infos on store
       * Called after each URL navigation
       */
      [CHECK_AUTH]: async ({ commit }, route = null) => {
        const isLoginPage = (route || router.currentRoute).name === "login";

        try {
          let { data } = await provider.checkAuth();
          commit("setUser", data);

          if (isLoginPage) {
            router.push("/");
          }
        } catch (e) {
          commit("setUser", null);

          if (!isLoginPage) {
            router.push("/login");
          }
        }
      },
      /**
       * Check API error status
       * Called after each API error (4xx, 5xx)
       * Do automatic logout if reject promise returned
       */
      [CHECK_ERROR]: async ({ dispatch }, error) => {
        try {
          await provider.checkError(error);
        } catch (e) {
          dispatch("logout");
        }
      },
    },
  };
};
