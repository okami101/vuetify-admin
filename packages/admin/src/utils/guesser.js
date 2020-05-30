/**
 * We will try to guess the best suitable fields type for each item property.
 */
let guessFields = async (store, i18n, resource) => {
  let { data } = await store.dispatch(`${resource}/getList`, {
    pagination: { page: 1, perPage: 1 },
  });

  if (!data.length) {
    return [];
  }

  let item = data[0];

  const supportedFields = [
    { type: "boolean", validator: (v) => typeof v === "boolean" },
    { type: "number", validator: (v) => typeof v === "number" },
    { type: "email", validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    {
      type: "url",
      validator: (v) => {
        try {
          new URL(v);
        } catch (e) {
          return false;
        }

        return true;
      },
    },
    {
      type: "date",
      validator: (v) => {
        return isNaN(v) && !isNaN(Date.parse(v));
      },
    },
    { type: "text", validator: (v) => typeof v === "string" },
  ];

  return Object.keys(item)
    .map((prop) => {
      if (i18n.te(`resources.${resource}.enums.${prop}`)) {
        return { source: prop, type: "select" };
      }
      for (let t of supportedFields) {
        if (t.validator(item[prop])) {
          return { source: prop, type: t.type };
        }
      }
      return false;
    })
    .filter((t) => t && t.source !== "id");
};

let guessInputs = async (store, i18n, resource) => {
  let fields = await guessFields(store, i18n, resource);

  return fields.map((f) => {
    if (["email", "url"].includes(f.type)) {
      f.type = "text";
    }

    return f;
  });
};

export { guessFields, guessInputs };
