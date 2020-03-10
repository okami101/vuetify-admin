<template>
  <div>
    <slot></slot>
    <!-- multiple as v-bind because of vuetify v-model bug forced to array -->
    <v-file-input
      v-bind="multiple ? { ...commonProps, multiple: true } : commonProps"
      :filled="filled"
      :chips="chips"
      :small-chips="smallChips"
      :accept="accept"
      @change="update"
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
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      }
    },
    smallChips: Boolean,
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
