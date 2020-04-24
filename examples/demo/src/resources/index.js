module.exports = {
  publishers: {
    icon: "mdi-globe-model",
    translatable: true,
    permissions: ["admin", "editor"],
  },
  books: {
    icon: "mdi-book",
    translatable: true,
    permissions: ["admin", "editor", "author"],
  },
  authors: {
    icon: "mdi-account",
    translatable: true,
    permissions: ["admin", "author"],
  },
  reviews: {
    icon: "mdi-comment",
    permissions: ["admin", "editor", "author"],
  },
  users: {
    icon: "mdi-account",
    only: ["list", "delete"],
    permissions: ["admin"],
  },
};
