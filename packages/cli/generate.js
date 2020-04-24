const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const fs = require("fs");
const yaml = require("js-yaml");
const make = require("./make");

const options = {
  description: "resource ui crud generator",
  usage: "vue-cli-service crud:generate [options]",
  options: {
    file: "Yaml file descriptor",
    output: "Output of resource generated files",
  },
};

async function service(args = {}, api) {
  if (!args.file) {
    console.log(chalk.red(`not specified descriptor 'file' argument.`));
    return;
  }

  /**
   * Generate crud views
   */
  const resources = yaml.safeLoad(fs.readFileSync(args.file, "utf8"));

  Object.keys(resources).forEach((name) => {
    let resource = resources[name];

    const fields = Object.keys(resource.fields).map((name) => {
      return {
        name,
        ...resource.fields[name],
      };
    });

    make.service({
      output: args.output,
      name,
      label: resource.label,
      icon: resource.icon,
      actions: resource.actions,
      translatable: resource.translatable,
      locale: args.locale || "en",
      fields: fields.map((field) => {
        return {
          ...field,
          type: field.type || "text",
        };
      }),
    });
  });
}

module.exports = {
  service,
  options,
};
