const methods = [
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

export default (provider, resource, actions) => {
  let storeActions = {};

  methods.forEach(
    action =>
      (storeActions[action] = ({}, params) => {
        return provider[action](resource, params);
      })
  );

  return {
    namespaced: true,
    state: {
      actions
    },
    getters: {
      can: state => action => {
        return state.actions.includes(action);
      }
    },
    actions: storeActions
  };
};
