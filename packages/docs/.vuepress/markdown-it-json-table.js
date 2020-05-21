const fs = require("fs");
const { get } = require("lodash");

module.exports = (md) => {
  let getJsonSchemaData = (type, definition) => {
    let data = JSON.parse(
      fs.readFileSync(`.vuepress/public/schemas/${type}.json`)
    );

    let def = get(data.definitions, definition);

    if (!def) {
      console.warn(`Def ${definition} not existing for this schema`);
      return;
    }

    return Object.keys(def.properties).map((key) => {
      let props = def.properties[key];

      if (props.$ref) {
        props =
          data.definitions[props.$ref.substr(props.$ref.lastIndexOf("/") + 1)];
      }
      return {
        name: key,
        type: props.type,
        description: props.description,
      };
    });
  };

  let generateSchemaTable = (state, startLine, type, definition) => {
    let columns = ["Property", "Type", "Description"];
    let data = getJsonSchemaData(type, definition);

    state.line = startLine + 1;

    token = state.push("table_open", "table", 1);
    token = state.push("thead_open", "thead", 1);
    token = state.push("tr_open", "tr", 1);

    for (i = 0; i < columns.length; i++) {
      token = state.push("th_open", "th", 1);
      token.attrs = [["style", "text-align:center"]];

      token = state.push("inline", "", 0);
      token.content = columns[i];
      token.children = [];

      token = state.push("th_close", "th", -1);
    }

    token = state.push("tr_close", "tr", -1);
    token = state.push("thead_close", "thead", -1);

    token = state.push("tbody_open", "tbody", 1);

    for (i = 0; i < data.length; i++) {
      token = state.push("tr_open", "tr", 1);

      [
        { property: "name", formatter: (v) => `**${v}**` },
        { property: "type", formatter: (v) => `\`${v}\`` },
        { property: "description" },
      ].forEach(({ property, formatter }) => {
        let value = data[i][property];
        token = state.push("td_open", "td", 1);

        token = state.push("inline", "", 0);
        token.content = formatter ? formatter(value) : value;
        token.children = [];

        token = state.push("td_close", "td", -1);
      });

      token = state.push("tr_close", "tr", -1);
    }

    token = state.push("tbody_close", "tbody", -1);
    token = state.push("table_close", "table", -1);
  };

  md.block.ruler.before(
    "paragraph",
    "schema",
    (state, startLine, endLine, silent) => {
      var ch,
        args,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }

      ch = state.src.charCodeAt(pos++);

      // Check pipe marker
      if (ch !== 0x7c) {
        return false;
      }

      ch = state.src.charCodeAt(pos++);

      // Check greater marker
      if (ch !== 0x3e) {
        return false;
      }

      if (silent) {
        return true;
      }

      args = state.src.slice(pos, max).trim().split(",");

      switch (args[0]) {
        case "schema":
          generateSchemaTable(state, startLine, args[1], args[2]);
          break;
        case "docgen":
          generateDocgenTable(state, startLine, args[1], args[2]);
          break;
      }

      return true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"],
    }
  );
};
