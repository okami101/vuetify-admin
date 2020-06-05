export default [
  {
    name: "posts",
    icon: "mdi-post",
    label: "title",
    include: { expand: ["user"] },
  },
  {
    name: "comments",
    icon: "mdi-comment",
    label: "name",
    actions: ["delete"],
  },
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
  },
];
