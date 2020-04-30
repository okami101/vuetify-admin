module.exports = (api) => {
  const make = require("./make");
  const generate = require("./generate");
  api.registerCommand("crud:make", make.options, (args) =>
    make.service(args, api)
  );
  api.registerCommand("crud:yaml", generate.options, (args) =>
    generate.service(args, api)
  );
};
