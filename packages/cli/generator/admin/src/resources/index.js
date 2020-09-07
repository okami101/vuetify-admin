export default [
  <%_ if (users) { _%>
  {
    name: "users",
    icon: "mdi-account",
    routes: ["list"],
  },
  <%_ } _%>
];
