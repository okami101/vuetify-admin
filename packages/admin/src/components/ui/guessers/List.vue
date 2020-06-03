<template>
  <v-card>
    <v-card-title>
      <h1 class="display-2">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-data-iterator>
        <va-data-table :fields="fields"> </va-data-table>
      </va-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script>
import { guessFields } from "../../../utils/guesser";

export default {
  props: ["resource", "title"],
  data() {
    return {
      fields: [],
    };
  },
  async mounted() {
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
