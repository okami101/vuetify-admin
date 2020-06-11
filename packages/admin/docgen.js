const glob = require("globby");
const { parse } = require("vue-docgen-api");

let getDocComponents = (relative = ".") => {
  return Promise.all(
    glob
      .sync(`${relative}/src/components/(layout|ui)/**/[A-Z]*.vue`)
      .map(async (path) => {
        let doc = await parse(path);
        doc.mixins = [];
        /**
         * Get mixins.
         */
        ["props", "events"].forEach((type) => {
          if (doc[type]) {
            doc[type].forEach((p) => {
              if (p.mixin && !doc.mixins.includes(p.mixin.name)) {
                doc.mixins.push(p.mixin.name);
              }
            });
          }
        });

        /**
         * Generate json doc into VuePress for automatic markdown API.
         */
        return doc;
      })
  );
};

let getDocMixins = (relative = ".") =>
  Promise.all(
    glob.sync(`${relative}/src/mixins/**/*.js`).map(async (path) => {
      let doc = await parse(path);

      /**
       * Generate json doc into VuePress for automatic markdown API.
       */
      return doc;
    })
  );

module.exports = { getDocComponents, getDocMixins };
