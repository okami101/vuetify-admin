import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "./actions";

import FetchHydra from "../utils/fetchHydra";

export default (httpClient, params = {}) => {
  if (typeof httpClient === "string") {
    httpClient = new FetchHydra(httpClient);
  }

  params = {
    routes: {
      login: "api/auth/login",
      logout: "api/auth/logout",
      refresh: "api/auth/refresh",
      user: "api/auth/me",
    },
    storageKey: "jwt_token",
    getToken: (r) => r.access_token,
    getCredentials: ({ username, password }) => {
      return {
        email: username,
        password,
      };
    },
    getName: (u) => u.name,
    getEmail: (u) => u.email,
    getPermissions: (u) => u.roles,
    ...params,
  };

  let {
    routes,
    storageKey,
    getCredentials,
    getName,
    getEmail,
    getPermissions,
    getToken,
  } = params;

  return {
    [LOGIN]: async ({ username, password }) => {
      let response = await httpClient.post(
        routes.login,
        getCredentials({ username, password })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      localStorage.setItem(storageKey, getToken(response.data));
      return Promise.resolve();
    },
    [LOGOUT]: async () => {
      if (routes.logout) {
        await httpClient.post(routes.logout);
      }

      localStorage.removeItem(storageKey);
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      /**
       * Refresh token
       */
      if (routes.refresh) {
        let response = await httpClient.post(routes.refresh);
        localStorage.setItem(storageKey, getToken(response.data));
      }

      /**
       * Get user infos
       */
      if (routes.user) {
        let response = await httpClient.post(routes.user);

        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }

        return response.data;
      }

      return localStorage.getItem(storageKey)
        ? Promise.resolve({
            data: true,
          })
        : Promise.reject();
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem(storageKey);
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_NAME]: (user) => getName(user),
    [GET_EMAIL]: (user) => getEmail(user),
    [GET_PERMISSIONS]: (user) => getPermissions(user),
  };
};
