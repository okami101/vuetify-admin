export default [
  {
    name: "publishers",
    icon: "mdi-globe-model",
    translatable: true,
    permissions: ["admin", "editor"],
  },
  {
    name: "books",
    icon: "mdi-book",
    translatable: true,
    permissions: ["admin", "editor", "author"],
  },
  {
    name: "authors",
    icon: "mdi-account",
    translatable: true,
    permissions: ["admin", "author"],
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    permissions: [
      "admin",
      "editor",
      { name: "author", actions: ["list", "show"] },
    ],
  },
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
    permissions: ["admin"],
  },
];
