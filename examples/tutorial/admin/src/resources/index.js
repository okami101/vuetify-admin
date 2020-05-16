export default [
  {
    name: "users",
    icon: "mdi-account",
    actions: ["list", "delete"],
    label: "name",
  },
  {
    name: "monsters",
    icon: "mdi-alien",
    actions: ["list", "show", "create", "edit", "delete"],
    translatable: true,
    label: "name",
  },
  {
    name: "monster_children",
    icon: "mdi-baby-carriage",
    label: "name",
  },
];
