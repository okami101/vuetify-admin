<template>
  <span>{{ value }}</span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as simple text, render a simple span. HTML tags will be stripped.
 */
export default {
  mixins: [Field],
};
</script>
