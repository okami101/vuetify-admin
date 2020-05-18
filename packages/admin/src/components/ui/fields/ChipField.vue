<template>
  <v-chip :color="getColor(value)" :small="small" :to="to">
    <slot>{{ value }}</slot>
  </v-chip>
</template>

<script>
import Field from "../../../mixins/field";

export default {
    mixins: [Field],
  props: {
    color: [String, Function],
    small: Boolean,
    to: [String, Object],
  },
  methods: {
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    },
  },
};
</script>
