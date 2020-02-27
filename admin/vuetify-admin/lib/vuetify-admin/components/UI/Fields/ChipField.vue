<template>
  <va-field v-bind="$props">
    <v-chip :color="getColor(value)" :small="small">
      <slot>{{ value }}</slot>
    </v-chip>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ChipField",
  mixins: [Field],
  props: {
    color: [String, Function],
    small: Boolean
  },
  methods: {
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    }
  }
};
</script>
