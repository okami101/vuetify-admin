<template>
  <v-chip :color="getColor(value)" :small="small" :to="to">
    <!-- @slot Default chip content slot -->
    <slot>{{ value }}</slot>
  </v-chip>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as material chip.
 * @displayName VaChipField
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Color of chip, can be a function for dynamic color according to a certain value.
     */
    color: [String, Function],
    /**
     * Small chip.
     */
    small: Boolean,
    /**
     * Router link associated to chip if needed.
     */
    to: [String, Object],
  },
  methods: {
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    },
  },
};
</script>
