<template>
  <v-text-field
    v-bind="commonProps"
    :filled="filled"
    type="number"
    :step="step"
    @change="change"
    @input="update"
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";
import Filterable from "../../../mixins/filterable";

export default {
  mixins: [Input, Editable, Filterable],
  props: {
    icon: String,
    filled: {
      type: Boolean,
      default: true,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
};
</script>
