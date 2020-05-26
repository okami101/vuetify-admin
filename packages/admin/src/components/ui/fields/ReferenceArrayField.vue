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
    </va-reference-field>
  </v-chip-group>
</template>

<script>
import Field from "../../../mixins/field";
import Reference from "../../../mixins/reference";

/**
 * Field with multiple reference links to another existing resource.
 */
export default {
  mixins: [Field, Reference],
  props: {
    /**
     * Show list of chips as column.
     */
    column: Boolean,
  },
  computed: {
    link() {
      return {
        name: `${this.reference}_${this.action}`,
        params: { id: this.value[this.itemValue] },
      };
    },
    getItemText() {
      let resource = this.$admin.getResource(this.reference);
      let text = this.itemText || resource.label;

      if (typeof text === "function") {
        return text(this.value);
      }
      return this.value[text] || this.value;
    },
  },
};
</script>
