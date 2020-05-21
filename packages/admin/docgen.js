const mkdirp = require("mkdirp");
const glob = require("globby");
const fs = require("fs");
const { parse } = require("vue-docgen-api");
const { kebabCase } = require("lodash");

mkdirp.sync("dist/json/docs");

let tagsJson = {};
let attributesJson = {};
let webTypesJson = [];

const writeJsonFile = (path, json) => {
  fs.writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
};

Promise.all(
  glob
    .sync("src/components/(core|layout|ui)/**/[A-Z]*.vue")
    .map(async (path) => {
      let doc = await parse(path);
      let tag = kebabCase(doc.displayName);

      /**
       * Generate json doc.
       */
      writeJsonFile(`dist/json/docs/${tag}.json`, doc);

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
            description: p.description,
          };
        }),
      });
    })
).then(() => {
  writeJsonFile("dist/json/tags.json", tagsJson);
  writeJsonFile("dist/json/attributes.json", attributesJson);
  writeJsonFile("dist/json/web-types.json", {
    $schema:
      "https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json",
    framework: "vue",
    name: "vtec-admin",
    version: "0.1.0",
    contributions: {
      html: {
        tags: webTypesJson,
      },
    },
  });
});
