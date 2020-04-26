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
      "For more advanced generation, you can even specify all fields used by this resource. This fields will be inserted on each crud views. Each field can specify name (required), localized label, and specific field widget options",
    columns: "Fields that should be shown on datagrid list",
    sortable: "Fields that can be sortable",
    filterable: "Fields that can be filtered",
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

    data.fields.forEach((f) => {
      if (f.options) {
        f.options_object = util.inspect(f.options);
      }
    });

    if (template === "List") {
      data.fields = util.inspect(
        fields.filter((f) => !f.excluded).map(({ name }) => name)
      );
      data.sortables = util.inspect(args.sortable);
      data.filters = util.inspect([
        "q",
        ...args.filterable.map((name) => {
          let field = args.fields.find((f) => f.name === name);

          if (field.type === "text") {
            return name;
          }

          let filter = { source: field.name, type: field.type };

          if (field.type === "select") {
            filter.options = {
              // Multiple choices by default for filters
              multiple: true,
            };
          }
          return filter;
        }),
      ]);
      data.columns = util.inspect(
        args.columns.map((name) => {
          let field = args.fields.find((f) => f.name === name);

          if (field.type === "text") {
            return name;
          }

          let column = { source: field.name, type: field.type };

          if (field.options) {
            column.options = field.options;
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

  if (!resources.default.find(({ name }) => args.name === name)) {
    resources.default.push({
      name: args.name,
      ...descriptor,
    });

    fs.writeFileSync(
      resourceFile,
      `export default ${util.inspect(resources.default)}` + "\n"
    );
  }

  /**
   * Add entry to sidebar
   */
  const navFile = resolve(process.cwd(), "./src/_nav.js");
  let content = fs.readFileSync(navFile).toString();

  let code = `resourceLink("${args.name}")`;

  if (content.indexOf(code) === -1) {
    let startOffset = content.indexOf("];");
    content =
      content.substring(0, startOffset) +
      `  ${code},\n` +
      content.substring(startOffset);

    fs.writeFileSync(navFile, content);
  }
}

module.exports = {
  service,
  options,
};
