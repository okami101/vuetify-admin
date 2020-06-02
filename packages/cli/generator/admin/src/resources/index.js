export default [
  <%_ if (users) { _%>
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
  },
  <%_ } _%>
];
