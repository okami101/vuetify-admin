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
    :items="items || choices"
    :chips="chips"
    :clearable="clearable"
    @change="change"
  >
  </v-select>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import Choices from "vuetify-admin/mixins/choices";

export default {
  name: "SelectInput",
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
  },
  data() {
    return {
      items: null
    };
  },
  async mounted() {
    /**
     * Load parent reference input if available
     */
    if (this.$parent.fetchChoices) {
      this.items = await this.$parent.fetchChoices();
    }
  }
};
</script>
