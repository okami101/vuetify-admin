const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");
const ejs = require("ejs");
const upperFirst = require("lodash/upperFirst");

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

  /**
   * Generate crud views
   */
  let resource = upperFirst(args.name);

  /**
   * Prepare EJS variables
   */
  let entries = { resource, fields: args.fields };

  /**
   * Let's generate crud files
   */
  const sourceDir = resolve(__dirname, "stubs");
  const targetDir = resolve(process.cwd(), args.output, resource);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  ["Create", "Edit", "Form", "List", "Show"].forEach((template) => {
    let data = { ...entries };
    if (template === "List") {
      data.fields = entries.fields.map(({ name }) => name);
      data.filters = entries.fields
        .filter((f) => f.filterable)
        .map(({ name, type }) => {
          return { name, type };
        });
      data.columns = entries.fields
        .filter((f) => f.column)
        .map(({ name, type, sortable }) => {
          return { name, type, sortable };
        });
    }

    ejs.renderFile(resolve(sourceDir, `${template}.ejs`), data, {}, function (
      err,
      str
    ) {
      fs.writeFileSync(resolve(targetDir, `${template}.vue`), str);
    });
  });
}

module.exports = {
  service,
  options,
};
