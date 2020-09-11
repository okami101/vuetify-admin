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

import FetchHydra from "../utils/fetchHydra";
import qs from "qs";

export default (httpClient) => {
  if (typeof httpClient === "string") {
    httpClient = new FetchHydra(httpClient);
  }

  const fetchApi = async (type, resource, params = {}) => {
    switch (type) {
      case GET_LIST: {
        const { pagination, sort, filter } = params;

        let query = filter || {};

        if (pagination) {
          query = {
            ...query,
            page: pagination.page,
            itemsPerPage: pagination.perPage,
          };
        }

        if (sort && sort.length) {
          query.order = {};

          sort.forEach((item) => {
            let { by, desc } = item;

            query.order[by] = desc ? "desc" : "asc";
          });
        }

        return httpClient.get(
          `${resource}?${qs.stringify(query, { arrayFormat: "repeat" })}`
        );
      }

      case GET_ONE: {
        return httpClient.get(`${resource}/${params.id}`);
      }

      case CREATE: {
        return httpClient.post(resource, params.data);
      }

      case UPDATE: {
        return httpClient.put(`${resource}/${params.id}`, params.data);
      }

      case DELETE: {
        return httpClient.delete(`${resource}/${params.id}`);
      }

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  return {
    [GET_LIST]: (resource, params) => fetchApi(GET_LIST, resource, params),
    [GET_MANY]: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          fetchApi(GET_ONE, resource, {
            id: id.substring(id.lastIndexOf("/") + 1),
          })
        )
      ).then((responses) => ({ data: responses.map(({ data }) => data) })),
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
