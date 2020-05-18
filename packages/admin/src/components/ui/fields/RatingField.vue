<template>
  <v-rating
    :value="value"
    readonly
    dense
    :color="color"
    :background-color="backgroundColor"
  ></v-rating>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  mixins: [Field],
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
