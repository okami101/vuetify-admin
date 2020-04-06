module.exports = (api) => {
  api.extendPackage({
    dependencies: {
      "vtec-admin": "^0.1.0",
      "portal-vue": "^2.1.0",
      "vue-chartist": "^2.2.0",
      vuedraggable: "^2.23.0",
    },
  });

  api.render("./template");
};
