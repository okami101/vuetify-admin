<template>
  <div>
    <!-- @slot Default slot if you need to replace default VaFileField or VaImageField. -->
    <slot>
      <component
        :is="`va-${preview ? 'image' : 'file'}-field`"
        :source="source"
        :item="formState.item"
        v-bind="$attrs"
        clearable
        :item-value="itemValue"
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

/**
 * Allow row file uploads. Can be multiple.
 * Current files will be shown as simple link or thumbnail image and can be deleted.
 * Use VaFileField or VaImageField under the hood.
 * No Ajax support.
 */
export default {
  mixins: [Input, Multiple],
  props: {
    /**
     * Show file thumbnail image instead of simple link.
     */
    preview: {
      type: Boolean,
      default: false,
    },
    /**
     * Attribute where taking the id value for identify files to delete.
     */
    itemValue: {
      type: String,
      default: "id",
    },
    /**
     * Add HTML5 `accept` attribute for simple client-side validation.
     */
    accept: String,
  },
  data() {
    return {
      acceptValue: false,
    };
  },
};
</script>
