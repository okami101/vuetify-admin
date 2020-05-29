import ejs from "ejs";
import util from "util";

const templates = {
  list: `
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-2">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-data-iterator
        v-slot="props"
        v-model="selected"
        :options.sync="options"
      >
        <va-data-table
          :fields="fields"
          v-bind="props"
          v-model="selected"
          :options.sync="options"
        >
        </va-data-table>
      </va-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      fields: <%- fields %>,
      options: {},
      selected: [],
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
                <va-field source="<%- field.source %>" type="<%- field.type %>"></va-field>
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
    <va-form :item="item" :saving.sync="saving">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <%_ for (field of fields) { _%>
                <va-<%- field.type %>-input source="<%- field.source %>"></va-<%- field.type %>-input>
              <%_ } _%>
              <va-save-button :saving="saving"></va-save-button>
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
  data() {
    return {
      saving: false,
    };
  },
};
</script>
`,
  edit: `
<template>
  <va-edit-layout :title="title">
    <va-form :id="id" :item="item" :saving.sync="saving">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <%_ for (field of fields) { _%>
                <va-<%- field.type %>-input source="<%- field.source %>"></va-<%- field.type %>-input>
              <%_ } _%>
              <va-save-button :saving="saving"></va-save-button>
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
  data() {
    return {
      saving: false,
    };
  },
};
</script>
`,
};

const logger = (type, fields) => {
  console.log(
    ejs.render(templates[type], {
      fields: type === "list" ? util.inspect(fields) : fields,
    })
  );
};

/**
 * Show generated template from given fields
 */
export { logger };
