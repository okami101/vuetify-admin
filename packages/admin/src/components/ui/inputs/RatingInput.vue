<template>
  <va-input v-bind="$props">
    <v-rating
      dense
      v-bind="commonProps"
      :color="color"
      :background-color="backgroundColor"
      @change="change"
      @input="update"
    ></v-rating>
  </va-input>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";

export default {
  mixins: [Input, Editable],
  props: {
    color: {
      type: String,
      default: "yellow darken-2",
    },
    backgroundColor: {
      type: String,
      default: "yellow",
    },
  },
};
</script>
