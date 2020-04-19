const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");

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

  const targetDir = resolve(process.cwd(), args.output);

  /**
   * Generate crud views
   */
}

module.exports = {
  service,
  options,
};
