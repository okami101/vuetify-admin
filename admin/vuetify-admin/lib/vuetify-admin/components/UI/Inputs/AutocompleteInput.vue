<template>
  <v-select
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
    @change="change"
  >
  </v-select>
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
    }
  }
};
</script>
