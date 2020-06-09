module.exports = {
  publicPath: process.env.BASE_URL,
  transpileDependencies: ["vuetify", "vtec-admin"],
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
