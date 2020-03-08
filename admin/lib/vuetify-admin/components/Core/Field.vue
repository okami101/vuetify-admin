<template>
  <v-input v-if="record" :label="label">
    <div>
      <slot v-bind="{ item: record, value }">
        <component
          :is="`va-${type}-field`"
          :source="source"
          :resource="resource"
          :item="record"
          v-bind="options"
        ></component>
      </slot>
    </div>
  </v-input>
</template>

<script>
import Field from "vuetify-admin/mixins/field";

export default {
  name: "Field",
  mixins: [Field],
  props: {
    source: String,
    label: {
      type: String,
      default() {
        return this.source
          ? this.$t(`resources.${this.resource}.fields.${this.source}`)
          : "";
      }
    },
    type: {
      type: String,
      default: "text"
    },
    options: Object
  }
};
</script>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  display: block;
}
::v-deep .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
