const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const glob = require("globby");
const { parse } = require("vue-docgen-api");
const { kebabCase } = require("lodash");

const metasDir = path.resolve(__dirname, "dist/json");
const docsDir = path.resolve(__dirname, "dist/json/docs");

rimraf.sync(metasDir);
mkdirp.sync(docsDir);

let tagsJson = {};
let attributesJson = {};
let webTypesJson = [];

const writeJsonFile = (dir, file, json) => {
  fs.writeFileSync(
    path.resolve(dir, file),
    JSON.stringify(json, null, 2) + "\n"
  );
};

Promise.all([
  ...glob.sync("src/components/(layout|ui)/**/[A-Z]*.vue").map(async (path) => {
    let doc = await parse(path);
    let tag = kebabCase(doc.displayName);

    /**
     * Generate json doc into VuePress for automatic markdown API.
     */
    writeJsonFile(docsDir, `${tag}.json`, doc);

    /**
     * Generate Vetur metas
     */
    tagsJson[tag] = {
      description: doc.description,
      attributes: (doc.props || []).map((p) => p.name),
    };

    (doc.props || []).forEach((p) => {
      attributesJson[`${tag}/${p.name}`] = {
        description: p.description,
        type: p.type.name,
      };
    });

    /**
     * Generate Jetbrains metas
     */
    webTypesJson.push({
      name: doc.displayName,
      description: doc.description,
      attributes: (doc.props || []).map((p) => {
        return {
          name: p.name,
          value: {
            kind: "expression",
            type: p.type.name,
          },
          ...(p.type.name === "boolean" &&
            !p.defaultValue && { default: "false" }),
          ...(p.type.name === "boolean" && { type: p.type.name }),
          description: p.description,
        };
      }),
    });
  }),
  ...glob.sync("src/mixins/**/*.js").map(async (path) => {
    let doc = await parse(path);
    let tag = kebabCase(doc.displayName);

    /**
     * Generate json doc into VuePress for automatic markdown API.
     */
    writeJsonFile(docsDir, `${tag}.json`, doc);
  }),
]).then(() => {
  writeJsonFile(metasDir, "tags.json", tagsJson);
  writeJsonFile(metasDir, "attributes.json", attributesJson);
  writeJsonFile(metasDir, "web-types.json", {
    $schema:
      "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    framework: "vue",
    name: "vtec-admin",
    version: "0.1.0",
    contributions: {
      html: {
        "types-syntax": "typescript",
        "description-markup": "markdown",
        tags: webTypesJson,
      },
    },
  });
});
