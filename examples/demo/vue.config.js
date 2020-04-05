let path = require("path");

module.exports = {
  publicPath: process.env.BASE_URL,

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
  },

  devServer: {
    disableHostCheck: true,
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@vtec/admin": path.resolve(
          __dirname,
          "..",
          "..",
          "packages",
          "admin",
          "src"
        ),
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
};
