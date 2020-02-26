<template>
  <va-field v-bind="$props">
    <template v-slot:default>
      <slot :resource="resource" :items="value"></slot>
    </template>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field]
};
</script>
