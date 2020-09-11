import {
  GET_LIST,
  GET_MANY,
  GET_TREE,
  GET_NODES,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
  MOVE_NODE,
} from "./actions";

import objectToFormData from "../utils/objectToFormData";
import qs from "qs";

export default (axios, baseURL = "/api") => {
  const httpClient = async (method, url, params = {}) => {
    try {
      let { data } = await axios({
        method,
        url: `${baseURL}/${url}`,
        data: params.data,
        headers: params.locale ? { locale: params.locale } : {},
      });

      return data;
    } catch ({ response }) {
      let { data, status, statusText } = response;
      return Promise.reject({
        message: statusText,
        status,
        ...(data || {}),
      });
    }
  };

  const fetchApi = async (type, resource, params = {}) => {
    switch (type) {
      case GET_LIST:
      case GET_MANY: {
        const { fields, include, pagination, sort, filter } = params;

        let query = {
          fields,
          include,
        };

        if (type === GET_MANY) {
          query.filter = {
            id: params.ids,
          };

          return httpClient(
            "get",
            `${resource}?${qs.stringify(query, { arrayFormat: "comma" })}`
          );
        }

        query = {
          ...query,
          ...pagination,
          filter,
        };

        if (sort && sort.length) {
          query.sort = sort.map((item) => {
            let { by, desc } = item;

            if (desc) {
              return `-${by}`;
            }
            return by;
          });
        }

        let { data, meta } = await httpClient(
          "get",
          `${resource}?${qs.stringify(query, { arrayFormat: "comma" })}`,
          params
        );

        return {
          data,
          total: meta ? meta.total : data.length,
        };
      }

      case GET_TREE: {
        return httpClient(
          "get",
          `${resource}/tree?${qs.stringify(
            { filter: params.filter },
            { arrayFormat: "comma" }
          )}`,
          params
        );
      }

      case GET_NODES: {
        return httpClient(
          "get",
          `${resource}/nodes/${
            params.parent ? params.parent.id : ""
          }?${qs.stringify(
            { filter: params.filter },
            { arrayFormat: "comma" }
          )}`,
          params
        );
      }

      case GET_ONE: {
        return httpClient("get", `${resource}/${params.id}`, params);
      }

      case CREATE: {
        let form = objectToFormData(params.data);

        return httpClient("post", resource, {
          ...params,
          data: form,
        });
      }

      case UPDATE: {
        let form = objectToFormData(params.data);
        form.append("_method", "PUT");

        return httpClient("post", `${resource}/${params.id}`, {
          ...params,
          data: form,
        });
      }

      case DELETE: {
        return httpClient("delete", `${resource}/${params.id}`);
      }

      case MOVE_NODE: {
        return httpClient("patch", `${resource}/${params.source.id}/move`, {
          data: {
            parent_id: params.destination ? params.destination.id : null,
            position: params.position,
          },
        });
      }

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  return {
    [GET_LIST]: (resource, params) => fetchApi(GET_LIST, resource, params),
    [GET_MANY]: (resource, params) => fetchApi(GET_MANY, resource, params),
    [GET_NODES]: (resource, params) => fetchApi(GET_NODES, resource, params),
    [GET_TREE]: (resource, params) => fetchApi(GET_TREE, resource, params),
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
    [MOVE_NODE]: (resource, params) => fetchApi(MOVE_NODE, resource, params),
  };
};
