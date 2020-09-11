import laravelDataProvider from "./data/laravel";
import jsonServerDataProvider from "./data/json-server";
import simpleRestDataProvider from "./data/simple-rest";
import hydraDataProvider from "./data/hydra";
import jwtAuthProvider from "./auth/jwt";
import basicAuthProvider from "./auth/basic";
import fakeAuthProvider from "./auth/fake";
import sanctumAuthProvider from "./auth/sanctum";

export {
  laravelDataProvider,
  jsonServerDataProvider,
  simpleRestDataProvider,
  hydraDataProvider,
  basicAuthProvider,
  jwtAuthProvider,
  fakeAuthProvider,
  sanctumAuthProvider,
};
