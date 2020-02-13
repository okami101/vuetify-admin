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

export default router => {
  let storeActions = {};

  actions.forEach(action => {
    storeActions[action] = async ({ commit, dispatch }, params) => {
      let { resource, label } = router.currentRoute.meta;

      try {
        let response = await dispatch(`${resource}/${action}`, params, {
          root: true
        });

        switch (action) {
          case "create":
            commit("showSuccess", `New ${label.toLowerCase()} created !`);
            break;
          case "update":
            commit("showSuccess", `${label} #${params.id} updated !`);
            break;
          case "updateMany":
            commit("showSuccess", `${params.ids.length} items updated !`);
            break;
          case "delete":
            commit("showSuccess", `${label} #${params.id} deleted !`);
            break;
          case "deleteMany":
            commit("showSuccess", `${params.ids.length} items deleted !`);
            break;
        }

        return Promise.resolve(response);
      } catch (e) {
        commit("showError", e.message);
        return Promise.reject(e);
      }
    };
  });

  return {
    namespaced: true,
    state: {
      loading: false,
      showSnackbar: false,
      snackbarText: null,
      snackbarColor: null
    },
    mutations: {
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
    actions: storeActions
  };
};
