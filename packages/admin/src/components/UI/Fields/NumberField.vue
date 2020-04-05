<template>
  <span>{{ numberFormatted(value) }}</span>
</template>

<script>
import Field from "@/mixins/field";

export default {
  name: "NumberField",
  mixins: [Field],
  props: {
    format: String,
  },
  methods: {
    numberFormatted(val) {
      if (val) {
        return this.$n(val, this.format);
      }
    },
  },
};
</script>
