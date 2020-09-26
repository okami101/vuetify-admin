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
      axios: "^0.20.0",
      "portal-vue": "^2.1.0",
      "vuetify-admin": "^0.4.0",
      "vue-chartist": "^2.3.0",
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
      register: options.register,
      reset: options.reset,
      remember: options.authProvider === "sanctum",
    });
  }

  if (options.register) {
    /**
     * Register page
     */
    api.render("./register");
  }

  if (options.reset) {
    /**
     * Resets pages
     */
    api.render("./reset");
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
      `import "./sass/overrides.sass";`,
    ]);

    api.render("./material");
  }

  api.onCreateComplete(() => {
    /**
     * Cleanup unused component and views files
     */
    [
      "src/assets/logo.png",
      "src/components/HelloWorld.vue",
      "src/components/HelloI18n.vue",
      "src/views/Home.vue",
      "src/views/About.vue",
    ].forEach((file) => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    api.exitLog("Full documentation: https://www.okami101.io/vuetify-admin");
    api.exitLog(
      "Please let a star if you liked it on Github: https://github.com/okami101/vuetify-admin"
    );
  });
};
