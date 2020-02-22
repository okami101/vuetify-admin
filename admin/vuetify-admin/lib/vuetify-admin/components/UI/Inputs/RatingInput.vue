<template>
  <va-input v-bind="$props">
    <v-rating
      v-model="input"
      dense
      :color="color"
      :background-color="backgroundColor"
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
      default: "yellow darken-2"
    },
    backgroundColor: {
      type: String,
      default: "yellow"
    }
  }
};
</script>
