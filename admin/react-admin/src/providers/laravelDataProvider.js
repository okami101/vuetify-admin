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
        const {pagination, sort, filter} = params;

        if (pagination) {
          let {page, perPage} = pagination;
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
            sort.order === "ASC" ? sort.field : `-${sort.field}`
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

        return {url: resourceUrl};

      case GET_ONE:
        return {url: itemUrl};

      case GET_MANY:
        resourceUrl.searchParams.set("filter[id]", params.ids.join(","));

        return {url: resourceUrl};

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
    let {url, options} = getRequest(type, resource, params);

    let token = localStorage.getItem("token");
    let headers = new Headers({
      Accept: "application/json"
    });

    if (token) {
      headers.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    }

    let response = await fetch(url, {
      headers,
      ...options
    });

    if (response.status >= 200 && response.status < 400) {
      /**
       * Get compatible response for Admin
       */
      switch (type) {
        case GET_LIST:
        case GET_MANY:
        case GET_MANY_REFERENCE:
          let {data, meta} = await response.json();

          return Promise.resolve({
            data,
            total: meta ? meta.total : data.length
          });
        case DELETE:
          return Promise.resolve({data: {id: null}});

        case GET_ONE:
        case CREATE:
        case UPDATE:
          let json = await response.json();
          return Promise.resolve(json);

        default:
          return Promise.reject({
            message: "Invalid action"
          });
      }
    }

    return Promise.reject(await response.json());
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
      Promise.all(params.ids.map(id => fetchApi(UPDATE, resource, {id}))).then(() =>
        Promise.resolve({data: {id: null}})
      ),
    delete: (resource, params) => fetchApi(DELETE, resource, params),
    deleteMany: (resource, params) =>
      Promise.all(params.ids.map(id => fetchApi(DELETE, resource, {id}))).then(() =>
        Promise.resolve({data: {id: null}})
      )
  };
};
