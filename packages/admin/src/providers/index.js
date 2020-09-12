import laravelDataProvider from "./data/laravel";
import jsonServerDataProvider from "./data/jsonServer";
import simpleRestDataProvider from "./data/simpleRest";
import hydraDataProvider from "./data/hydra";
import jwtAuthProvider from "./auth/jwt";
import basicAuthProvider from "./auth/basic";
import fakeAuthProvider from "./auth/fake";
import sanctumAuthProvider from "./auth/sanctum";

import FetchJson from "./utils/fetchJson";
import FetchHydra from "./utils/fetchHydra";
import objectToFormData from "./utils/objectToFormData";

export {
  laravelDataProvider,
  jsonServerDataProvider,
  simpleRestDataProvider,
  hydraDataProvider,
  basicAuthProvider,
  jwtAuthProvider,
  fakeAuthProvider,
  sanctumAuthProvider,
  FetchJson,
  FetchHydra,
  objectToFormData,
};
