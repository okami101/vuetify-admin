<template>
  <v-autocomplete
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :filled="filled"
    :multiple="multiple"
    :item-text="optionText"
    :item-value="optionValue"
    :items="choices"
    :chips="chips"
    :loading="loading"
    @change="change"
    @update:search-input="onSearch"
  >
  </v-autocomplete>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import Choices from "vuetify-admin/mixins/choices";

export default {
  name: "AutocompleteInput",
  mixins: [Input, Choices],
  props: {
    multiple: Boolean,
    filled: {
      type: Boolean,
      default() {
        return !this.multiple;
      }
    },
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      }
    },
    minChars: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async onSearch(search) {
      if (!search || search.length < this.minChars) {
        return;
      }

      this.loading = true;
      if (this.$parent.loadChoices) {
        this.$parent.loadChoices(search);
      }
      this.loading = false;
    }
  }
};
</script>
