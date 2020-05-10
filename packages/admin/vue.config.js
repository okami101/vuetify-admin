const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin([
        { from: "src/loader.js" },
        { from: "src/resources.js" },
        { from: "src/vuetify.js" },
      ]),
    ],
  },
};
