import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "../../utils/authActions";

export default (axios, options = {}) => {
  options = {
    routes: {
      login: "api/auth/login",
      logout: "api/auth/logout",
      refresh: "api/auth/refresh",
      user: "api/auth/me",
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

  /**
   * Set token from localStorage to axios authorization header
   */
  const updateToken = () => {
    delete axios.defaults.headers.common["Authorization"];
    let token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  updateToken();

  return {
    [LOGIN]: async ({ username, password }) => {
      let response = await axios.post(
        routes.login,
        credentials({ username, password })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      localStorage.setItem("token", response.data[tokenProp]);
      updateToken();
    },
    [LOGOUT]: async () => {
      await axios.post(routes.logout);

      localStorage.removeItem("token");
      updateToken();
      return Promise.resolve();
    },
    [CHECK_AUTH]: async () => {
      let response = await axios.post(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      /**
       * Refresh token
       */
      if (routes.refresh) {
        let response = await axios.post(routes.refresh);
        localStorage.setItem("token", response.data[tokenProp]);
        updateToken();
      }

      return response.data;
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        updateToken();
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
