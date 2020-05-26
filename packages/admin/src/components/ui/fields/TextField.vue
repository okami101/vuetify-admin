<template>
  <span>{{ value }}</span>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as simple text. HTML tags will be stripped.
 * @displayName TextField
 */
export default {
  mixins: [Field],
};
</script>
