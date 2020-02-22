import EventBus from "vuetify-admin/utils/eventBus";
import * as methods from "vuetify-admin/utils/dataActions";

let storeActions = {};
let {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} = methods;

export default i18n => {
  Object.values(methods).forEach(action => {
    storeActions[action] = async ({ state, commit, dispatch }, params) => {
      commit("setLoading", { action, loading: true });

      try {
        let response = await dispatch(
          `${state.resourceName}/${action}`,
          params,
          {
            root: true
          }
        );

        commit("setLoading", { action, loading: false });

        if (action === GET_ONE) {
          /**
           * Set resource on store
           */
          commit("setResource", response.data);
        }

        /**
         * Apply success message on writes operations
         */
        dispatch("showSuccess", {
          action,
          resourceName: state.resourceName,
          params
        });
        return Promise.resolve(response);
      } catch (e) {
        commit("setLoading", { action, loading: false });
        commit("showError", e.message);

        dispatch("auth/checkError", e, {
          root: true
        });
        return Promise.reject(e);
      }
    };
  });

  return {
    namespaced: true,
    state: {
      title: "Vuetify Admin",
      loading: false,
      showSnackbar: false,
      snackbarText: null,
      snackbarColor: null,
      resourceName: null,
      resource: null
    },
    mutations: {
      setLoading(state, { action, loading }) {
        /**
         * Global loading indicator only for read load operations
         */
        if ([GET_LIST, GET_ONE].includes(action)) {
          state.loading = loading;
        }
      },
      setTitle(state, title) {
        state.title = title;
      },
      setResource(state, resource) {
        state.resource = resource;
      },
      setResourceName(state, name) {
        state.resourceName = name;
      },
      removeCurrentResource(state) {
        state.resource = null;
        state.resourceName = null;
      },
      showSuccess(state, text) {
        state.snackbarText = text;
        state.snackbarColor = "success";
        state.showSnackbar = true;
      },
      showError(state, text) {
        state.snackbarText = text;
        state.snackbarColor = "error";
        state.showSnackbar = true;
      },
      showInfo(state, text) {
        state.snackbarText = text;
        state.snackbarColor = "blue";
        state.showSnackbar = true;
      },
      closeSnackbar(state) {
        state.showSnackbar = false;
        state.snackbarText = null;
        state.snackbarColor = null;
      }
    },
    getters: {
      can: (state, getters, rootState, rootGetters) => action => {
        return rootGetters[`${state.resourceName}/can`](action);
      }
    },
    actions: {
      ...storeActions,
      showSuccess({ commit }, { action, resourceName, params }) {
        let messages = {
          [CREATE]: () =>
            i18n.t("va.messages.created", {
              resource: i18n.tc(`resources.${resourceName}`, 1).toLowerCase()
            }),
          [UPDATE]: () =>
            i18n.t("va.messages.updated", {
              resource: i18n.tc(`resources.${resourceName}`, 1),
              id: params.id
            }),
          [UPDATE_MANY]: () =>
            i18n.t("va.messages.updated_many", {
              resource: i18n
                .tc(`resources.${resourceName}`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length
            }),
          [DELETE]: () =>
            i18n.t("va.messages.deleted", {
              resource: i18n.tc(`resources.${resourceName}`, 1),
              id: params.id
            }),
          [DELETE_MANY]: () =>
            i18n.t("va.messages.deleted_many", {
              resource: i18n
                .tc(`resources.${resourceName}`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length
            })
        };

        if (messages[action]) {
          commit("showSuccess", messages[action]());
        }
      },
      async refresh({ state, dispatch }) {
        if (state.resource) {
          await dispatch(GET_ONE, {
            id: state.resource.id
          });
        }
        EventBus.$emit("refresh");
      },
      save({ state, dispatch }, data) {
        if (state.resource) {
          return dispatch(UPDATE, {
            id: state.resource.id,
            data
          });
        }

        return dispatch(CREATE, {
          data
        });
      }
    }
  };
};
