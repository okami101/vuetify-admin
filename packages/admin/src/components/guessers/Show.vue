<template>
  <va-show-layout :title="title">
    <va-show :item="item">
      <v-row justify="center">
        <v-col sm="4">
          <v-card>
            <v-card-text>
              <va-field
                v-for="field in fields"
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
import { guessFields } from "../../utils/guesser";

export default {
  props: ["title", "resource", "item"],
  data() {
    return {
      fields: [],
    };
  },
  async created() {
    this.fields = await guessFields(
      this.$store,
      this.$i18n,
      this.resource.name
    );

    if (this.$guessLogger) {
      this.$guessLogger(this.resource.name, "show", this.fields);
    }
  },
};
</script>
