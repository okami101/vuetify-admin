<template>
  <component
    :is="taggable ? 'v-combobox' : 'v-autocomplete'"
    v-model="input"
    v-bind="commonProps"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :small-chips="smallChips"
    :loading="loading"
    :item-text="optionText"
    :item-value="optionValue"
    :items="items || choices"
    :search-input.sync="search"
    @change="change"
  >
    <template v-slot:selection="data" v-if="$scopedSlots.selection">
      <slot name="selection" v-bind="data"></slot>
    </template>
    <template v-slot:item="data" v-if="$scopedSlots.item">
      <slot name="item" v-bind="data"></slot>
    </template>
  </component>
</template>

<script>
import { VAutocomplete, VCombobox } from "vuetify/lib";
import Input from "vuetify-admin/mixins/input";
import Choices from "vuetify-admin/mixins/choices";

export default {
  name: "AutocompleteInput",
  mixins: [Input, Choices],
  components: {
    VAutocomplete,
    VCombobox
  },
  props: {
    multiple: Boolean,
    filled: {
      type: Boolean,
      default() {
        return !this.multiple;
      }
    },
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      }
    },
    smallChips: Boolean,
    minChars: {
      type: Number,
      default: 3
    },
    taggable: Boolean
  },
  data() {
    return {
      loading: false,
      items: null,
      search: null
    };
  },
  async mounted() {
    if (this.$parent.fetchData && this.input) {
      this.items = await this.$parent.fetchData(
        this.multiple ? this.input : [this.input]
      );
    }
  },
  watch: {
    async search(val, old) {
      if (!val || val.length < this.minChars) {
        return;
      }

      if (this.loading) {
        return;
      }

      this.loading = true;

      if (this.$parent.fetchChoices) {
        this.items = [
          ...(this.items || []),
          ...(await this.$parent.fetchChoices(val))
        ];
      }
      this.loading = false;
    }
  }
};
</script>
