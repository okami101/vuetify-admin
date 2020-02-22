<template>
  <va-field v-slot="record" v-bind="$props">
    <span>{{ numberFormatted(record[source]) }}</span>
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
