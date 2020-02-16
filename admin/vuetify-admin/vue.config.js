const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],

  configureWebpack: {
    resolve: {
      alias: {
        "vuetify-admin": path.resolve(__dirname, "lib/vuetify-admin")
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
