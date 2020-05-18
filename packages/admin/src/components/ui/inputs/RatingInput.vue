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

export default {
  mixins: [Input],
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
