const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const fs = require("fs");
const yaml = require("js-yaml");
const make = require("./make");
const isEmpty = require("lodash/isEmpty");

const options = {
  description: "resource ui crud generator",
  usage: "vue-cli-service crud:yaml [filePath] [options]",
  options: {
    filePath: "Required path of YAML file descriptor.",
    name: "Optional name of model to import, if not set, all will be imported.",
    output:
      "Output directory of resource generated crud pages. Default is 'src/resources'",
    lint: "Automatic lint after end of command.",
  },
};

function service(file, args = {}, api) {
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

      make.service(
        name,
        {
          output: args.output || "./src/resources",
          name: resource.name,
          api: resource.api,
          icon: resource.icon,
          label: resource.label,
          actions: resource.actions,
          translatable: !isEmpty(resource.translatable),
          columns: resource.columns,
          include: resource.include,
          filterable: resource.filterable,
          sortable: resource.sortable,
          locale: args.locale || "en",
          fields,
        },
        api
      );
    });

  if (args.lint) {
    /**
     * Call lint command
     */
    api.service.run("lint");
  }
}

module.exports = {
  service,
  options,
};
