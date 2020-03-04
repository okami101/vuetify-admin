export default (axios, options = {}) => {
  options = {
    routes: {
      login: "/login",
      logout: "/logout",
      user: "/user"
    },
    credentials: ({ username, password }) => {
      return {
        email: username,
        password
      };
    },
    getName: u => u.name,
    getEmail: u => u.email,
    getPermissions: u => u.roles,
    ...options
  };

  let { routes, credentials, getName, getEmail, getPermissions } = options;

  return {
    login: async ({ username, password }) => {
      /**
       * Get CSRF cookie
       */
      await axios.get("/airlock/csrf-cookie");

      let response = await axios.post(
        routes.login,
        credentials({ username, password })
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
    },
    logout: async () => {
      await axios.post(routes.logout);
      return Promise.resolve();
    },
    checkAuth: async () => {
      let response = await axios.get(routes.user);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
    checkError: ({ status }) => {
      if (status === 401 || status === 403) {
        return Promise.reject();
      }
      return Promise.resolve();
    },
    getName: user => {
      return getName(user);
    },
    getEmail: user => {
      return getEmail(user);
    },
    getPermissions: user => {
      return getPermissions(user);
    }
  };
};
