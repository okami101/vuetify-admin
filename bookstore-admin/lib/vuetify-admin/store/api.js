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

actions.forEach(action => {
  storeActions[action] = async ({ state, commit, dispatch }, params) => {
    commit("setLoading", { action, loading: true });

    try {
      let response = await dispatch(`${state.resourceName}/${action}`, params, {
        root: true
      });

      commit("setLoading", { action, loading: false });

      switch (action) {
        case "getOne":
          commit("setResource", response);
          break;
        case "create":
          commit(
            "showSuccess",
            `New ${state.resourceLabel.toLowerCase()} created !`
          );
          break;
        case "update":
          commit(
            "showSuccess",
            `${state.resourceLabel} #${params.id} updated !`
          );
          break;
        case "updateMany":
          commit("showSuccess", `${params.ids.length} items updated !`);
          break;
        case "delete":
          commit(
            "showSuccess",
            `${state.resourceLabel} #${params.id} deleted !`
          );
          break;
        case "deleteMany":
          commit("showSuccess", `${params.ids.length} items deleted !`);
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

export default {
  namespaced: true,
  state: {
    loading: false,
    showSnackbar: false,
    snackbarText: null,
    snackbarColor: null,
    resourceName: null,
    resourceLabel: null,
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
    setResource(state, resource) {
      state.resource = resource;
    },
    setResourceName(state, name) {
      state.resourceName = name;
    },
    setResourceLabel(state, label) {
      state.resourceLabel = label;
    },
    removeCurrentResource(state) {
      state.resource = null;
      state.resourceName = null;
      state.resourceLabel = null;
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
