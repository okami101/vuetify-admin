import ejs from "ejs/ejs.min.js";
import util from "util";
import upperFirst from "lodash/upperFirst";
import kebabCase from "lodash/kebabCase";

const templates = {
  list: `
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list>
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fields: <%- fields %>,
    };
  },
};
</script>
`,
  show: `
<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <%_ for (field of fields) { _%>
              <%_ if (field.type === "text") { _%>
              <va-field source="<%- field.source %>"></va-field>
              <%_ } else { _%>
              <va-field source="<%- field.source %>" type="<%- field.type %>"></va-field>
              <%_ } _%>
              <%_ } _%>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
`,
  create: `
<template>
  <va-create-layout :title="title">
    <va-form :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <%_ for (field of fields) { _%>
              <va-<%- field.type %>-input source="<%- field.source %>"></va-<%- field.type %>-input>
              <%_ } _%>
              <va-save-button></va-save-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["title", "item"],
};
</script>
`,
  edit: `
<template>
  <va-edit-layout :title="title">
    <va-form :id="id" :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <%_ for (field of fields) { _%>
              <va-<%- field.type %>-input source="<%- field.source %>"></va-<%- field.type %>-input>
              <%_ } _%>
              <va-save-button></va-save-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
`,
};

const logger = (resource, action, fields) => {
  console.log(
    `Copy following Vue code template inside this file to override this default page : "src/resources/${kebabCase(
      resource
    )}/${upperFirst(action)}.vue"`
  );
  console.log(
    ejs.render(templates[action], {
      fields:
        action === "list"
          ? util.inspect(
              fields.map((f) => {
                return f.type === "text" ? f.source : { ...f };
              })
            )
          : fields,
    })
  );
};

/**
 * Show generated template from given fields
 */
export { logger };
