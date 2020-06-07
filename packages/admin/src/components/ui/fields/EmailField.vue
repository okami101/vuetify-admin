<template>
  <a :href="`mailto:${value}`">{{ value }}</a>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as `mailto` link.
 */
export default {
  mixins: [Field],
};
</script>
