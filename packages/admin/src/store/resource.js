import * as methods from "../providers/data/actions";

let storeActions = {};
let {
  GET_LIST,
  GET_TREE,
  GET_NODES,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  MOVE_NODE,
} = methods;

export default ({ provider, resource, i18n }) => {
  let { name, api, getName } = resource;

  Object.values(methods).forEach(
    (action) =>
      (storeActions[action] = async ({ state, commit, dispatch }, params) => {
        try {
          if (!provider) {
            throw new Error("No data provider defined");
          }

          if (!provider[action]) {
            throw new Error(`Data provider action '${action}' not implemented`);
          }

          /**
           * Only set global loading when read actions
           */
          if ([GET_LIST, GET_TREE, GET_NODES, GET_ONE].includes(action)) {
            commit("api/setLoading", true, {
              root: true,
            });
          }

          let response = await provider[action](api || name, {
            locale: state.locale,
            ...params,
          });

          commit("api/setLoading", false, {
            root: true,
          });

          /**
           * Apply success message on writes operations
           */
          dispatch("showSuccess", { action, params });
          return Promise.resolve(response);
        } catch (e) {
          commit("api/setLoading", false, {
            root: true,
          });

          dispatch("showError", e.message);
          dispatch("auth/checkError", e, {
            root: true,
          });
          return Promise.reject(e);
        }
      })
  );

  return {
    namespaced: true,
    state: {
      item: null,
      locale: i18n.locale,
    },
    mutations: {
      setItem(state, item) {
        state.item = item;
      },
      removeItem(state) {
        state.item = null;
      },
      setLocale(state, code) {
        state.locale = code;
      },
    },
    actions: {
      ...storeActions,
      async refresh({ state, commit, dispatch }) {
        if (state.item) {
          /**
           * Refresh current resource and update item state
           */
          let { data } = await dispatch(GET_ONE, {
            id: state.item.id,
          });

          commit("setItem", data);
        }
      },
      changeLocale({ commit, dispatch }, code) {
        /**
         * Change locale and refresh
         */
        commit("setLocale", code);
        dispatch("refresh");
      },
      showSuccess({ commit }, { action, params }) {
        let messages = {
          [CREATE]: () =>
            i18n.t("va.messages.created", {
              resource: getName(1),
            }),
          [UPDATE]: () =>
            i18n.t("va.messages.updated", {
              resource: getName(1),
              id: params.id,
            }),
          [UPDATE_MANY]: () =>
            i18n.t("va.messages.updated_many", {
              resource: getName(params.ids.length).toLowerCase(),
              count: params.ids.length,
            }),
          [DELETE]: () =>
            i18n.t("va.messages.deleted", {
              resource: getName(1),
              id: params.id,
            }),
          [DELETE_MANY]: () =>
            i18n.t("va.messages.deleted_many", {
              resource: getName(params.ids.length).toLowerCase(),
              count: params.ids.length,
            }),
          [MOVE_NODE]: () =>
            i18n.t("va.messages.moved", {
              resource: getName(1),
              id: params.id,
            }),
        };

        if (messages[action]) {
          commit(
            "messages/showToast",
            { color: "success", message: messages[action]() },
            {
              root: true,
            }
          );
        }
      },
      showError({ commit }, message) {
        commit(
          "messages/showToast",
          { color: "error", message },
          {
            root: true,
          }
        );
      },
    },
  };
};
