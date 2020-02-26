<template>
  <va-field v-bind="$props">
    <span v-if="typeof value === 'string'">{{ getLabel(value) }}</span>
    <span v-else>{{ (value || []).map(v => getLabel(v)).join(", ") }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "SelectField",
  mixins: [Field],
  methods: {
    getLabel(value) {
      return this.$t(
        `resources.${this.resource}.enums.${this.source}.${value}`
      );
    }
  }
};
</script>
