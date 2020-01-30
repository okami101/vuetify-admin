const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "vuetify-admin": path.resolve(__dirname, "lib/admin")
      }
    }
  }
};
