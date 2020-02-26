<template>
  <va-field v-bind="$props">
    <span>{{ value }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ReferenceField",
  mixins: [Field],
  props: {
    multiple: Boolean
  }
};
</script>
