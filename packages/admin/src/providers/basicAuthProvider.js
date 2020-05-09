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
      user: "/api/user",
    },
    getName: (u) => u.name,
    getEmail: (u) => u.email,
    getPermissions: (u) => u.roles,
    ...options,
  };

  let { routes, getName, getEmail, getPermissions } = options;

  return {
    [LOGIN]: async ({ username, password }) => {
      axios.defaults.auth = {
        username,
        password,
      };
    },
    [LOGOUT]: () => {
      delete axios.defaults.auth;
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      if (!axios.defaults.auth) {
        throw new Error("Unauthenticated");
      }

      let response = await axios.get(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.data;
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        delete axios.defaults.auth;
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
