<template>
  <div>
    <slot :value="selected">
      <span>{{ selected ? selected[optionText] : "" }}</span>
    </slot>
  </div>
</template>

<script>
import Field from "vuetify-admin/mixins/field";
import Choices from "vuetify-admin/mixins/choices";

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
