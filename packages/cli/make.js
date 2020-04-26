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
    name:
      "Required resource name. Should be on url slug format, used for client-side routes and identify api calls",
    output: "Output directory of resource generated crud pages",
    icon: "Resource MDI",
    label:
      "Main localized label which identify resource. Will be used inside titles, menus, etc.",
    locale:
      "Default vue-i18n locale used for register resource labels (name and fields)",
    translatable:
      "Activate if resource has translatable fields. If setted, a contextual locale selector will be available in order to select used language on each translatable field. A locale query parameter will be send to backend.",
    actions:
      "Optional supported crud operations, do not set if you want all by default. Choose between 'list', 'show', 'create', 'edit', 'delete'",
    fields:
      "For more advanced generation, you can even specify all fields used by this resource. This fields will be inserted on each crud views. Each field can specify name (required), localized label, column (will be shown in datagrid page list), sortable, required, filterable",
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
  let fields = args.fields || [];

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

    /**
     * Prepare EJS variables
     */
    let data = { resource, fields };
    if (template === "List") {
      data.fields = util.inspect(
        fields.filter((f) => !f.excluded).map(({ name }) => name)
      );
      data.sortables = util.inspect(
        fields.filter((f) => f.sortable).map(({ name }) => name)
      );
      data.filters = util.inspect([
        "q",
        ...fields
          .filter((f) => f.filterable)
          .map(({ name, type }) => {
            if (type === "text") {
              return name;
            }

            return { source: name, type };
          }),
      ]);
      data.columns = util.inspect(
        fields
          .filter((f) => f.column)
          .map(({ name, type, options }) => {
            if (type === "text") {
              return name;
            }

            let column = { source: name, type };

            if (options) {
              column.options = options;
            }
            return column;
          })
      );
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
    fields: fields.reduce(
      (o, field) => ({
        ...o,
        [field.name]: field.label,
      }),
      {}
    ),
    enums: fields
      .filter((f) => f.enum)
      .reduce(
        (o, field) => ({
          ...o,
          [field.name]: field.enum,
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
