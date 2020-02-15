import EventBus from "../utils/eventBus";

const actions = [
  "getList",
  "getMany",
  "getManyReference",
  "getOne",
  "create",
  "update",
  "updateMany",
  "delete",
  "deleteMany"
];

let storeActions = {};

export default i18n => {
  actions.forEach(action => {
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

        switch (action) {
          case "getOne":
            commit("setResource", response);
            break;
          case "create":
            commit(
              "showSuccess",
              i18n.$t("va.messages.create", {
                resource: i18n
                  .tc(`resources.${state.resourceName}`, 1)
                  .toLowerCase()
              })
            );
            break;
          case "update":
            commit(
              "showSuccess",
              i18n.$t("va.messages.update", {
                resource: i18n
                  .tc(`resources.${state.resourceName}`, 1)
                  .toLowerCase(),
                id: params.id
              })
            );
            break;
          case "updateMany":
            commit(
              "showSuccess",
              i18n.$t("va.messages.update_many", {
                resource: i18n
                  .tc(`resources.${state.resourceName}`, params.ids.length)
                  .toLowerCase(),
                count: params.ids.length
              })
            );
            break;
          case "delete":
            commit(
              "showSuccess",
              i18n.$t("va.messages.delete", {
                resource: i18n
                  .tc(`resources.${state.resourceName}`, 1)
                  .toLowerCase(),
                id: params.id
              })`${state.resourceLabel} #${params.id} deleted !`
            );
            break;
          case "deleteMany":
            commit(
              "showSuccess",
              i18n.$t("va.messages.delete_many", {
                resource: i18n
                  .tc(`resources.${state.resourceName}`, params.ids.length)
                  .toLowerCase(),
                count: params.ids.length
              })
            );
            break;
        }

        return Promise.resolve(response);
      } catch (e) {
        commit("setLoading", { action, loading: false });
        commit("showError", e.message);
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
         * Global loading indicator only for main load operations
         */
        if (["getList", "getOne"].includes(action)) {
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
    actions: {
      ...storeActions,
      async refresh({ state, dispatch }) {
        if (state.resource) {
          await dispatch("getOne", {
            id: state.resource.id
          });
        }
        EventBus.$emit("refresh");
      }
    }
  };
};
