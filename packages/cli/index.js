module.exports = (api) => {
  const make = require("./make");
  const yaml = require("./yaml");
  api.registerCommand("crud:make", make.options, (args, rawArgs) =>
    make.service(rawArgs[0], args, api)
  );
  api.registerCommand("crud:yaml", yaml.options, (args, rawArgs) =>
    yaml.service(rawArgs[0], args, api)
  );
};
