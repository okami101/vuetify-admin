<template>
  <span>{{ getText }}</span>
</template>

<script>
import Field from "../../../mixins/field";
import truncate from "lodash/truncate";

/**
 * Show value as simple text, render a simple span. HTML tags will be stripped.
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Truncate text
     */
    truncate: Number,
  },
  computed: {
    getText() {
      return this.truncate
        ? truncate(this.value, {
            length: this.truncate,
          })
        : this.value;
    },
  },
};
</script>
