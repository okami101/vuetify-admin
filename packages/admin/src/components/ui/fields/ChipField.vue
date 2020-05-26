<template>
  <v-chip :color="getColor(value)" :small="small" :to="to">
    <!-- @slot Chip content placeholder for further customization, show the value by default. -->
    <slot>{{ value }}</slot>
  </v-chip>
</template>

<script>
import Field from "../../../mixins/field";
import Chip from "../../../mixins/chip";

/**
 * Show value inside a material chip.
 * @displayName ChipField
 */
export default {
  mixins: [Field, Chip],
};
</script>
