<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value on raw format that allows HTML tags.
 * Source value must be trusted for prevent XSS attacks ! Clean HTML on API side if needed.
 */
export default {
  mixins: [Field],
};
</script>
