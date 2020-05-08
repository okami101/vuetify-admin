import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "../utils/authActions";

export default (axios, options = {}) => {
  options = {
    routes: {
      login: "auth/login",
      logout: "auth/logout",
      refresh: "auth/refresh",
      user: "auth/me",
    },
    tokenProp: "access_token",
    credentials: ({ username, password }) => {
      return {
        email: username,
        password,
      };
    },
    getName: (u) => u.name,
    getEmail: (u) => u.email,
    getPermissions: (u) => u.roles,
    ...options,
  };

  let {
    routes,
    credentials,
    getName,
    getEmail,
    getPermissions,
    tokenProp,
  } = options;

  const doAuthenticatedAction = (route) => {
    return fetch(`/${route}`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    });
  };

  return {
    [LOGIN]: async ({ username, password }) => {
      let response = await fetch(`/${routes.login}`, {
        method: "POST",
        body: JSON.stringify(credentials({ username, password })),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      let json = await response.json();
      localStorage.setItem("token", json[tokenProp]);
    },
    [LOGOUT]: async () => {
      if (routes.logout) {
        await doAuthenticatedAction(routes.logout);
      }

      localStorage.removeItem("token");
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      let response = await doAuthenticatedAction(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      /**
       * Refresh token
       */
      if (routes.refresh) {
        let response = await doAuthenticatedAction(routes.refresh);
        let json = await response.json();
        localStorage.setItem("token", json[tokenProp]);
      }

      return response.json();
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_NAME]: (user) => {
      return getName(user);
    },
    [GET_EMAIL]: (user) => {
      return getEmail(user);
    },
    [GET_PERMISSIONS]: (user) => {
      return getPermissions(user);
    },
  };
};
