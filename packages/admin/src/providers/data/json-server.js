import {
  GET_LIST,
  GET_MANY,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "./actions";
import qs from "qs";

export default (axios) => {
  const getRequest = (type, resource, params = {}) => {
    switch (type) {
      case GET_LIST:
      case GET_MANY:
        const { include, pagination, sort, filter } = params;
        let query = {};

        if (include) {
          let { embed, expand } = include;
          query = {
            _embed: embed,
            _expand: expand,
          };
        }

        if (type === GET_MANY) {
          return { url: resource, query: { id: params.ids } };
        }

        query = {
          ...query,
          ...filter,
        };

        if (pagination) {
          let { page, perPage } = pagination;

          query = {
            ...query,
            _start: (page - 1) * perPage,
            _end: page * perPage,
          };
        }

        if (sort && sort.length) {
          query = {
            _sort: sort.map((item) => item.by),
            _order: sort.map((item) => (item.desc ? "desc" : "asc")),
          };
        }

        return {
          url: resource,
          query,
        };

      case GET_ONE:
        return { url: `${resource}/${params.id}` };

      case CREATE:
        return {
          url: resource,
          method: "post",
          data: params.data,
        };

      case UPDATE:
        return {
          url: `${resource}/${params.id}`,
          method: "put",
          data: params.data,
        };

      case DELETE:
        return {
          url: `${resource}/${params.id}`,
          method: "delete",
        };

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  const fetchApi = async (type, resource, params) => {
    let response = null;
    let { url, query, method, data } = getRequest(type, resource, params);

    if (query) {
      url += `?${qs.stringify(query, { arrayFormat: "comma" })}`;
    }

    try {
      response = await axios[method || "get"](url, data);
    } catch ({ response }) {
      let { data, status, statusText } = response;
      return Promise.reject({
        message: (data && data.message) || statusText,
        status,
        data,
      });
    }

    /**
     * Get compatible response for Admin
     */
    switch (type) {
      case GET_LIST:
      case GET_MANY:
        let { data, headers } = response;

        return Promise.resolve({
          data,
          total: parseInt(headers["x-total-count"], 10),
        });
      case DELETE:
        return Promise.resolve();

      case GET_ONE:
      case CREATE:
      case UPDATE:
        return Promise.resolve(response);
    }
  };

  return {
    [GET_LIST]: (resource, params) => fetchApi(GET_LIST, resource, params),
    [GET_MANY]: (resource, params) => fetchApi(GET_MANY, resource, params),
    [GET_ONE]: (resource, params) => fetchApi(GET_ONE, resource, params),
    [CREATE]: (resource, params) => fetchApi(CREATE, resource, params),
    [UPDATE]: (resource, params) => fetchApi(UPDATE, resource, params),
    [UPDATE_MANY]: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          fetchApi(UPDATE, resource, { id, data: params.data })
        )
      ).then(() => Promise.resolve()),
    [DELETE]: (resource, params) => fetchApi(DELETE, resource, params),
    [DELETE_MANY]: (resource, params) =>
      Promise.all(
        params.ids.map((id) => fetchApi(DELETE, resource, { id }))
      ).then(() => Promise.resolve()),
  };
};
