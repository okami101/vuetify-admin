<template>
  <va-edit-layout :title="title">
    <va-form :id="id" :item="item" :saving.sync="saving">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <component
                v-for="input in guessInputs()"
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
  </va-edit-layout>
</template>

<script>
import { guessInputs } from "../../../utils/guesser";

export default {
  props: ["id", "title", "resource", "item"],
  data() {
    return {
      saving: false,
    };
  },
  methods: {
    guessInputs() {
      if (!this.item) {
        return [];
      }
      let fields = guessInputs(this.$i18n, this.resource.name, this.item);

      if (this.$guessLogger) {
        this.$guessLogger("edit", fields);
      }

      return fields;
    },
  },
};
</script>
