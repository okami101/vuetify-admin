<template>
  <va-field v-bind="$props">
    <slot :resource="resource" :items="value">
      {{ (value || []).map(v => getLabel(v)).join(", ") }}
    </slot>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field],
  props: {
    enum: Boolean
  },
  methods: {
    getLabel(value) {
      return this.enum
        ? this.$t(`resources.${this.resource}.enums.${this.source}.${value}`)
        : value;
    }
  }
};
</script>
