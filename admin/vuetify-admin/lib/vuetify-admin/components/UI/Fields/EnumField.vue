<template>
  <va-field v-bind="$props">
    <slot :value="getLabel(value)">
      <v-chip v-if="chip" :color="getColor(value)">{{
        getLabel(value)
      }}</v-chip>
      <span v-else>{{ getLabel(value) }}</span>
    </slot>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "EnumField",
  mixins: [Field],
  props: {
    chip: Boolean,
    color: [String, Function]
  },
  methods: {
    getLabel(value) {
      return value
        ? this.$t(`resources.${this.resource}.enums.${this.source}.${value}`)
        : "";
    },
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    }
  }
};
</script>
