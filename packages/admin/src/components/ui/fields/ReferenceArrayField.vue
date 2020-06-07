<template>
  <v-chip-group :column="column">
    <va-reference-field
      :reference="reference"
      v-for="(item, i) in value"
      :key="i"
      :item="item"
      :color="color"
      chip
      :small="small"
      :action="action"
      :itemText="itemText"
      :itemValue="itemValue"
    >
      <!-- @slot Content placeholder for each resource label localization inside chip, guess the resource text by default. -->
      <slot :value="item"></slot>
    </va-reference-field>
  </v-chip-group>
</template>

<script>
import Field from "../../../mixins/field";
import Reference from "../../../mixins/reference";

/**
 * Display multiple reference links to another existing resource as material chip group.
 */
export default {
  mixins: [Field, Reference],
  props: {
    /**
     * Show list of chips as column.
     */
    column: Boolean,
  },
};
</script>
