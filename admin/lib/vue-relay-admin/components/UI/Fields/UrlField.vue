<template>
  <a :href="`${value}`" target="_blank">{{ value }}</a>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "UrlField",
  mixins: [Field],
};
</script>
