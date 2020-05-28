<template>
  <va-create-layout :title="title">
    <va-form :item="item" :saving.sync="saving">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <component
                v-for="input in guessInputs"
                :key="input.source"
                :source="input.source"
                :is="`va-${input.type}-input`"
              ></component>
              <va-save-button :saving="saving"></va-save-button>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-form>
  </va-create-layout>
</template>

<script>
import ejs from "ejs";
import util from "util";
import { guessInputs } from "../../../guesser";

const template = `
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
${"</scr" + "ipt>"}
`;

export default {
  props: ["title", "resource", "item"],
  data() {
    return {
      saving: false,
    };
  },
  computed: {
    guessInputs() {
      if (!this.item) {
        return [];
      }
      let fields = guessInputs(this.$i18n, this.resource.name, this.item);

      /**
       * Show generated code
       */
      console.log(
        ejs.render(template, {
          fields,
        })
      );

      return fields;
    },
  },
};
</script>
