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

import { fetchJson } from "../../utils/fetch";
import qs from "qs";

export default (apiUrl, httpClient = fetchJson) => {
  const getRequest = (type, resource, params = {}) => {
    switch (type) {
      case GET_LIST:
      case GET_MANY: {
        const { pagination, sort, filter } = params;

        if (type === GET_MANY) {
          return { url: resource, query: { filter: { id: params.ids } } };
        }

        let query = {
          filter,
        };

        if (pagination) {
          let { page, perPage } = pagination;

          query = {
            ...query,
            range: [(page - 1) * perPage, page * perPage],
          };
        }

        if (sort && sort.length) {
          query = {
            ...query,
            sort: [sort[0].by, sort[0].desc ? "DESC" : "ASC"],
          };
        }

        return {
          url: resource,
          query,
        };
      }

      case GET_ONE: {
        return { url: `${resource}/${params.id}` };
      }

      case CREATE: {
        return {
          url: resource,
          method: "POST",
          data: params.data,
        };
      }

      case UPDATE: {
        return {
          url: `${resource}/${params.id}`,
          method: "PUT",
          data: params.data,
        };
      }

      case DELETE: {
        return {
          url: `${resource}/${params.id}`,
          method: "DELETE",
        };
      }

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  const fetchApi = async (type, resource, params) => {
    let { url, query, method, data } = getRequest(type, resource, params);

    if (query) {
      url += `?${qs.stringify(query, { arrayFormat: "brackets" })}`;
    }

    let options = {
      method: method || "GET",
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    let response = await httpClient(url, options);

    /**
     * Get compatible response for Admin
     */
    switch (type) {
      case GET_LIST:
      case GET_MANY: {
        let { data, headers } = response;

        return Promise.resolve({
          data,
          total: parseInt(headers.get("content-range").split("/").pop(), 10),
        });
      }
      case DELETE: {
        return Promise.resolve();
      }

      case GET_ONE:
      case CREATE:
      case UPDATE: {
        return Promise.resolve(response);
      }
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
