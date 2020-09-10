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
import qs from "qs";
import objectToFormData from "../utils/objectToFormData";

export default (axios, baseURL = "/api") => {
  const getRequest = (type, resource, params = {}) => {
    const resourceURL = `${baseURL}/${resource}`;

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
          return { url: resourceURL, query };
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

        return { url: resourceURL, query };
      }

      case GET_TREE: {
        return { url: `${resourceURL}/tree`, query: { filter: params.filter } };
      }

      case GET_NODES:
        return {
          url: `${resourceURL}/nodes/${params.parent ? params.parent.id : ""}`,
          query: { filter: params.filter },
        };

      case GET_ONE: {
        return { url: `${resourceURL}/${params.id}` };
      }

      case CREATE: {
        return {
          url: resourceURL,
          method: "post",
          data: objectToFormData(params.data),
        };
      }

      case UPDATE: {
        let form = objectToFormData(params.data);
        form.append("_method", "PUT");

        return {
          url: `${resourceURL}/${params.id}`,
          method: "post",
          data: form,
        };
      }

      case DELETE: {
        return {
          url: `${resourceURL}/${params.id}`,
          method: "delete",
        };
      }

      case MOVE_NODE: {
        return {
          url: `${resourceURL}/${params.source.id}/move`,
          method: "patch",
          data: {
            parent_id: params.destination ? params.destination.id : null,
            position: params.position,
          },
        };
      }

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
      response = await axios({
        method,
        data,
        url,
        headers: params.locale ? { locale: params.locale } : {},
      });
    } catch ({ response }) {
      let { data, status, statusText } = response;
      return Promise.reject({
        message: statusText,
        status,
        ...(data || {}),
      });
    }

    /**
     * Get compatible response for Admin
     */
    switch (type) {
      case GET_LIST:
      case GET_MANY: {
        let { data, meta } = response.data;

        return Promise.resolve({
          data,
          total: meta ? meta.total : data.length,
        });
      }
      case DELETE: {
        return Promise.resolve();
      }

      case GET_ONE:
      case GET_TREE:
      case GET_NODES:
      case CREATE:
      case UPDATE:
      case MOVE_NODE: {
        return Promise.resolve(response.data);
      }
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
