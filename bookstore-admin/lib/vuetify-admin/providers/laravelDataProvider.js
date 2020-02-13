import objectToFormData from "../utils/objectToFormData";

const GET_LIST = "GET_LIST";
const GET_MANY = "GET_MANY";
const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
const CREATE = "CREATE";
const GET_ONE = "GET_ONE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

export default entrypoint => {
  const getRequest = (type, resource, params = {}) => {
    const resourceUrl = new URL(`${entrypoint}/${resource}`);
    const itemUrl = new URL(`${entrypoint}/${resource}/${params.id}`);

    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        const { fields, include, pagination, sort, filter } = params;

        if (fields) {
          resourceUrl.searchParams.set(`fields[${resource}]`, fields.join(","));
        }

        if (include) {
          resourceUrl.searchParams.set("include", include.join(","));
        }

        if (pagination) {
          let { page, perPage } = pagination;
          if (page) {
            resourceUrl.searchParams.set("page", page);
          }
          if (perPage) {
            resourceUrl.searchParams.set("perPage", perPage);
          }
        }
        if (sort) {
          resourceUrl.searchParams.set(
            "sort",
            sort
              .map(item => {
                let { by, desc } = item;

                if (desc) {
                  return `-${by}`;
                }
                return by;
              })
              .join(",")
          );
        }

        if (filter) {
          Object.keys(filter).forEach(key => {
            resourceUrl.searchParams.set(`filter[${key}]`, filter[key]);
          });
        }

        if (type === GET_MANY_REFERENCE && params.target) {
          resourceUrl.searchParams.set(`filter[${params.target}]`, params.id);
        }

        return { url: resourceUrl };

      case GET_ONE:
        return { url: itemUrl };

      case GET_MANY:
        resourceUrl.searchParams.set("filter[id]", params.ids.join(","));

        return { url: resourceUrl };

      case CREATE:
        return {
          url: resourceUrl,
          options: {
            method: "POST",
            body: objectToFormData(params.data)
          }
        };

      case UPDATE:
        let form = objectToFormData(params.data);
        form.set("_method", "PUT");

        return {
          url: itemUrl,
          options: {
            method: "POST",
            body: form
          }
        };

      case DELETE:
        return {
          url: itemUrl,
          options: {
            method: "DELETE"
          }
        };

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  const fetchApi = async (type, resource, params) => {
    let { url, options } = getRequest(type, resource, params);

    let token = localStorage.getItem("token");
    let headers = new Headers({
      Accept: "application/json"
    });

    if (token) {
      headers.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    }

    let response = await fetch(url, {
      headers,
      ...options
    });

    /**
     * Get compatible response for Vuetify Admin
     */
    switch (type) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        let { data, meta } = await response.json();
        return Promise.resolve({
          data,
          total: meta ? meta.total : data.length
        });
      case DELETE:
        return Promise.resolve({ data: { id: null } });
      default:
        return Promise.resolve(response);
    }
  };

  return {
    getList: (resource, params) => fetchApi(GET_LIST, resource, params),
    getOne: (resource, params) => fetchApi(GET_ONE, resource, params),
    getMany: (resource, params) => fetchApi(GET_MANY, resource, params),
    getManyReference: (resource, params) =>
      fetchApi(GET_MANY_REFERENCE, resource, params),
    create: (resource, params) => fetchApi(CREATE, resource, params),
    update: (resource, params) => fetchApi(UPDATE, resource, params),
    updateMany: (resource, params) =>
      Promise.all(params.ids.map(id => fetchApi(UPDATE, resource, { id }))),
    delete: (resource, params) => fetchApi(DELETE, resource, params),
    deleteMany: (resource, params) =>
      Promise.all(params.ids.map(id => fetchApi(DELETE, resource, { id })))
  };
};
