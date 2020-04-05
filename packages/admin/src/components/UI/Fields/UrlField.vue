<template>
  <a :href="`${value}`" target="_blank">{{ value }}</a>
</template>

<script>
import Field from "@/mixins/field";

export default {
  name: "UrlField",
  mixins: [Field],
};
</script>
