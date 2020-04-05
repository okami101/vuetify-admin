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
      login: "/login",
      logout: "/logout",
      user: "/user",
    },
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

  let { routes, credentials, getName, getEmail, getPermissions } = options;

  return {
    [LOGIN]: async ({ username, password }) => {
      /**
       * Get CSRF cookie
       */
      await axios.get("/sanctum/csrf-cookie");

      let response = await axios.post(
        routes.login,
        credentials({ username, password })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
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
