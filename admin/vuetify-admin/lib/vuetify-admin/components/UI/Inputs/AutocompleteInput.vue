<template>
  <v-autocomplete
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :filled="filled"
    :multiple="multiple"
    :item-text="optionText"
    :item-value="optionValue"
    :items="items || choices"
    :chips="chips"
    :loading="loading"
    :search-input.sync="search"
    :clearable="clearable"
    @change="change"
  >
    <template v-slot:selection="data" v-if="$scopedSlots.selection">
      <slot name="selection" v-bind="data"></slot>
    </template>
    <template v-slot:item="data" v-if="$scopedSlots.item">
      <slot name="item" v-bind="data"></slot>
    </template>
  </v-autocomplete>
</template>

<script>
import Input from "vuetify-admin/mixins/input";
import Choices from "vuetify-admin/mixins/choices";

export default {
  name: "AutocompleteInput",
  mixins: [Input, Choices],
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
    minChars: {
      type: Number,
      default: 3
    }
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
        this.items = await this.$parent.fetchChoices(val);
      }
      this.loading = false;
    }
  }
};
</script>
