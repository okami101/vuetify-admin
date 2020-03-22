<template>
  <va-input v-bind="$props">
    <v-rating
      dense
      :color="color"
      :background-color="backgroundColor"
      @change="change"
      @input="update"
    ></v-rating>
  </va-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "RatingInput",
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
