<template>
  <a :href="`mailto:${value}`">{{ value }}</a>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "EmailField",
  mixins: [Field],
};
</script>
