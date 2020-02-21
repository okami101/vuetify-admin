<template>
  <va-field v-slot="record" v-bind="$props">
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
      return this.$d(new Date(val), this.format);
    }
  }
};
</script>
