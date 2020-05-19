<template>
  <span>{{ dateFormatted(value) }}</span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as formatted date. Support any localized format, long, short, etc.
 * Use `$d` VueI18n function under the hood.
 * @displayName VaDateField
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Name of date format to use. Must be predefined on your VueI18n plugin.
     */
    format: String,
  },
  methods: {
    dateFormatted(val) {
      if (val) {
        return this.$d(new Date(val), this.format);
      }
    },
  },
};
</script>
