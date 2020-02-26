<template>
  <va-field v-bind="$props">
    <v-chip v-if="typeof value === 'string'" :color="getColor(value)">{{
      getLabel(value)
    }}</v-chip>
    <span v-else>
      <v-chip
        v-for="(v, i) in value"
        :key="i"
        :color="getColor(value)"
        class="mr-2 mb-2"
        >{{ getLabel(v) }}</v-chip
      >
    </span>
  </va-field>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "ChipField",
  mixins: [Field],
  props: {
    enum: Boolean,
    color: [String, Function]
  },
  methods: {
    getLabel(value) {
      return this.enum
        ? this.$t(`resources.${this.resource}.enums.${this.source}.${value}`)
        : value;
    },
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    }
  }
};
</script>
