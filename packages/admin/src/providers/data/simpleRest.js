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

  return {
    [GET_LIST]: async (resource, params) => {
      const { pagination, sort, filter } = params;

      let query = {
        filter: JSON.stringify(filter),
      };

      if (pagination) {
        let { page, perPage } = pagination;

        query = {
          ...query,
          range: JSON.stringify([(page - 1) * perPage, page * perPage]),
        };
      }

      if (sort && sort.length) {
        query = {
          ...query,
          sort: JSON.stringify([sort[0].by, sort[0].desc ? "DESC" : "ASC"]),
        };
      }

      let { data, headers } = await httpClient.get(
        `${resource}?${qs.stringify(query)}`
      );

      return {
        data,
        total: parseInt(headers["content-range"].split("/").pop(), 10),
      };
    },
    [GET_MANY]: (resource, params) =>
      httpClient.get(
        `${resource}?${qs.stringify({
          filter: JSON.stringify({ id: params.ids }),
        })}`
      ),
    [GET_ONE]: (resource, params) => httpClient.get(`${resource}/${params.id}`),
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
