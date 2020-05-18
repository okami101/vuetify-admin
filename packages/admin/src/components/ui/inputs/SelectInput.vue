<template>
  <v-select
    v-bind="commonProps"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :small-chips="smallChips"
    :item-text="getItemText"
    :item-value="getItemValue"
    :items="items || choices"
    @change="change"
    @input="update"
  >
  </v-select>
</template>

<script>
import Input from "../../../mixins/input";
import Reference from "../../../mixins/reference";

export default {
    mixins: [Input, Reference],
  props: {
    multiple: Boolean,
    filled: {
      type: Boolean,
      default() {
        return !this.multiple;
      },
    },
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      },
    },
    smallChips: {
      type: Boolean,
      default() {
        return this.multiple && this.filterable;
      },
    },
  },
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
