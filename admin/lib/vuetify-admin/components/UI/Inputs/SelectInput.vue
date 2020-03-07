<template>
  <v-select
    v-bind="commonProps"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :small-chips="smallChips"
    :item-text="optionText"
    :item-value="optionValue"
    :items="items || choices"
    @change="change"
    @input="update"
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
    },
    smallChips: Boolean
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
