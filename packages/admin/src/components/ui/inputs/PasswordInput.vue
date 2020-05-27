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

/**
 * Use it for password. No value accepted. Has show/hide behavior for current input.
 */
export default {
  mixins: [Input],
  props: {
    /**
     * Use full filled background color style.
     */
    filled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      show: false,
      acceptValue: false,
    };
  },
};
</script>
