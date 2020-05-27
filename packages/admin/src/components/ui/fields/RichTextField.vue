<template>
  <div class="va-rich-text-field" v-html="value"></div>
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
