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
      user: null,
    },
    getName: (u) => u.name,
    getEmail: (u) => u.email,
    getPermissions: (u) => u.roles,
    ...params,
  };

  let { routes, getName, getEmail, getPermissions } = params;

  return {
    [LOGIN]: async ({ username, password }) => {
      axios.defaults.auth = {
        username,
        password,
      };
      return Promise.resolve();
    },
    [LOGOUT]: () => {
      delete axios.defaults.auth;
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      if (!axios.defaults.auth) {
        throw new Error("Unauthenticated");
      }

      if (!routes.user) {
        return Promise.resolve({
          data: {
            name: axios.defaults.auth.username,
          },
        });
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
    [GET_NAME]: (user) => getName(user),
    [GET_EMAIL]: (user) => getEmail(user),
    [GET_PERMISSIONS]: (user) => getPermissions(user),
  };
};
