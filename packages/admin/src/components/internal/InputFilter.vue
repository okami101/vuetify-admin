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
    clearable
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
     */
    label: String,
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
    input() {
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
