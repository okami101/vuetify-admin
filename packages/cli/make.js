const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");

const options = {
  description: "resource ui crud maker",
  usage: "vue-cli-service crud:make [options]",
  options: {
    name: "Resource name",
    output: "Output of resource generated files",
  },
};

async function service(args = {}, api) {
  if (!args.name) {
    console.log(chalk.red(`not specified resource 'name' argument.`));
    return;
  }

  const sourceDir = resolve(__dirname, "stubs");
  const targetDir = resolve(process.cwd(), args.output);

  /**
   * Generate crud views
   */
  console.log(args.name);
}

module.exports = {
  service,
  options,
};
