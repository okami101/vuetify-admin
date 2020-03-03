export default (entrypoint, options = {}) => {
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

  const doAuthAction = (route, method, body) => {
    return fetch(`${entrypoint}${route}`, {
      method,
      body,
      credentials: "include",
      headers: new Headers({
        Accept: "application/json"
      })
    });
  };

  return {
    login: async ({ username, password }) => {
      /**
       * Get CSRF cookie
       */
      await fetch(`${entrypoint}/airlock/csrf-cookie`, {
        credentials: "include"
      });

      let response = await doAuthAction(
        routes.login,
        "POST",
        JSON.stringify(credentials({ username, password }))
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
    },
    logout: async () => {
      await doAuthAction(routes.logout, "POST");
      return Promise.resolve();
    },
    checkAuth: async () => {
      let response = await doAuthAction(routes.user, "GET");

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
