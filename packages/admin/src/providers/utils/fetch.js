export const createHeadersFromOptions = (options) => {
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

export const fetchJson = async (url, options = {}) => {
  const requestHeaders = createHeadersFromOptions(options);

  let response = await fetch(url, { ...options, headers: requestHeaders });

  let json = await response.json();

  let { status, statusText, headers } = response;

  if (status < 200 || status >= 300) {
    return Promise.reject({
      message: (json && json.message) || statusText,
      status,
    });
  }
  return Promise.resolve({ status, headers, json });
};
