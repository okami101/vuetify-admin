import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS
} from "vuetify-admin/utils/authActions";

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
      }
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
      [LOGOUT]: async ({ commit }) => {
        await provider.logout();
        commit("setUser", null);
        router.push("/login");
      },
      /**
       * Check valid auth on server by retrieving user infos
       * Set fresh user infos on store
       * Called after each URL navigation
       */
      [CHECK_AUTH]: async ({ commit }) => {
        try {
          let user = await provider.checkAuth();
          commit("setUser", user);
        } catch (e) {
          commit("setUser", null);
          throw e;
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
      }
    }
  };
};
