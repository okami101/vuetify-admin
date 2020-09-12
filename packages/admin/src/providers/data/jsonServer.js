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

import FetchJson from "../utils/fetchJson";
import qs from "qs";

export default (httpClient) => {
  if (typeof httpClient === "string") {
    httpClient = new FetchJson(httpClient);
  }

  const withInclude = (params) => {
    let query = {};

    if (params.include) {
      let { embed, expand } = params.include;
      query = {
        _embed: embed,
        _expand: expand,
      };
    }

    return query;
  };

  return {
    [GET_LIST]: async (resource, params) => {
      const { pagination, sort, filter } = params;
      let query = {
        ...withInclude(params),
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
          ...query,
          _sort: sort.map((item) => item.by),
          _order: sort.map((item) => (item.desc ? "desc" : "asc")),
        };
      }

      let { data, headers } = await httpClient.get(
        `${resource}?${qs.stringify(query, { arrayFormat: "repeat" })}`
      );

      return {
        data,
        total: parseInt(headers["x-total-count"], 10),
      };
    },
    [GET_MANY]: (resource, params) =>
      httpClient.get(
        `${resource}?${qs.stringify(
          {
            ...withInclude(params),
            id: params.ids,
          },
          { arrayFormat: "repeat" }
        )}`
      ),
    [GET_ONE]: (resource, params) =>
      httpClient.get(
        `${resource}/${params.id}?${qs.stringify(withInclude(params))}`
      ),
    [CREATE]: (resource, params) => httpClient.post(resource, params.data),
    [UPDATE]: (resource, params) =>
      httpClient.put(`${resource}/${params.id}`, params.data),
    [UPDATE_MANY]: (resource, params) =>
      Promise.all(
        params.ids.map((id) => httpClient.put(`${resource}/${id}`, params.data))
      ).then(() => Promise.resolve()),
    [DELETE]: (resource, params) =>
      httpClient.delete(`${resource}/${params.id}`),
    [DELETE_MANY]: (resource, params) =>
      Promise.all(
        params.ids.map((id) => httpClient.delete(`${resource}/${id}`))
      ).then(() => Promise.resolve()),
  };
};
