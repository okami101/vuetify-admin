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

        let { data, total } = await httpClient.get(
          `${resource}?${qs.stringify(query, { arrayFormat: "repeat" })}`
        );

        return { data, total };
      }

      case GET_ONE: {
        let { data } = await httpClient.get(`${resource}/${params.id}`);
        return { data };
      }

      case CREATE: {
        let { data } = await httpClient.post(resource, params.data);
        return { data };
      }

      case UPDATE: {
        let { data } = await httpClient.put(
          `${resource}/${params.id}`,
          params.data
        );
        return { data };
      }

      case DELETE: {
        let { data } = httpClient.delete(`${resource}/${params.id}`);
        return { data };
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
