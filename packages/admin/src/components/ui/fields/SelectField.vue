<template>
  <v-chip v-if="chip" :color="getColor" :small="small">
    <slot :value="selected">
      <span>{{ selected ? selected[itemText] : "" }}</span>
    </slot>
  </v-chip>
  <span v-else>
    <slot :value="selected">
      <span>{{ selected ? selected[itemText] : "" }}</span>
    </slot>
  </span>
</template>

<script>
import Field from "../../../mixins/field";
import Choices from "../../../mixins/choices";

export default {
  mixins: [Field, Choices],
  props: {
    chip: Boolean,
    color: [String, Function],
    small: Boolean,
  },
  computed: {
    selected() {
      return this.choices.find((c) => c[this.itemValue] === this.value);
    },
    getColor() {
      return typeof this.color === "function"
        ? this.color(this.value)
        : this.color;
    },
  },
};
</script>
