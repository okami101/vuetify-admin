const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        "vuetify-admin": path.resolve(__dirname, "lib/admin")
      }
    }
  }
};
