const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");
const ejs = require("ejs");
const util = require("util");
const upperFirst = require("lodash/upperFirst");

const options = {
  description: "resource ui crud maker",
  usage: "vue-cli-service crud:make [options]",
  options: {
    name: "Resource name",
    icon: "Resource MDI",
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

  const sourceDir = resolve(__dirname, "stubs");
  const targetDir = resolve(process.cwd(), args.output, resource);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  /**
   * Let's generate crud files
   */
  ["Create", "Edit", "Form", "List", "Show"].forEach((template) => {
    if (args.actions) {
      if (template === "Form") {
        if (
          !args.actions.includes("create") &&
          !args.actions.includes("edit")
        ) {
          return;
        }
      } else if (!args.actions.includes(template.toLowerCase())) {
        return;
      }
    }

    let data = { ...entries };
    if (template === "List") {
      data.fields = entries.fields.map(({ name }) => name);
      data.sortables = entries.fields
        .filter((f) => f.sortable)
        .map(({ name }) => name);
      data.filters = entries.fields
        .filter((f) => f.filterable)
        .map(({ name, type }) => {
          return { name, type };
        });
      data.columns = entries.fields
        .filter((f) => f.column)
        .map(({ name, type }) => {
          return { name, type };
        });
    }

    ejs.renderFile(resolve(sourceDir, `${template}.ejs`), data, {}, function (
      err,
      str
    ) {
      fs.writeFileSync(resolve(targetDir, `${template}.vue`), str);
    });
  });

  /**
   * Edit JSON locale file
   */
  let localFilePath = resolve(
    process.cwd(),
    `./src/locales/${args.locale || "en"}.json`
  );
  let locale = JSON.parse(fs.readFileSync(localFilePath));

  locale.resources[args.name] = {
    name: args.label,
    fields: args.fields.reduce(
      (o, field) => ({
        ...o,
        [field.name]: field.label,
      }),
      {}
    ),
  };

  fs.writeFileSync(localFilePath, JSON.stringify(locale, null, 2) + "\n");

  /**
   * Add resource entry into resources
   */
  let resourceFile = resolve(process.cwd(), "./src/resources/index.js");
  let resources = require("esm")(module)(resourceFile);
  let descriptor = {};
  ["icon", "actions", "permissions", "translatable"].forEach((prop) => {
    if (args[prop]) {
      descriptor[prop] = args[prop];
    }
  });
  resources.default.push({
    name: args.name,
    ...descriptor,
  });

  fs.writeFileSync(
    resourceFile,
    `export default ${util.inspect(resources.default)}` + "\n"
  );

  /**
   * Add entry to sidebar
   */
  const navFile = resolve(process.cwd(), "./src/_nav.js");
  let content = fs.readFileSync(navFile);

  let startOffset = content.indexOf("];");
  let code = `  resourceLink("${args.name}"),\n`;

  content =
    content.toString().substring(0, startOffset) +
    code +
    content.toString().substring(startOffset);

  fs.writeFileSync(navFile, content);
}

module.exports = {
  service,
  options,
};
