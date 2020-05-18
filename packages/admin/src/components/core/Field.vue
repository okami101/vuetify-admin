<template>
  <v-input v-if="record" :label="label" class="va-input">
    <div>
      <slot v-bind="{ item: record, value }">
        <component
          :is="`va-${type}-field`"
          :source="source"
          :resource="resource"
          :item="record"
          v-bind="$attrs"
        ></component>
      </slot>
    </div>
  </v-input>
</template>

<script>
import Field from "../../mixins/field";

export default {
  mixins: [Field],
  props: {
    source: String,
    label: {
      type: String,
      default() {
        return this.source
          ? this.$t(`resources.${this.resource}.fields.${this.source}`)
          : "";
      },
    },
    type: {
      type: String,
      default: "text",
    },
  },
};
</script>

<style>
.va-input .v-input__slot {
  display: block;
}
.va-input .v-label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
</style>
