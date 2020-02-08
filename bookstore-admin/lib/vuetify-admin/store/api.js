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
      let response = await dispatch(`${resource}/${action}`, params, {
        root: true
      });

      switch (action) {
        case "create":
          commit("showSnackbar", `New ${label.toLowerCase()} created !`);
          break;
        case "update":
          commit("showSnackbar", `${label} #${params.id} updated !`);
          break;
        case "updateMany":
          commit("showSnackbar", `${params.ids.length} items updated !`);
          break;
        case "delete":
          commit("showSnackbar", `${label} #${params.id} deleted !`);
          break;
        case "deleteMany":
          commit("showSnackbar", `${params.ids.length} items deleted !`);
          break;
      }

      return response;
    };
  });

  return {
    namespaced: true,
    state: {
      showSnackbar: false,
      snackbarText: null
    },
    mutations: {
      showSnackbar(state, text) {
        state.showSnackbar = true;
        state.snackbarText = text;
      },
      closeSnackbar(state) {
        state.showSnackbar = false;
        state.snackbarText = null;
      }
    },
    actions: storeActions
  };
};
