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
import { guessFields } from "../../utils/guesser";

export default {
  props: ["resource", "title"],
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
      this.$guessLogger(this.resource.name, "list", this.fields);
    }
  },
};
</script>
