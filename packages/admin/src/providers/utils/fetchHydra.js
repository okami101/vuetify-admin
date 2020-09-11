import FetchJson from "./fetchJson";

export default class FetchHydra extends FetchJson {
  async call(path, options = {}) {
    try {
      let { status, data } = await super.call(path, options);

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
      if (data["hydra:member"]) {
        return Promise.resolve({
          status,
          data: data["hydra:member"].map((r) => getResourceWithId(r)),
          total: data["hydra:totalItems"],
        });
      }

      return Promise.resolve({
        status,
        data: getResourceWithId(data),
      });
    } catch ({ status, message, data }) {
      return Promise.reject({
        message,
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
  }
}
