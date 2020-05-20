<template>
  <v-switch
    :false-value="false"
    :true-value="true"
    :input-value="input"
    v-bind="commonProps"
    @change="changeState"
  ></v-switch>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";
import Filterable from "../../../mixins/filterable";

export default {
  mixins: [Input, Editable, Filterable],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeState(value) {
      this.change(value);
      this.update(value);
    },
  },
};
</script>
