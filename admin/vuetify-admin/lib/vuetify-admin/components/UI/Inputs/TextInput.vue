<template>
  <v-textarea
    v-if="multiline"
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    auto-grow
    :filled="filled"
    :append-icon="icon"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
    :placeholder="placeholder"
    :clearable="clearable"
    @change="change"
  ></v-textarea>
  <v-text-field
    v-else
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
    @change="change"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "TextInput",
  mixins: [Input],
  props: {
    placeholder: String,
    multiline: Boolean,
    icon: String,
    singleLine: Boolean,
    filled: {
      type: Boolean,
      default: true
    }
  }
};
</script>
