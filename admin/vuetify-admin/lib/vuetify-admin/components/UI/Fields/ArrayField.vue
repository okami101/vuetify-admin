<template>
  <va-field v-bind="$props">
    <slot :resource="resource" :items="value"></slot>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field]
};
</script>
