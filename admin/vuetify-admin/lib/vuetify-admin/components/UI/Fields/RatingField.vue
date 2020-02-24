<template>
  <va-field v-bind="$props">
    <v-rating
      :value="record[source]"
      readonly
      dense
      :color="color"
      :background-color="backgroundColor"
    ></v-rating>
  </va-field>
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
