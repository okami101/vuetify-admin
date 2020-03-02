<template>
  <v-select
    v-model="input"
    v-bind="commonProps"
    :single-line="singleLine"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :item-text="optionText"
    :item-value="optionValue"
    :items="items || choices"
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
    singleLine: Boolean,
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
