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

        return { url: resource, query };

      case GET_ONE:
        return { url: `${resource}/${params.id}`, query };

      case CREATE:
        return {
          url: resource,
          query,
          method: "post",
          data: params.data,
        };

      case UPDATE:
        return {
          url: `${resource}/${params.id}`,
          query,
          method: "put",
          data: params.data,
        };

      case DELETE:
        return {
          url: `${resource}/${params.id}`,
          query,
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
      url += `?${qs.stringify(query, { arrayFormat: "repeat" })}`;
    }

    try {
      response = await axios[method || "get"](url, data);
    } catch ({ response }) {
      /**
       * TODO validation
       */
      let { data, status, statusText } = response;
      return Promise.reject({
        message: statusText,
        status,
        ...{
          message: data["hydra:title"],
          errors: data.violations
            ? data.violations.reduce(
                (o, error) => ({
                  ...o,
                  [error.propertyPath]: [
                    ...(o[error.propertyPath] || []),
                    error.message,
                  ],
                }),
                {}
              )
            : {},
        },
      });
    }

    /**
     * Parse the guid
     */
    let getResourceWithId = (resource) => {
      let data = {
        ...resource,
      };

      if (resource["@id"]) {
        let id = resource["@id"];

        data.id = id.substring(id.lastIndexOf("/") + 1);
      }

      Object.keys(resource).forEach((p) => {
        let value = resource[p];

        /**
         * Manage nested hydra object reference if applicable
         */
        data[p] = Array.isArray(value)
          ? value.map((v) => getResourceWithId(v))
          : typeof value === "object" && value["@id"]
          ? getResourceWithId(value)
          : value;
      });

      return data;
    };

    /**
     * Get compatible response for Admin
     */
    switch (type) {
      case GET_LIST:
      case GET_MANY:
        let data = response.data["hydra:member"];
        let total = response.data["hydra:totalItems"];

        return Promise.resolve({
          data: data.map((r) => getResourceWithId(r)),
          total,
        });
      case DELETE:
        return Promise.resolve();

      case GET_ONE:
      case CREATE:
      case UPDATE:
        return Promise.resolve({
          data: getResourceWithId(response.data),
        });
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
