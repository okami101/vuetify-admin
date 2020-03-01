<template>
  <v-text-field
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :filled="filled"
    :append-icon="icon"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
    :placeholder="placeholder"
    :clearable="clearable"
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
    placeholder: String,
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
