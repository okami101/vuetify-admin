const { chalk } = require(require.resolve("@vue/cli-shared-utils"));
const { resolve } = require("path");
const fs = require("fs");
const ejs = require("ejs");
const util = require("util");
const isEmpty = require("lodash/isEmpty");
const upperFirst = require("lodash/upperFirst");
const kebabCase = require("lodash/kebabCase");

const options = {
  description: "resource ui crud maker",
  usage: "vue-cli-service crud:make [resourceName] [options]",
  options: {
    resourceName:
      "Required resource name. Should be on plural snake_case format, ex. monsters, monster_children, etc. This unique name will be used inside API URL calls and ui client router slug.",
    output:
      "Output directory of resource generated crud pages. Default is 'src/resources'",
    locale:
      "Default vue-i18n locale used for register resource labels (name and fields).",
    name: "Localized name of resource. Will be shown on menus and page titles.",
    api: "Will override API default base path in resource store module.",
    icon:
      "Icon of resource for menus and list pages. Should be a supported mdi icon (mdi-account, etc.).",
    label:
      "Property that define an existing resource, see it as a stringify or toString function.",
    translatable:
      "Activate if resource has translatable fields. If set, a contextual locale selector will be available in order to select used language on each translatable field. A locale query parameter will be send to backend.",
    actions:
      "Optional supported crud operations, do not set if you want all by default. Choose between 'list', 'show', 'create', 'edit', 'delete'.",
    fields:
      "For more advanced generation, you can even specify all fields used by this resource. This fields will be generated on each crud views. Each field can specify name (required), localized label, and specific field widget options.",
    columns: "Fields that should be shown on data table list.",
    sortable: "Fields that can be sortable.",
    filterable:
      "Fields that can be filtered individually. Will appear on advanced filter on list page.",
    include: "Related resources to include on list page with eager loading.",
    lint: "Automatic lint after end of command.",
  },
};

function service(resourceName, args = {}, api) {
  if (!resourceName) {
    console.log(chalk.red(`not specified resource 'name' argument.`));
    return;
  }

  /**
   * Get formatted array input
   */
  let getFormattedInputArray = (input) => {
    let value = args[input];

    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      return value;
    }

    return value.split(",").map((s) => s.trim());
  };

  /**
   * Get standardized fields input
   */
  let getFormattedFields = () => {
    return (getFormattedInputArray("fields") || []).map((f) => {
      if (typeof f === "string") {
        let segments = f.split(":");

        let field = {
          name: segments[0],
          type: "text",
        };

        if (segments.length > 1) {
          field.type = segments[1];
        }
        return field;
      }
      return f;
    });
  };

  /**
   * Generate crud views
   */
  let resource = kebabCase(resourceName);
  let fields = getFormattedFields();
  let output = args.output || "./src/resources";

  const sourceDir = resolve(__dirname, "../stubs");
  const targetDir = resolve(process.cwd(), output, resource);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  /**
   * Let's generate crud files
   */
  let actions = getFormattedInputArray("actions") || [
    "list",
    "show",
    "create",
    "edit",
    "delete",
  ];

  ["create", "edit", "form", "list", "show"].forEach((template) => {
    if (actions) {
      if (template === "form") {
        // Form only if at least create or edit action
        if (!actions.includes("create") && !actions.includes("edit")) {
          return;
        }
      } else if (!actions.includes(template)) {
        return;
      }
    }

    /**
     * Prepare EJS variables
     */
    let data = {
      name: resourceName,
      slug: resourceName.replace("_", "-"),
      resource,
      fields: fields
        .filter((f) => {
          return template !== "form" || f.form !== false;
        })
        .map((f) => {
          return { ...f };
        }),
    };

    /**
     * Build field props
     */
    data.fields.forEach((f) => {
      /**
       * Prepare all attributes for fields and inputs component
       */
      let attributes = f.attributes || {};

      if (template === "form" && f.form) {
        let { type, ...form } = f.form;

        if (type) {
          f.type = type;
        }

        attributes = {
          ...attributes,
          ...form,
        };
      }

      /**
       * Format as string for EJS
       */
      if (!isEmpty(attributes)) {
        f.attrs = Object.keys(attributes)
          .map((p) => {
            let value = attributes[p];

            if (value === true) {
              return p;
            }

            if (typeof value === "string") {
              return `${kebabCase(p)}="${attributes[p]}"`;
            }
            return `:${kebabCase(p)}="${util.inspect(attributes[p])}"`;
          })
          .join(" ");
      }
    });

    if (template === "list") {
      let sortable = getFormattedInputArray("sortable") || [];
      let include = getFormattedInputArray("include");
      data.include = include ? util.inspect(include) : undefined;

      data.filters = util.inspect(
        (getFormattedInputArray("filterable") || []).map((name) => {
          let field = fields.find((f) => f.name === name);

          if (!field || field.type === "text") {
            return name;
          }

          let filter = {
            source: field.name,
            type: field.form && field.form.type ? field.form.type : field.type,
            ...((field.attributes || field.filter) && {
              attributes: { ...field.attributes, ...field.filter },
            }),
          };
          return filter;
        })
      );
      data.fields = util.inspect(
        (getFormattedInputArray("columns") || []).map((name) => {
          let field = fields.find((f) => f.name === name);

          if (!field || field.type === "text") {
            return sortable.includes(name)
              ? { source: name, sortable: true }
              : name;
          }

          let column = {
            source: field.name,
            type: field.type,
            ...(sortable.includes(field.name) && {
              sortable: true,
            }),
            ...(field.attributes && { attributes: field.attributes }),
          };

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

  if (!locale.resources) {
    locale.resources = {};
  }

  locale.resources[resourceName] = {
    name: args.name,
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
  let resourceFile = resolve(process.cwd(), output, "index.js");
  let resources = require("esm")(module)(resourceFile);

  let resourceObject = resources.default.find(
    ({ name }) => resourceName === name
  );

  if (!resourceObject) {
    resourceObject = {
      name: resourceName,
    };

    resources.default.push(resourceObject);
  }

  ["api", "icon", "label", "translatable"].forEach((prop) => {
    if (args[prop]) {
      resourceObject[prop] = args[prop];
    }
  });

  ["actions", "permissions"].forEach((prop) => {
    if (args[prop]) {
      resourceObject[prop] = getFormattedInputArray(args[prop]);
    }
  });

  fs.writeFileSync(
    resourceFile,
    `export default ${util.inspect(resources.default)}` + "\n"
  );

  /**
   * Add entry to sidebar
   */
  const navFile = resolve(process.cwd(), "./src/_nav.js");
  let content = fs.readFileSync(navFile).toString();

  let code = `admin.getResourceLink("${resourceName}")`;

  if (content.indexOf(code) === -1) {
    let startOffset = content.lastIndexOf(",\n  ") + 1;
    content =
      content.substring(0, startOffset) +
      `${code},` +
      content.substring(startOffset);

    fs.writeFileSync(navFile, content);
  }

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
