<template>
  <va-field v-bind="$props">
    <span>{{ value }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "FileField",
  mixins: [Field]
};
</script>
