<template>
  <v-chip-group>
    <v-chip v-for="(item, i) in value" :key="i" :color="color" :small="small">
      <slot :value="item">{{
        optionText && item[optionText] ? item[optionText] : item
      }}</slot>
    </v-chip>
  </v-chip-group>
</template>

<script>
import Field from "../../../mixins/field";

export default {
  name: "ArrayField",
  mixins: [Field],
  props: {
    optionText: {
      type: [String, Array, Function],
      default: "name",
    },
    color: String,
    small: Boolean,
  },
};
</script>
