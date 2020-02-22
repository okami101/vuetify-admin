<template>
  <v-text-field
    v-model="input"
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    :filled="filled"
    :append-icon="icon"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
    type="number"
    :step="step"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "NumberInput",
  mixins: [Input],
  props: {
    icon: String,
    singleLine: Boolean,
    hideDetails: Boolean,
    filled: {
      type: Boolean,
      default: true
    },
    dense: Boolean,
    step: {
      type: Number,
      default: 1
    }
  }
};
</script>
