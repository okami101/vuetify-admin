<template>
  <v-chip v-if="chip" :color="getColor(value)" :small="small" :to="to">
    <slot :value="selected">
      <span>{{ selected ? selected[itemText] : "" }}</span>
    </slot>
  </v-chip>
  <span v-else>
    <!-- @slot Default content slot for further customization, take the text of selected choice by default. -->
    <slot :value="selected">
      <span>{{ selected ? selected[itemText] : "" }}</span>
    </slot>
  </span>
</template>

<script>
import Field from "../../../mixins/field";
import Choices from "../../../mixins/choices";
import Chip from "../../../mixins/chip";

/**
 * Show value as text selected from a predefined key-value choices.
 * If no choices, by default, takes localized enums with source as value from your VueI18n resources locales.
 * @displayName VaSelectField
 */
export default {
  mixins: [Field, Choices, Chip],
  props: {
    /**
     * Show text inside material chip.
     */
    chip: Boolean,
  },
  computed: {
    selected() {
      return this.choices.find((c) => c[this.itemValue] === this.value);
    },
  },
};
</script>
