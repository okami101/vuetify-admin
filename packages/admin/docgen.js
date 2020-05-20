const mkdirp = require("mkdirp");
const glob = require("globby");
const fs = require("fs");
const { parse } = require("vue-docgen-api");
const { kebabCase } = require("lodash");

mkdirp.sync("dist/json/docs");

glob.sync("src/components/(core|layout|ui)/**/[A-Z]*.vue").map(async (path) => {
  let doc = await parse(path);

  fs.writeFileSync(
    `dist/json/docs/${kebabCase(doc.displayName)}.json`,
    JSON.stringify(doc, null, 2) + "\n"
  );
});
