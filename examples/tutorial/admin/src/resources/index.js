export default [
  { name: "users", icon: "mdi-account", actions: ["list", "delete"] },
  {
    name: "monsters",
    icon: "mdi-alien",
    actions: ["list", "show", "create", "edit", "delete"],
    translatable: true,
  },
  { name: "monster_children", icon: "mdi-baby-carriage" },
];
