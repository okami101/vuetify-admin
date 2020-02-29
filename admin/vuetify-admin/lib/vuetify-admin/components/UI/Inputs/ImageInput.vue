<template>
  <v-file-input
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :clearable="clearable"
    @change="change"
  ></v-file-input>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "ImageInput",
  mixins: [Input],
  props: {
    multiple: Boolean
  }
};
</script>
