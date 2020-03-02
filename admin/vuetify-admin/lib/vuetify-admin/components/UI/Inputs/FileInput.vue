<template>
  <div>
    <slot></slot>
    <!-- multiple as v-bind because of vuetify v-model bug forced to array -->
    <v-file-input
      v-model="input"
      v-bind="multiple ? { ...commonProps, multiple: true } : commonProps"
      :single-line="singleLine"
      :filled="filled"
      :chips="chips"
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
    multiple: Boolean,
    filled: Boolean,
    singleLine: Boolean,
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
