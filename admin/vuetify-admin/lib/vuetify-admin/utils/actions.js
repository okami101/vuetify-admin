/**
 * Supported data actions
 */
export const GET_LIST = "getList";
export const GET_MANY = "getMany";
export const GET_MANY_REFERENCE = "getManyReference";
export const GET_ONE = "getOne";
export const CREATE = "create";
export const UPDATE = "update";
export const UPDATE_MANY = "updateMany";
export const DELETE = "delete";
export const DELETE_MANY = "deleteMany";

export const DATA_PROVIDER_ACTIONS = [
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
];

/**
 * Supported auth actions
 */
export const LOGIN = "login";
export const LOGOUT = "logout";
export const CHECK_AUTH = "checkAuth";
export const CHECK_ERROR = "checkError";
export const GET_NAME = "getName";
export const GET_EMAIL = "getEmail";
export const GET_PERMISSIONS = "getPermissions";

export const AUTH_PROVIDER_ACTIONS = [
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS
];
