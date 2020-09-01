<template>
  <component
    :is="taggable ? 'v-combobox' : 'v-autocomplete'"
    v-bind="commonProps"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :small-chips="smallChips"
    :loading="loading"
    :item-text="getItemText"
    :item-value="getItemValue"
    :items="items || choices"
    :search-input.sync="search"
    @change="change"
    @input="update"
  >
    <template v-slot:selection="data" v-if="$scopedSlots.selection">
      <!-- @slot Define a custom selection appearance -->
      <slot name="selection" v-bind="data"></slot>
    </template>
    <template v-slot:item="data" v-if="$scopedSlots.item">
      <!-- @slot Define a custom item appearance -->
      <slot name="item" v-bind="data"></slot>
    </template>
  </component>
</template>

<script>
import Input from "../../../mixins/input";
import Multiple from "../../../mixins/multiple";
import ReferenceInput from "../../../mixins/reference-input";

/**
 * Value editing from a searchable choices. Support multiple and references.
 * Allows searching of linked resources from your API.
 */
export default {
  mixins: [Input, Multiple, ReferenceInput],
  props: {
    /**
     * Minimum characters to tap before search query launch.
     */
    minChars: {
      type: Number,
      default: 3,
    },
    /**
     * Name of request query for searching into your API.
     */
    searchQuery: {
      type: String,
      default: "q",
    },
    /**
     * Enable taggable mode. Transform autocomplete into combobox.
     */
    taggable: Boolean,
  },
  data() {
    return {
      search: null,
    };
  },
  methods: {
    async loadCurrentChoices(value) {
      if (this.reference && value) {
        this.items = await this.fetchCurrentChoices(
          this.multiple ? value : [value]
        );
      }
    },
  },
  watch: {
    input: {
      handler(newVal) {
        /**
         * Fetch full object as soon as we get input value
         */
        this.loadCurrentChoices(newVal);
      },
      immediate: true,
    },
    async search(val, old) {
      if (old === null) {
        return;
      }
      if (!val || val.length < this.minChars) {
        return;
      }

      this.items = [
        ...(this.items || []),
        ...((await this.fetchChoices(val)) || []),
      ];
    },
  },
};
</script>
