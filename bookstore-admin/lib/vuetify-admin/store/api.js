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
    storeActions[action] = ({ dispatch }, params) => {
      return dispatch(
        `${router.currentRoute.meta.resource}/${action}`,
        params,
        { root: true }
      );
    };
  });

  return {
    namespaced: true,
    actions: storeActions
  };
};
