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

export default (axios) => {
  const getRequest = (type, resource, params = {}) => {
    const searchParams = new URLSearchParams();
    const itemURL = `${resource}/${params.id}`;

    if (params.locale) {
      searchParams.append("locale", params.locale);
    }

    switch (type) {
      case GET_LIST:
      case GET_MANY:
        const { pagination, sort, filter } = params;

        if (type === GET_MANY) {
          params.ids.forEach((id) => {
            searchParams.append("id", id);
          });
          return { url: `${resource}?${searchParams.toString()}` };
        }

        if (pagination) {
          let { page, perPage } = pagination;
          const query = {
            ...params.filter,
            _sort: field,
            _order: order,
            _start: (page - 1) * perPage,
            _end: page * perPage,
          };

          if (page) {
            searchParams.append("page", page);
          }
          if (perPage) {
            searchParams.append("perPage", perPage);
          }
        }
        if (sort) {
          let param = sort
            .map((item) => {
              let { by, desc } = item;

              if (desc) {
                return `-${by}`;
              }
              return by;
            })
            .join(",");

          if (param) searchParams.append("sort", param);
        }

        if (filter) {
          Object.keys(filter).forEach((key) => {
            if (filter[key] !== "") {
              searchParams.append(`filter[${key}]`, filter[key]);
            }
          });
        }

        return { url: resource, query: searchParams.toString() };

      case GET_ONE:
        return { url: itemURL, query: searchParams.toString() };

      case CREATE:
        return {
          url: resource,
          query: searchParams.toString(),
          method: "post",
          data: objectToFormData(params.data),
        };

      case UPDATE:
        let form = objectToFormData(params.data);
        form.append("_method", "PUT");

        return {
          url: itemURL,
          query: searchParams.toString(),
          method: "post",
          data: form,
        };

      case DELETE:
        return {
          url: itemURL,
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
      url += `?${query}`;
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
        let { data, meta } = response.data;

        return Promise.resolve({
          data,
          total: meta ? meta.total : data.length,
        });
      case DELETE:
        return Promise.resolve();

      case GET_ONE:
      case CREATE:
      case UPDATE:
        return Promise.resolve(response.data);
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
