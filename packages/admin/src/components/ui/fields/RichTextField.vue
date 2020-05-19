<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value on raw format that allows HTML tags.
 * Source value must be trusted for prevent XSS attacks ! Clean HTML on API side if needed.
 * @displayName VaRichTextField
 */
export default {
  mixins: [Field],
};
</script>
