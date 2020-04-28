const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");
const ejs = require("ejs");
const util = require("util");
const upperFirst = require("lodash/upperFirst");
const camelCase = require("lodash/camelCase");

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
    include: "Related resources to include on list page with eager-loading",
    searchable: "Enable datagrid global search",
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
  let resource = upperFirst(camelCase(args.name));
  let fields = args.fields || [];

  const sourceDir = resolve(__dirname, "stubs");
  const targetDir = resolve(process.cwd(), args.output, resource);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  /**
   * Let's generate crud files
   */
  ["create", "edit", "form", "list", "show"].forEach((template) => {
    if (args.actions) {
      if (template === "form") {
        // Form only if at least create or edit action
        if (
          !args.actions.includes("create") &&
          !args.actions.includes("edit")
        ) {
          return;
        }
      } else if (!args.actions.includes(template)) {
        return;
      }
    }

    /**
     * Prepare EJS variables
     */
    let data = {
      name: args.name,
      slug: args.name.replace("_", "-"),
      resource,
      fields: fields.filter((f) => {
        return template !== "form" || !f.readonly;
      }),
    };

    let allowedAttributes = {
      show: ["format", "reference", "text", "action", "chip", "color", "small"],
      form: [
        "required",
        "format",
        "reference",
        "multiline",
        "multiple",
        "taggable",
      ],
    };

    /**
     * Build field props
     */
    data.fields.forEach((f) => {
      /**
       * Best suitable default input for few field types
       */
      if (!f.input && ["email", "url"].includes(f.type)) {
        f.input = "text";
      }

      if (allowedAttributes[template]) {
        /**
         * Prepare all attributes for fields and inputs component
         */
        let attributes = Object.keys(f)
          .filter((f) => allowedAttributes[template].includes(f))
          .reduce(
            (o, p) => ({
              ...o,
              [p]: f[p],
            }),
            {}
          );

        /**
         * Add specific autocomplete attributes for reference
         */
        if (
          template === "form" &&
          f.input === "autocomplete" &&
          f.type === "reference"
        ) {
          attributes["option-text"] = f.text;
          attributes.model = `${f.name}_id`;
        }

        /**
         * Format as string for EJS
         */
        f.attributes = Object.keys(attributes)
          .map((p) => {
            let value = attributes[p];

            if (value === true) {
              return p;
            }

            if (typeof value === "string") {
              return `${p}="${attributes[p]}"`;
            }
            return `:${p}="${util.inspect(attributes[p])}"`;
          })
          .join(" ");
      }
    });

    if (template === "list") {
      data.sortable = util.inspect(args.sortable || []);
      data.include = util.inspect(args.include || []);
      data.filters = util.inspect([
        ...(args.searchable ? ["q"] : []),
        ...(args.filterable || []).map((name) => {
          let field = fields.find((f) => f.name === name);

          if (!field || field.type === "text") {
            return name;
          }

          let filter = { source: field.name, type: field.type };

          /**
           * Set input attributes
           */
          Object.keys(field)
            .filter((a) => a !== "required")
            .filter((a) => allowedAttributes["form"].includes(a))
            .forEach((a) => {
              filter[a] = field[a];
            });

          if (field.type === "select") {
            // Multiple choices by default for filters
            filter.multiple = true;
          }
          if (field.type === "reference") {
            // Multiple choices by default and add specific autocompletes
            filter.multiple = true;
            filter.optionText = field.text;
            filter.type = field.input;
          }
          return filter;
        }),
      ]);
      data.fields = util.inspect(
        (args.columns || []).map((name) => {
          let field = fields.find((f) => f.name === name);

          if (!field || field.type === "text") {
            return name;
          }

          let column = { source: field.name, type: field.type };

          allowedAttributes.show.forEach((p) => {
            if (field[p]) {
              column[p] = field[p];
            }
          });

          return column;
        })
      );
    }

    ejs.renderFile(
      resolve(sourceDir, `${upperFirst(template)}.ejs`),
      data,
      {},
      function (err, str) {
        fs.writeFileSync(
          resolve(targetDir, `${upperFirst(template)}.vue`),
          str
        );
      }
    );
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
