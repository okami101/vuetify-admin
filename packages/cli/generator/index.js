const fs = require("fs");

module.exports = (api, options) => {
  api.injectImports(api.entryFile, [
    `import admin from "./plugins/admin";`,
    `import "./plugins/i18n";`,
  ]);
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
    profile: options.profile,
    locales: options.locales,
    users: options.users,
    impersonation: options.impersonation,
  });

  if (options.dataProvider === "custom") {
    /**
     * Custom provider base code
     */
    api.render("./data");
  }

  if (options.authProvider === "custom") {
    /**
     * Custom provider base code
     */
    api.render("./auth");
  }

  if (options.authProvider) {
    /**
     * Login page
     */
    api.render("./login", {
      material: options.material,
    });
  }

  if (options.profile) {
    /**
     * Profile page
     */
    api.render("./profile", {
      material: options.material,
    });
  }

  if (options.locales) {
    /**
     * Users pages templates
     */
    for (let locale of options.locales) {
      api.render(`./locales/${locale}`);
    }
  }

  if (options.users) {
    /**
     * Users pages templates
     */
    api.render("./users", {
      material: options.material,
      impersonation: options.impersonation,
    });
  }

  if (options.impersonation) {
    /**
     * Add impersonation components
     */
    api.render("./impersonation");
  }

  if (options.material) {
    /**
     * Tim material theme
     */
    api.injectImports(api.entryFile, [
      `import "./plugins/base";`,
      `import "./plugins/chartist";`,
    ]);
    api.injectImports("src/plugins/vuetify.js", [
      `import "@/sass/overrides.sass";`,
    ]);

    api.render("./material");
  }

  let updateOrCreateVueConfig = () => {
    const config = api.resolve("vue.config.js");

    if (!fs.existsSync(config)) {
      fs.writeFileSync(config, "module.exports = {}", "utf8");
    }

    const file = require(config);

    if (!file.transpileDependencies) {
      file.transpileDependencies = [];
    }

    if (!file.transpileDependencies.includes("vtec-admin")) {
      file.transpileDependencies.push("vtec-admin");
    }

    fs.writeFileSync(
      config,
      `module.exports = ${JSON.stringify(file, 2, 2)}`,
      "utf8"
    );
  };

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

    /**
     * Add vtec admin to babel transpile
     */
    updateOrCreateVueConfig();
  });
};
