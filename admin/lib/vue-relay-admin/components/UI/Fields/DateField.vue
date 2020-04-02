<template>
  <span>{{ dateFormatted(value) }}</span>
</template>

<script>
import Field from "vue-relay-admin/mixins/field";

export default {
  name: "DateField",
  mixins: [Field],
  props: {
    format: String,
  },
  methods: {
    dateFormatted(val) {
      if (val) {
        return this.$d(new Date(val), this.format);
      }
    },
  },
};
</script>
