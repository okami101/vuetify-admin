import objectToFormData from "vuetify-admin/utils/objectToFormData";

const GET_LIST = "GET_LIST";
const GET_MANY = "GET_MANY";
const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
const CREATE = "CREATE";
const GET_ONE = "GET_ONE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";

export default (axios, base = "/api") => {
  const getRequest = (type, resource, params = {}) => {
    const searchParams = new URLSearchParams();
    const resourceUrl = `${base}/${resource}`;
    const itemUrl = `${base}/${resource}/${params.id}`;

    switch (type) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        const { fields, include, pagination, sort, filter } = params;

        if (fields) {
          Object.keys(fields).forEach(r => {
            if (fields[r] && fields.length) {
              searchParams.append(`fields[${r}]`, fields[r].join(","));
            }
          });
        }

        if (include && include.length) {
          searchParams.append("include", include.join(","));
        }

        if (type === GET_MANY) {
          searchParams.append("filter[id]", params.ids.join(","));
          return { url: `${resourceUrl}?${searchParams.toString()}` };
        }

        if (type === GET_MANY_REFERENCE && params.target) {
          searchParams.append(`filter[${params.target}]`, params.id);
        }

        if (pagination) {
          let { page, perPage } = pagination;
          if (page) {
            searchParams.append("page", page);
          }
          if (perPage) {
            searchParams.append("perPage", perPage);
          }
        }
        if (sort) {
          let param = sort
            .map(item => {
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
          Object.keys(filter).forEach(key => {
            if (filter[key]) {
              searchParams.append(`filter[${key}]`, filter[key]);
            }
          });
        }

        return { url: `${resourceUrl}?${searchParams.toString()}` };

      case GET_ONE:
        return { url: itemUrl };

      case CREATE:
        return {
          url: resourceUrl,
          method: "post",
          data: objectToFormData(params.data)
        };

      case UPDATE:
        let form = objectToFormData(params.data);
        form.append("_method", "PUT");

        return {
          url: itemUrl,
          method: "post",
          data: form
        };

      case DELETE:
        return {
          url: itemUrl,
          method: "delete"
        };

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
  };

  const fetchApi = async (type, resource, params) => {
    let { url, method, data } = getRequest(type, resource, params);

    let response = await axios[method || "get"](url, data);

    if (response.status >= 200 && response.status < 400) {
      /**
       * Get compatible response for Admin
       */
      switch (type) {
        case GET_LIST:
        case GET_MANY:
        case GET_MANY_REFERENCE:
          let { data, meta } = response.data;

          return Promise.resolve({
            data,
            total: meta ? meta.total : data.length
          });
        case DELETE:
          return Promise.resolve({ data: { id: null } });

        case GET_ONE:
        case CREATE:
        case UPDATE:
          let json = response.data;
          return Promise.resolve(json);

        default:
          return Promise.reject({
            status: 400,
            message: "Invalid action"
          });
      }
    }

    return Promise.reject(response);
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
      Promise.all(
        params.ids.map(id => fetchApi(UPDATE, resource, { id }))
      ).then(() => Promise.resolve({ data: { id: null } })),
    delete: (resource, params) => fetchApi(DELETE, resource, params),
    deleteMany: (resource, params) =>
      Promise.all(
        params.ids.map(id => fetchApi(DELETE, resource, { id }))
      ).then(() => Promise.resolve({ data: { id: null } }))
  };
};
