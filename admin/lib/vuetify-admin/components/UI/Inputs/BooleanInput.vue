<template>
  <v-switch v-model="input" v-bind="commonProps" @change="change"></v-switch>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "BooleanInput",
  mixins: [Input],
  props: {
    default: {
      type: Boolean,
      default: false
    }
  }
};
</script>
