<template>
  <v-chip-group :column="column">
    <v-chip
      v-for="(item, i) in value"
      :key="i"
      :color="getColor(value)"
      :small="small"
    >
      <!-- @slot Default chip content slot, use simple text or select field by default. -->
      <slot :value="item">
        <va-select-field
          v-if="select"
          :resource="resource"
          :source="source"
          :item="item"
        ></va-select-field>
        <span v-else>
          {{ getItemText(item) }}
        </span>
      </slot>
    </v-chip>
  </v-chip-group>
</template>

<script>
import Field from "../../../mixins/field";
import Chip from "../../../mixins/chip";

/**
 * Show each single value of multiple array type value as material chip group.
 */
export default {
  mixins: [Field, Chip],
  props: {
    /**
     * Property used for stringify inner item if object.
     * Use a function for further stringify customization.
     */
    itemText: {
      type: [String, Array, Function],
      default: "name",
    },
    /**
     * Use enum select field instead of simple text as value formatter.
     */
    select: Boolean,
    /**
     * Show list of chips as column.
     */
    column: Boolean,
  },
  methods: {
    getItemText(item) {
      if (typeof this.itemText === "function") {
        return this.item(item);
      }
      return item[this.itemText] || item;
    },
  },
};
</script>
