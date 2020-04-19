module.exports = (api) => {
  const make = require("./make");
  const generate = require("./generate");
  api.registerCommand("crud:make", make.options, (args) =>
    report.service(args, api)
  );
  api.registerCommand("crud:generate", generate.options, (args) =>
    report.service(args, api)
  );
};
