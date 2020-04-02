<template>
  <span>{{ value }}</span>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "TextField",
  mixins: [Field],
};
</script>
