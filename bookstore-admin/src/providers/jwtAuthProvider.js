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
      username, password;
    },
    ...options
  };

  return {
    login: async ({ username, password }) => {
      let response = await fetch(`${entrypoint}/${options.routes.login}`, {
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
    logout: () => {
      localStorage.removeItem("token");
      return Promise.resolve();
    },
    checkError: error => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    checkAuth: () => {
      return localStorage.getItem("token")
        ? Promise.resolve()
        : Promise.reject();
    },
    getPermissions: () => {
      const role = localStorage.getItem("permissions");
      return role ? Promise.resolve(role) : Promise.reject();
    }
  };
};
