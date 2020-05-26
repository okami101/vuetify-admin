<template>
  <component
    :is="`va-${type}-input`"
    :resource="resource"
    :source="source"
    :label="label"
    v-bind="$attrs"
    hide-details
    :filled="false"
    small-chips
    v-model="input"
  >
  </component>
</template>

<script>
import Source from "../../mixins/source";
import debounce from "lodash/debounce";

export default {
  mixins: [Source],
  props: {
    value: {
      default: null,
    },
    type: {
      type: String,
      required: true,
      validator: (v) =>
        [
          "text",
          "number",
          "boolean",
          "date",
          "rating",
          "select",
          "autocomplete",
        ].includes(v),
    },
    /**
     * Override default label behavior.
     * Default is to get the localized VueI18n label from both ressource and property source.
     */
    label: {
      type: String,
      default() {
        return this.source
          ? this.$t(`resources.${this.resource}.fields.${this.source}`)
          : "";
      },
    },
  },
  data() {
    return {
      input: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.input = val;
      },
      immediate: true,
    },
    input(newVal) {
      if (newVal === undefined) {
        return;
      }

      this.debounceInput();
    },
  },
  methods: {
    debounceInput: debounce(function () {
      this.$emit("input", this.input);
    }, 200),
  },
};
</script>
