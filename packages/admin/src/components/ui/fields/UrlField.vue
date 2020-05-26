<template>
  <a :href="`${value}`" :target="target">{{ value }}</a>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as URL format.
 * @displayName UrlField
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Target value for anchor, default to external.
     */
    target: {
      type: String,
      default: "_blank",
    },
  },
};
</script>
