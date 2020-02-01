const GET_LIST = "GET_LIST";
const GET_MANY = "GET_MANY";
const GET_MANY_REFERENCE = "GET_MANY_REFERENCE";
const CREATE = "GET_LIST";
const GET_ONE = "GET_LIST";
const UPDATE = "GET_LIST";
const DELETE = "GET_LIST";

export default entrypoint => {
  const fetchApi = (type, resource, params) => {
    const entrypointUrl = new URL(entrypoint, window.location.href);
    const collectionUrl = new URL(`${entrypoint}/${resource}`, entrypointUrl);
    const itemUrl = new URL(params.id, entrypointUrl);

    switch (type) {
      case CREATE:
        return transformReactAdminDataToRequestBody(resource, params.data).then(
          body => ({
            options: {
              body,
              method: "POST"
            },
            url: collectionUrl
          })
        );

      case DELETE:
        return Promise.resolve({
          options: {
            method: "DELETE"
          },
          url: itemUrl
        });

      case GET_LIST:
      case GET_MANY_REFERENCE: {
        const {
          pagination: { page, perPage },
          sort: { field, order }
        } = params;

        if (order) collectionUrl.searchParams.set(`order[${field}]`, order);
        if (page) collectionUrl.searchParams.set("page", page);
        if (perPage) collectionUrl.searchParams.set("perPage", perPage);
        if (params.filter) {
          const buildFilterParams = (key, nestedFilter, rootKey) => {
            const filterValue = nestedFilter[key];

            if (Array.isArray(filterValue)) {
              filterValue.forEach((arrayFilterValue, index) => {
                collectionUrl.searchParams.set(
                  `${rootKey}[${index}]`,
                  arrayFilterValue
                );
              });
              return;
            }

            if (!isPlainObject(filterValue)) {
              collectionUrl.searchParams.set(rootKey, filterValue);
              return;
            }

            Object.keys(filterValue).forEach(subKey => {
              buildFilterParams(subKey, filterValue, `${rootKey}.${subKey}`);
            });
          };

          Object.keys(params.filter).forEach(key => {
            buildFilterParams(key, params.filter, key);
          });
        }

        if (type === GET_MANY_REFERENCE && params.target) {
          collectionUrl.searchParams.set(params.target, params.id);
        }

        return Promise.resolve({
          options: {},
          url: collectionUrl
        });
      }

      case GET_ONE:
        return Promise.resolve({
          options: {},
          url: itemUrl
        });

      case UPDATE:
        return transformReactAdminDataToRequestBody(resource, params.data).then(
          body => ({
            options: {
              body,
              method: "PUT"
            },
            url: itemUrl
          })
        );

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }

    convertReactAdminRequestToHydraRequest(type, resource, params)
      .then(({ url, options }) => httpClient(url, options))
      .then(response =>
        convertHydraResponseToReactAdminResponse(type, resource, response)
      );
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
