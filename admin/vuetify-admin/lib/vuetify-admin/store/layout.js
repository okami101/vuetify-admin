import {
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "../utils/dataActions";

export default i18n => {
  return {
    namespaced: true,
    state: {
      title: "Vuetify Admin",
      loading: false,
      showSnackbar: false,
      snackbarText: null,
      snackbarColor: null
    },
    mutations: {
      setTitle(state, title) {
        state.title = title;
      },
      setLoading(state, loading) {
        state.loading = loading;
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
    actions: {
      showSuccess({ commit }, { action, resource, params }) {
        let messages = {
          [CREATE]: () =>
            i18n.t("va.messages.created", {
              resource: i18n.tc(`resources.${resource}`, 1)
            }),
          [UPDATE]: () =>
            i18n.t("va.messages.updated", {
              resource: i18n.tc(`resources.${resource}`, 1),
              id: params.id
            }),
          [UPDATE_MANY]: () =>
            i18n.t("va.messages.updated_many", {
              resource: i18n
                .tc(`resources.${resource}`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length
            }),
          [DELETE]: () =>
            i18n.t("va.messages.deleted", {
              resource: i18n.tc(`resources.${resource}`, 1),
              id: params.id
            }),
          [DELETE_MANY]: () =>
            i18n.t("va.messages.deleted_many", {
              resource: i18n
                .tc(`resources.${resource}`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length
            })
        };

        if (messages[action]) {
          commit("showSuccess", messages[action]());
        }
      }
    }
  };
};
