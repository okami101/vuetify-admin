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
      <slot name="selection" v-bind="data"></slot>
    </template>
    <template v-slot:item="data" v-if="$scopedSlots.item">
      <slot name="item" v-bind="data"></slot>
    </template>
  </component>
</template>

<script>
import Input from "../../../mixins/input";
import Multiple from "../../../mixins/multiple";
import Reference from "../../../mixins/reference";
import get from "lodash/get";

export default {
  mixins: [Input, Multiple, Reference],
  props: {
    minChars: {
      type: Number,
      default: 3,
    },
    taggable: Boolean,
  },
  data() {
    return {
      search: null,
    };
  },
  created() {
    this.fillInputFromSource();
    this.loadCurrentChoices(this.input);
  },
  methods: {
    fillInputFromSource() {
      if (!this.reference || !this.formState || !this.formState.item) {
        return;
      }

      let value = this.formState.item[this.source];
      let input = this.multiple
        ? value.map((v) => v[this.getItemValue])
        : value[this.getItemValue];

      this.update(input);
    },
    async loadCurrentChoices(value) {
      if (this.reference && value) {
        this.items = await this.fetchCurrentChoices(
          this.multiple ? value : [value]
        );
      }
    },
  },
  watch: {
    async search(val, old) {
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
