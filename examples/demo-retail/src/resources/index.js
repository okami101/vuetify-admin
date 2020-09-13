export default [
  {
    name: "customers",
    icon: "mdi-account-multiple",
    label: (model) => `${model.first_name} ${model.last_name}`,
    routes: ["list"],
  },
  {
    name: "products",
    icon: "mdi-image-multiple",
    label: "reference",
    routes: ["list"],
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    routes: ["list"],
  },
];
