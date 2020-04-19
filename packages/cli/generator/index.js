const fs = require("fs");

module.exports = (api) => {
  api.injectImports(
    "src/plugins/vuetify.js",
    `import "@/sass/overrides.sass";`
  );
  api.injectImports(api.entryFile, [
    `import admin from "./plugins/admin";`,
    `import "./plugins/base";`,
    `import "./plugins/chartist";`,
  ]);
  api.injectRootOptions(api.entryFile, `admin`);

  api.extendPackage({
    scripts: {
      "crud:make": "vue-cli-service crud:make --output './src/resources'",
      "crud:generate":
        "vue-cli-service crud:generate --output './src/resources'",
    },
    dependencies: {
      axios: "^0.19.2",
      "portal-vue": "^2.1.0",
      "vtec-admin": "../../vtec-admin/packages/admin",
      "vue-chartist": "^2.2.0",
      vuedraggable: "^2.23.0",
    },
  });

  api.render("./template");

  api.onCreateComplete(() => {
    /**
     * Cleanup unused component and views files
     */
    fs.unlinkSync("src/components/HelloWorld.vue");
    fs.unlinkSync("src/views/Home.vue");
    fs.unlinkSync("src/views/About.vue");
  });
};
