<template>
  <va-field v-bind="$props">
    <span>{{ record[source] }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "TextField",
  mixins: [Field]
};
</script>
