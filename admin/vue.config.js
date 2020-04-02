const path = require("path");

module.exports = {
  publicPath: process.env.BASE_URL,

  transpileDependencies: ["vuetify"],

  configureWebpack: {
    resolve: {
      alias: {
        "vue-relay-admin": path.resolve(__dirname, "lib/vue-relay-admin"),
      },
    },
  },

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
};
