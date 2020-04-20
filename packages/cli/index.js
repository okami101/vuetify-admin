const make = require("./make");
const generate = require("./generate");

module.exports = (api) => {
  const make = require("./make");
  const generate = require("./generate");
  api.registerCommand("crud:make", make.options, (args) =>
    make.service(args, api)
  );
  api.registerCommand("crud:generate", generate.options, (args) =>
    generate.service(args, api)
  );
};
