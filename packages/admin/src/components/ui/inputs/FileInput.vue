<template>
  <div>
    <slot>
      <component
        :is="`va-${preview ? 'image' : 'file'}-field`"
        :source="source"
        v-bind="$attrs"
        clearable
      ></component>
    </slot>
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
import Input from "../../../mixins/input";

export default {
  mixins: [Input],
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
    multiple: Boolean,
    filled: Boolean,
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      },
    },
    smallChips: Boolean,
    model: {
      type: String,
      default() {
        return `${this.source}_file`;
      },
    },
    accept: String,
  },
};
</script>
