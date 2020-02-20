const supportedActions = {
  list: ["getList", "getMany", "getManyReference"],
  show: ["getOne"],
  create: ["create"],
  edit: ["update", "updateMany"],
  delete: ["delete", "deleteMany"]
};

export default (provider, resource, actions) => {
  let storeActions = {};

  actions.forEach(action => {
    let methods = supportedActions[action];

    methods.forEach(method => {
      storeActions[method] = ({}, params) => {
        return provider[method](resource, params);
      };
    });
  });

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
