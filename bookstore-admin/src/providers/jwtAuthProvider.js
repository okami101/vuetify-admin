export default entrypoint => {
  return {
    login: async ({ username, password }) => {
      let response = await fetch(`${entrypoint}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" })
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      response = await response.json();
      localStorage.setItem("token", response.access_token);
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
