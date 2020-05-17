const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const fs = require("fs");
const yaml = require("js-yaml");
const make = require("./make");
const isEmpty = require("lodash/isEmpty");

const options = {
  description: "resource ui crud generator",
  usage: "vue-cli-service crud:yaml [file] [options]",
  options: {
    file: "Required Yaml file descriptor.",
    name: "Optional name of model to import, if not set, all will be imported.",
    output:
      "Output directory of resource generated crud pages. Default is 'src/resources'",
  },
};

async function service(file, args = {}, api) {
  if (!file) {
    console.log(chalk.red(`not specified 'file' argument.`));
    return;
  }

  /**
   * Generate crud views
   */
  const descriptor = yaml.safeLoad(fs.readFileSync(file, "utf8"));

  Object.keys(descriptor.resources)
    .filter((n) => (args.name ? args.name === n : true))
    .forEach((name) => {
      let resource = descriptor.resources[name];

      const fields = Object.keys(resource.fields)
        .map((name) => {
          return {
            name,
            ...resource.fields[name],
          };
        })
        .map((field) => {
          return {
            ...field,
            type: field.type || "text",
          };
        });

      make.service({
        output: args.output || "./src/resources",
        name,
        label: resource.label,
        icon: resource.icon,
        actions: resource.actions,
        translatable: !!resource.translatable,
        columns: resource.columns,
        include: resource.include,
        filterable: resource.filterable,
        sortable: resource.sortable,
        searchable: !isEmpty(resource.searchable),
        locale: args.locale || "en",
        fields,
      });
    });
}

module.exports = {
  service,
  options,
};
