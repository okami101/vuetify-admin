<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-field
                v-for="field in guessFields"
                :key="field.source"
                :source="field.source"
                :type="field.type"
              ></va-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </va-show>
  </va-show-layout>
</template>

<script>
import ejs from "ejs";
import util from "util";
import { guessFields } from "../../../guesser";

const template = `
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
${"</scr" + "ipt>"}
`;

export default {
  props: ["title", "resource", "item"],
  computed: {
    guessFields() {
      if (!this.item) {
        return [];
      }
      let fields = guessFields(this.$i18n, this.resource.name, this.item);

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
