export default [
  {
    name: "users",
    icon: "mdi-account",
    label: "name",
    actions: ["list", "delete"],
  },
  {
    name: "monsters",
    icon: "mdi-alien",
    label: "name",
    actions: ["list", "show", "create", "edit", "delete"],
    translatable: true,
  },
  {
    name: "monster_children",
    icon: "mdi-baby-carriage",
    label: "name",
  },
];
