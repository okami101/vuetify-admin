<template>
  <span>{{ numberFormatted(value) }}</span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as formatted number. Can be any localized currency, decimal number, or percent value.
 * Use `$n` VueI18n function under the hood.
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Name of number format to use. Must be predefined on your VueI18n plugin.
     */
    format: {
      type: String,
      default() {
        return this.$admin.options.numberFormat;
      },
    },
  },
  methods: {
    numberFormatted(val) {
      if (val) {
        return this.$n(val, this.format);
      }
    },
  },
};
</script>
