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
          :fields="guessFields(props.items)"
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
import ejs from "ejs";
import util from "util";
import { guessFields } from "../../../guesser";

const template = `
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
${"</scr" + "ipt>"}
`;

export default {
  props: ["resource", "title"],
  data() {
    return {
      options: {},
      selected: [],
    };
  },
  methods: {
    guessFields(items) {
      if (!items) {
        return [];
      }
      let fields = guessFields(this.$i18n, this.resource.name, items[0]);

      /**
       * Show generated code
       */
      console.log(
        ejs.render(template, {
          fields: util.inspect(fields),
        })
      );

      return fields;
    },
  },
};
</script>
