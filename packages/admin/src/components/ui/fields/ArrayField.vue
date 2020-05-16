<template>
  <v-chip-group :column="column">
    <v-chip v-for="(item, i) in value" :key="i" :color="color" :small="small">
      <slot :value="item">
        <va-select-field
          v-if="select"
          :resource="resource"
          :source="source"
          :item="item"
        ></va-select-field>
        <span v-else>
          {{ itemText && item[itemText] ? item[itemText] : item }}
        </span>
      </slot>
    </v-chip>
  </v-chip-group>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field],
  props: {
    itemText: {
      type: [String, Array, Function],
      default: "name",
    },
    color: String,
    small: Boolean,
    select: Boolean,
    column: Boolean,
    choices: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
