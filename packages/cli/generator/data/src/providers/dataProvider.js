import {
  GET_LIST,
  GET_MANY,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from "vuetify-admin/src/providers/data/actions";
import qs from "qs";

export default (axios) => {
  const getRequest = (type, resource, params = {}) => {
    let query = {
      locale: params.locale,
    };

    switch (type) {
      case GET_LIST:
      case GET_MANY: {
        const { fields, include, pagination, sort, filter } = params;

        query = {
          ...query,
          fields,
          include,
        };

        if (type === GET_MANY) {
          query.filter = {
            id: params.ids,
          };
          return { url: resource, query };
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

        return { url: resource, query };
      }

      case GET_ONE: {
        return { url: `${resource}/${params.id}`, query };
      }

      case CREATE: {
        return {
          url: resource,
          query,
          method: "post",
          data: params.data,
        };
      }

      case UPDATE: {
        return {
          url: `${resource}/${params.id}`,
          query,
          method: "put",
          data: params.data,
        };
      }

      case DELETE: {
        return {
          url: `${resource}/${params.id}`,
          query,
          method: "delete",
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
      response = await axios[method || "get"](url, data);
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
      case CREATE:
      case UPDATE: {
        return Promise.resolve(response.data);
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
