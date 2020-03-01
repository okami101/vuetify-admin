<template>
  <div>
    <slot></slot>
    <v-file-input
      v-model="input"
      :label="label"
      :hint="hint"
      :rules="rules"
      :error-messages="errorMessages"
      :hide-details="hideDetails"
      :dense="dense"
      :placeholder="placeholder"
      :filled="filled"
      :chips="chips"
      :multiple="multiple"
      :clearable="clearable"
      :accept="accept"
      @change="change"
    ></v-file-input>
  </div>
</template>

<script>
import Input from "vuetify-admin/mixins/input";

export default {
  name: "FileInput",
  mixins: [Input],
  props: {
    placeholder: String,
    multiple: Boolean,
    filled: Boolean,
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      }
    },
    model: {
      type: String,
      default() {
        return `${this.source}_file`;
      }
    },
    accept: String
  }
};
</script>
