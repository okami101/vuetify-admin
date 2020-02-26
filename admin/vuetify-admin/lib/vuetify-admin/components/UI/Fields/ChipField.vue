<template>
  <va-field v-bind="$props">
    <v-chip v-if="typeof value === 'string'" :color="getColor(value)">{{
      getLabel(value)
    }}</v-chip>
    <span v-else>
      <v-chip v-for="(v, i) in value" :key="i" :color="getColor(value)">{{
        getLabel(v)
      }}</v-chip>
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
  computed: {
    getLabel(value) {
      return this.enum
        ? this.$t(`resources.${resource}.enums.${source}.${value}`)
        : value;
    },
    getColor(value) {
      return this.color === "string" ? this.color : this.color(value);
    }
  }
};
</script>
