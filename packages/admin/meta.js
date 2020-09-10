const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const { kebabCase } = require("lodash");
const { getDocComponents } = require("./docgen");

const metaDir = path.resolve(__dirname, "dist/json");

rimraf.sync(metaDir);
mkdirp.sync(metaDir);

let tagsJson = {};
let attributesJson = {};
let webTypesJson = [];

const writeJsonFile = (dir, file, json) => {
  fs.writeFileSync(
    path.resolve(dir, file),
    JSON.stringify(json, null, 2) + "\n"
  );
};

getDocComponents().then((docs) => {
  docs.forEach((doc) => {
    let tag = kebabCase(doc.displayName);

    /**
     * Generate Vetur meta
     */
    tagsJson[`va-${tag}`] = {
      description: doc.description,
      attributes: (doc.props || []).map((p) => kebabCase(p.name)),
    };

    (doc.props || []).forEach((p) => {
      attributesJson[`va-${tag}/${kebabCase(p.name)}`] = {
        description: p.description,
        type: p.type.name,
      };
    });

    /**
     * Generate Jetbrains meta
     */
    webTypesJson.push({
      name: `Va${doc.displayName}`,
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

    /**
     * Write JSON files
     */
    writeJsonFile(metaDir, "tags.json", tagsJson);
    writeJsonFile(metaDir, "attributes.json", attributesJson);
    writeJsonFile(metaDir, "web-types.json", {
      $schema:
        "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
      framework: "vue",
      name: "vuetify-admin",
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
});
