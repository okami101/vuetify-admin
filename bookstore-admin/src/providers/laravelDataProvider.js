import objectToFormData from "../utils/objectToFormData";

const GET_LIST = "GET_LIST";
const GET_MANY = "GET_MANY";
const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
const CREATE = "GET_LIST";
const GET_ONE = "GET_LIST";
const UPDATE = "GET_LIST";
const DELETE = "GET_LIST";

export default entrypoint => {
  const fetchApi = (type, resource, params) => {
    const resourceUrl = new URL(`${entrypoint}/${resource}`);
    const itemUrl = new URL(params.id, resourceUrl);

    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE: {
        const {
          pagination: { page, perPage },
          sort,
          filter
        } = params;

        if (page) {
          resourceUrl.searchParams.set("page", page);
        }
        if (perPage) {
          resourceUrl.searchParams.set("perPage", perPage);
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
          Object.keys(params.filter).forEach(key => {
            resourceUrl.searchParams.set(`filter[${key}]`, params.filter[key]);
          });
        }

        if (type === GET_MANY_REFERENCE && params.target) {
          resourceUrl.searchParams.set(`filter[${params.target}]`, params.id);
        }

        return fetch(resourceUrl);
      }

      case GET_ONE:
        return fetch(itemUrl);

      case GET_MANY:
        resourceUrl.searchParams.set("filter[id]", params.ids.join(","));

        return fetch(resourceUrl);

      case CREATE:
        return fetch(resourceUrl, {
          method: "POST",
          body: objectToFormData(params.data)
        });

      case UPDATE:
        return fetch(itemUrl, {
          method: "PUT",
          body: objectToFormData(params.data)
        });

      case DELETE:
        return fetch(itemUrl, {
          method: "DELETE"
        });

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
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
