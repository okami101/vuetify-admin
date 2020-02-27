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
import Field from "vuetify-admin/mixins/field";

export default {
  name: "RatingField",
  mixins: [Field],
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
