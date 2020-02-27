<template>
  <va-field v-bind="$props">
    <v-chip :color="getColor(value)">{{ value }}</v-chip>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ChipField",
  mixins: [Field],
  props: {
    color: [String, Function]
  },
  methods: {
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    }
  }
};
</script>
