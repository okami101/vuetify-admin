import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "./actions";

export default (axios, params = {}) => {
  params = {
    routes: {
      login: "/auth/login",
      logout: "/auth/logout",
      user: "/api/user",
      csrf: "/sanctum/csrf-cookie",
    },
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

  let { routes, getCredentials, getName, getEmail, getPermissions } = params;

  return {
    [LOGIN]: async ({ username, password }) => {
      /**
       * Get CSRF cookie
       */
      await axios.get(routes.csrf);

      let response = await axios.post(
        routes.login,
        getCredentials({ username, password })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      return Promise.resolve();
    },
    [LOGOUT]: async () => {
      await axios.post(routes.logout);
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      let response = await axios.get(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.data;
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_NAME]: (user) => getName(user),
    [GET_EMAIL]: (user) => getEmail(user),
    [GET_PERMISSIONS]: (user) => getPermissions(user),
  };
};
