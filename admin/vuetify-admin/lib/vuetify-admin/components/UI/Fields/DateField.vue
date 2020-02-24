<template>
  <va-field v-bind="$props">
    <span>{{ dateFormatted(record[source]) }}</span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "DateField",
  mixins: [Field],
  props: {
    format: String
  },
  methods: {
    dateFormatted(val) {
      if (val) {
        return this.$d(new Date(val), this.format);
      }
    }
  }
};
</script>
