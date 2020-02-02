const supportedActions = [
  "getList",
  "getMany",
  "getManyReference",
  "getOne",
  "create",
  "update",
  "delete",
  "updateMany",
  "deleteMany"
];

export default provider => {
  let actions = {};

  supportedActions.forEach(method => {
    actions[method] = ({}, { resource, params }) => {
      return provider[method](resource, params);
    };
  });

  return {
    namespaced: true,
    state: { errors: {} },
    actions
  };
};
