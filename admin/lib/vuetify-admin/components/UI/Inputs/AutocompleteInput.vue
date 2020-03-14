<template>
  <component
    :is="taggable ? 'v-combobox' : 'v-autocomplete'"
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
    @input="update"
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
import Reference from "vuetify-admin/mixins/reference";
import get from "lodash/get";

export default {
  name: "AutocompleteInput",
  mixins: [Input, Reference],
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
      search: null
    };
  },
  created() {
    if (this.input) {
      this.loadCurrentChoices(this.input);
    }
  },
  computed: {
    getValue() {
      if (!this.reference) {
        return get(this.record, this.model || this.source);
      }

      let value = this.record[this.source];
      let input = this.multiple
        ? value.map(v => v[this.optionValue])
        : value[this.optionValue];

      this.loadCurrentChoices(input);

      return input;
    }
  },
  methods: {
    async loadCurrentChoices(value) {
      if (this.reference) {
        this.items = await this.fetchCurrentChoices(
          this.multiple ? value : [value]
        );
      }
    }
  },
  watch: {
    async search(val, old) {
      if (!val || val.length < this.minChars) {
        return;
      }

      this.items = [
        ...(this.items || []),
        ...((await this.fetchChoices(val)) || [])
      ];
    }
  }
};
</script>
