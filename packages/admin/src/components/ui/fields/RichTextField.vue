<template>
  <span v-html="value"></span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value on raw format that allows HTML tags.
 * Source value must be trusted for prevent XSS attacks.
 */
export default {
  mixins: [Field],
};
</script>
