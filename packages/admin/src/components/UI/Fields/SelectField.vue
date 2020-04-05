<template>
  <div>
    <slot :value="selected">
      <span>{{ selected ? selected[optionText] : "" }}</span>
    </slot>
  </div>
</template>

<script>
import Field from "@/mixins/field";
import Choices from "@/mixins/choices";

export default {
  name: "SelectField",
  mixins: [Field, Choices],
  computed: {
    selected() {
      return this.choices.find((c) => c[this.optionValue] === this.value);
    },
  },
};
</script>
