<template>
  <v-text-field
    v-model="input"
    v-bind="commonProps"
    :filled="filled"
    :append-icon="icon"
    type="number"
    :step="step"
    @change="change"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "NumberInput",
  mixins: [Input],
  props: {
    icon: String,
    filled: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
