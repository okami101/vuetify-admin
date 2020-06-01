const fs = require("fs");

module.exports = (api, options) => {
  api.injectImports(api.entryFile, [`import admin from "./plugins/admin";`]);
  api.injectRootOptions(api.entryFile, `admin`);

  api.extendPackage({
    scripts: {
      "crud:make": "vue-cli-service crud:make",
      "crud:yaml": "vue-cli-service crud:yaml",
    },
    dependencies: {
      axios: "^0.19.2",
      "portal-vue": "^2.1.0",
      "vtec-admin": "../../vtec-admin/packages/admin",
      "vue-chartist": "^2.2.0",
      vuedraggable: "^2.23.0",
    },
  });

  api.render("./admin", {
    data: options.dataProvider,
    auth: options.authProvider,
    apiURL: options.apiURL,
    users: options.users,
  });

  if (options.authProvider) {
    /**
     * Auth related templates + impersonation
     */
    api.render("./auth");
  }

  if (options.users) {
    /**
     * Users pages templates
     */
    api.render("./users", {
      impersonate: !!authProvider,
    });
  }

  if (options.materialTheme) {
    /**
     * Tim material theme
     */
    api.injectImports(api.entryFile, [`import "./plugins/base";`]);
    api.injectImports("src/plugins/vuetify.js", [
      `import "@/sass/overrides.sass";`,
    ]);

    api.render("./material");
  }

  if (options.staticDashboard) {
    /**
     * Full static dashboard
     */
    api.injectImports(api.entryFile, [`import "./plugins/chartist";`]);
    api.render("./dashboard");
  }

  api.onCreateComplete(() => {
    /**
     * Cleanup unused component and views files
     */
    [
      "src/components/HelloWorld.vue",
      "src/components/HelloI18n.vue",
      "src/views/Home.vue",
      "src/views/About.vue",
    ].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
  });
};
