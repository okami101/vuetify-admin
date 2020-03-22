<template>
  <v-text-field
    v-bind="commonProps"
    :filled="filled"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    @input="(val) => (input = val)"
    @click:append="show = !show"
    @change="change"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "PasswordInput",
  mixins: [Input],
  props: {
    filled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>
