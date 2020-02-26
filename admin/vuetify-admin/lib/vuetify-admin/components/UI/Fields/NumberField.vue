<template>
  <va-field v-bind="$props">
    <span>{{ numberFormatted(value) }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "NumberField",
  mixins: [Field],
  props: {
    format: String
  },
  methods: {
    numberFormatted(val) {
      if (val) {
        return this.$n(val, this.format);
      }
    }
  }
};
</script>
