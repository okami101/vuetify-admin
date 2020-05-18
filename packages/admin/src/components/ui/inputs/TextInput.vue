<template>
  <v-textarea
    v-if="multiline"
    v-bind="commonProps"
    auto-grow
    :filled="filled"
    @change="change"
    @input="update"
  ></v-textarea>
  <v-text-field
    v-else
    v-bind="commonProps"
    :filled="filled"
    @change="change"
    @input="update"
    :type="type"
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";

export default {
  mixins: [Input],
  props: {
    multiline: Boolean,
    icon: String,
    type: String,
    filled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
