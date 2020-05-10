<template>
  <v-text-field
    v-bind="commonProps"
    :filled="filled"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :type="show ? 'text' : 'password'"
    @click:append="show = !show"
    @change="change"
    @input="update"
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";

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
