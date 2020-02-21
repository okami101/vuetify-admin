<template>
  <va-input v-bind="$props">
    <v-rating v-model="input" dense></v-rating>
  </va-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "RatingInput",
  mixins: [Input]
};
</script>
