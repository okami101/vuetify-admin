<template>
  <va-form :id="id" :item="item" :saving.sync="saving">
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
</template>

<script>
import { guessInputs } from "../../../guesser";

export default {
  props: ["id", "resource", "item"],
  data() {
    return {
      saving: false,
    };
  },
  computed: {
    guessInputs() {
      return this.item
        ? guessInputs(this.$i18n, this.resource.name, this.item)
        : [];
    },
  },
};
</script>
