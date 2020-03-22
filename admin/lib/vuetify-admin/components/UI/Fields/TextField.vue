<template>
  <span>{{ value }}</span>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "TextField",
  mixins: [Field],
};
</script>
