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
import { guessFields } from "../../../guesser";

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
      return items && items.length
        ? guessFields(this.$i18n, this.resource.name, items[0])
        : [];
    },
  },
};
</script>
