/* eslint-disable no-unused-vars */

import {
  GET_LIST,
  GET_MANY,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "vuetify-admin/src/providers/data/actions";

export default (httpClient) => {
  return {
    [GET_LIST]: (resource, params) => ({ data: [], total: 0 }),
    [GET_MANY]: (resource, params) => ({ data: [] }),
    [GET_ONE]: (resource, params) => ({ data: {} }),
    [CREATE]: (resource, params) => ({ data: {} }),
    [UPDATE]: (resource, params) => ({ data: {} }),
    [UPDATE_MANY]: (resource, params) =>
      Promise.all(params.ids.map((id) => Promise.resolve())).then(() =>
        Promise.resolve()
      ),
    [DELETE]: (resource, params) => Promise.resolve(),
    [DELETE_MANY]: (resource, params) =>
      Promise.all(params.ids.map((id) => Promise.resolve())).then(() =>
        Promise.resolve()
      ),
  };
};
