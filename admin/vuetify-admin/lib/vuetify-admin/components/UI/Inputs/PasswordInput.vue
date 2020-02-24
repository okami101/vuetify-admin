<template>
  <v-text-field
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    :filled="filled"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
    :type="show ? 'text' : 'password'"
    @input="val => (input = val)"
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
    singleLine: Boolean,
    hideDetails: Boolean,
    filled: {
      type: Boolean,
      default: true
    },
    dense: Boolean
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
