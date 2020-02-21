<template>
  <v-textarea
    v-if="multiline"
    v-model="input"
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    auto-grow
    filled
    :append-icon="icon"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
  ></v-textarea>
  <v-text-field
    v-else
    v-model="input"
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    filled
    :append-icon="icon"
    :single-line="singleLine"
    :hide-details="hideDetails"
    :dense="dense"
  ></v-text-field>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "TextInput",
  mixins: [Input],
  props: {
    multiline: Boolean,
    icon: String,
    singleLine: Boolean,
    hideDetails: Boolean,
    dense: Boolean
  }
};
</script>
