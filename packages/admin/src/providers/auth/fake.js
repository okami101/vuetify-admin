import { LOGIN, LOGOUT, CHECK_AUTH, CHECK_ERROR, GET_NAME } from "./actions";

/**
 * Fake login for testing purpose without need of real auth server
 */
export default () => {
  return {
    [LOGIN]: ({ username }) => {
      localStorage.setItem("username", username);
    },
    [LOGOUT]: () => {
      localStorage.removeItem("username");
      return Promise.resolve();
    },
    [CHECK_AUTH]: () => {
      let name = localStorage.getItem("username");

      return name
        ? Promise.resolve({
            data: {
              name,
            },
          })
        : Promise.reject();
    },
    [CHECK_ERROR]: ({ status }) => {
      if (status === 401 || status === 403) {
        localStorage.removeItem("username");
        return Promise.reject();
      }
      return Promise.resolve();
    },
    [GET_NAME]: (u) => u.name,
  };
};
