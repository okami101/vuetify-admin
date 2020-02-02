export default (entrypoint, options = {}) => {
  options = {
    routes: {
      login: "auth/login",
      logout: "auth/logout",
      refresh: "auth/refresh",
      user: "auth/me"
    },
    tokenProp: "access_token",
    credentials: ({ username, password }) => {
      return {
        username,
        password
      };
    },
    ...options
  };

  let { routes, credentials } = options;

  const doAuthenticatedAction = route => {
    return fetch(`${entrypoint}/${route}`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      })
    });
  };

  return {
    login: async ({ username, password }) => {
      console.log(credentials({ username, password }));
      let response = await fetch(`${entrypoint}/${routes.login}`, {
        method: "POST",
        body: JSON.stringify(credentials({ username, password })),
        headers: new Headers({ "Content-Type": "application/json" })
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      response = await response.json();
      localStorage.setItem("token", response[options.tokenProp]);
    },
    logout: async () => {
      if (routes.logout) {
        await doAuthenticatedAction(routes.logout);
      }

      localStorage.removeItem("token");
      return Promise.resolve();
    },
    refresh: async () => {
      if (routes.refresh) {
        await doAuthenticatedAction(routes.refresh);
      }
      return Promise.resolve();
    },
    getUser: async () => {
      let response = await doAuthenticatedAction(routes.user);

      return await response.json();
    },
    getPermissions: user => {
      return Promise.resolve(user.roles);
    }
  };
};
