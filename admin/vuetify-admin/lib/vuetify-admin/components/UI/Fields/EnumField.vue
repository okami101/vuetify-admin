<template>
  <va-field v-bind="$props">
    <slot :value="getLabel(value)">
      <span>{{ getLabel(value) }}</span>
    </slot>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "EnumField",
  mixins: [Field],
  props: {
    small: Boolean
  },
  methods: {
    getLabel(value) {
      return value
        ? this.$t(`resources.${this.resource}.enums.${this.source}.${value}`)
        : "";
    }
  }
};
</script>
