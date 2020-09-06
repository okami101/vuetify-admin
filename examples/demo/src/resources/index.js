export default [
  {
    name: "publishers",
    icon: "mdi-globe-model",
    label: "name",
    translatable: true,
    permissions: ["admin", "editor"],
  },
  {
    name: "books",
    icon: "mdi-book",
    label: (r) => `${r.title} (${r.isbn})`,
    translatable: true,
    permissions: ["admin", "editor", "author"],
    autocompleteFields: ["id", "title", "isbn"],
  },
  {
    name: "categories",
    icon: "mdi-tag",
    label: "name",
    translatable: true,
    permissions: ["admin"],
  },
  {
    name: "authors",
    icon: "mdi-account",
    label: "name",
    translatable: true,
    permissions: ["admin", "author"],
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    label: "author",
    permissions: [
      "admin",
      "editor",
      { name: "author", actions: ["list", "show"] },
    ],
  },
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
];
