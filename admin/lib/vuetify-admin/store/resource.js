import EventBus from "vuetify-admin/utils/eventBus";
import * as methods from "../utils/dataActions";

let storeActions = {};
let {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} = methods;

export default ({ provider, resource, i18n, app }) => {
  let { name } = resource;

  Object.values(methods).forEach(
    (action) =>
      (storeActions[action] = async ({ state, commit, dispatch }, params) => {
        try {
          /**
           * Only set global loading when read actions
           */
          if ([GET_LIST, GET_ONE].includes(action)) {
            commit("api/setLoading", true, {
              root: true,
            });
          }

          let response = await provider[action](name, {
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
          if (e.response) {
            dispatch("showError", e.response.data.message);
          }
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
      locale: null,
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
        EventBus.$emit("refresh");
      },
      changeLocale({ commit, dispatch }, code) {
        /**
         * Change locale and refresh
         */
        commit("setLocale", code);
        dispatch("refresh");
      },
      showSuccess({}, { action, params }) {
        let messages = {
          [CREATE]: () =>
            i18n.t("va.messages.created", {
              resource: i18n.tc(`resources.${name}.name`, 1),
            }),
          [UPDATE]: () =>
            i18n.t("va.messages.updated", {
              resource: i18n.tc(`resources.${name}.name`, 1),
              id: params.id,
            }),
          [UPDATE_MANY]: () =>
            i18n.t("va.messages.updated_many", {
              resource: i18n
                .tc(`resources.${name}.name`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length,
            }),
          [DELETE]: () =>
            i18n.t("va.messages.deleted", {
              resource: i18n.tc(`resources.${name}.name`, 1),
              id: params.id,
            }),
          [DELETE_MANY]: () =>
            i18n.t("va.messages.deleted_many", {
              resource: i18n
                .tc(`resources.${name}.name`, params.ids.length)
                .toLowerCase(),
              count: params.ids.length,
            }),
        };

        if (messages[action]) {
          this._vm.$snackbar.success(messages[action]());
        }
      },
      showError({}, message) {
        this._vm.$snackbar.error(message);
      },
    },
  };
};
