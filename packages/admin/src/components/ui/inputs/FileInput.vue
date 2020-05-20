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
import Multiple from "../../../mixins/multiple";

export default {
  mixins: [Input, Multiple],
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
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
