<template>
  <va-field v-bind="$props">
    <span v-html="value"></span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "RichTextField",
  mixins: [Field]
};
</script>
