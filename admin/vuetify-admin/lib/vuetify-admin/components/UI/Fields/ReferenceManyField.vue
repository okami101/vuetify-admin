<template>
  <span>{{ value }}</span>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ReferenceField",
  mixins: [Field]
};
</script>
