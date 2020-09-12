/* eslint-disable no-unused-vars */

import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "vuetify-admin/src/providers/auth/actions";

/**
 * Implement compatible auth provider
 */
export default (httpClient) => {
  return {
    [LOGIN]: ({ username, password }) => Promise.resolve(),
    [LOGOUT]: () => Promise.resolve(),
    [CHECK_AUTH]: () => Promise.resolve(),
    [CHECK_ERROR]: ({ status }) => Promise.resolve(),
    [GET_NAME]: (u) => u.name,
    [GET_EMAIL]: (u) => u.email,
    [GET_PERMISSIONS]: (u) => u.permissions,
  };
};
