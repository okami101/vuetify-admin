<template>
  <v-chip v-if="chip" :color="getColor" :small="small">
    <slot :value="selected">
      <span>{{ selected ? selected[optionText] : "" }}</span>
    </slot>
  </v-chip>
  <span v-else>
    <slot :value="selected">
      <span>{{ selected ? selected[optionText] : "" }}</span>
    </slot>
  </span>
</template>

<script>
import Field from "../../../mixins/field";
import Choices from "../../../mixins/choices";

export default {
  name: "SelectField",
  mixins: [Field, Choices],
  props: {
    chip: Boolean,
    color: [String, Function],
    small: Boolean,
  },
  computed: {
    selected() {
      return this.choices.find((c) => c[this.optionValue] === this.value);
    },
    getColor() {
      return typeof this.color === "function"
        ? this.color(this.value)
        : this.color;
    },
  },
};
</script>
