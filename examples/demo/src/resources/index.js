export default [
  {
    name: "publishers",
    icon: "mdi-globe-model",
    translatable: true,
    permissions: ["admin", "editor"],
    label: "name",
  },
  {
    name: "books",
    icon: "mdi-book",
    translatable: true,
    permissions: ["admin", "editor", "author"],
    label: (r) => `${r.title} (${r.isbn})`,
  },
  {
    name: "authors",
    icon: "mdi-account",
    translatable: true,
    permissions: ["admin", "author"],
    label: "name",
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    permissions: [
      "admin",
      "editor",
      { name: "author", actions: ["list", "show"] },
    ],
    label: "author",
  },
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
    permissions: ["admin"],
    label: "name",
  },
];
