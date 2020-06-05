import laravelDataProvider from "./data/laravel";
import jsonServerDataProvider from "./data/json-server";
import hydraDataProvider from "./data/hydra";
import jwtAuthProvider from "./auth/jwt";
import basicAuthProvider from "./auth/basic";
import fakeAuthProvider from "./auth/fake";
import sanctumAuthProvider from "./auth/sanctum";

export {
  laravelDataProvider,
  jsonServerDataProvider,
  hydraDataProvider,
  basicAuthProvider,
  jwtAuthProvider,
  fakeAuthProvider,
  sanctumAuthProvider,
};
