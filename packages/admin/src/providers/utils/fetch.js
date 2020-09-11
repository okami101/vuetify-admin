import trimEnd from "lodash/trimEnd";

const createHeadersFromOptions = (options) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: "application/json",
    });
  if (
    !requestHeaders.has("Content-Type") &&
    !(options && (!options.method || options.method === "GET")) &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders.set("Authorization", options.user.token);
  }

  return requestHeaders;
};

export default class FetchJson {
  constructor(url) {
    this.url = trimEnd(url, "/");
  }

  get(path, options = {}) {
    return this.call(path, options);
  }

  post(path, data, options = {}) {
    return this.call(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(path, data, options = {}) {
    return this.call(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  patch(path, data, options = {}) {
    return this.call(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete(path, options = {}) {
    return this.call(path, { ...options, method: "DELETE" });
  }

  async call(path, options = {}) {
    const requestHeaders = createHeadersFromOptions(options);

    let response = await fetch(`${this.url}/${path}`, {
      ...options,
      headers: requestHeaders,
    });

    let json = await response.json();

    let { status, statusText, headers } = response;

    if (status < 200 || status >= 300) {
      return Promise.reject({
        message: (json && json.message) || statusText,
        status,
      });
    }
    return Promise.resolve({
      status,
      headers: [...headers.keys()].reduce((o, key) => {
        return {
          ...o,
          [key]: headers.get(key),
        };
      }, {}),
      data: json,
    });
  }
}
