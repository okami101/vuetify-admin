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
  ></v-textarea>
  <v-text-field
    v-else
    v-model="input"
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    filled
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";

export default {
  name: "TextInput",
  mixins: [Input],
  props: {
    multiline: Boolean
  }
};
</script>
