<template>
  <va-input v-bind="$props">
    <v-switch v-model="input"></v-switch>
  </va-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "BooleanInput",
  mixins: [Input]
};
</script>
