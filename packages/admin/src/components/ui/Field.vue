<template>
  <v-input v-if="record" :label="label" class="va-input">
    <div>
      <!--
        @slot Field placeholder. By default use field component according to `type` props with all other attributes merged.
      -->
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
import upperFirst from "lodash/upperFirst";
import lowerCase from "lodash/lowerCase";

/**
 * Wrapper component for field which support label localization and supported VA field, mainly used for show page.
 * Use default slot for custom needs or use `type` property for quick usage of valid existing field component.
 * All other attributes of this component will be merged into child slot.
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Override default label behavior.
     * Default is to get the localized VueI18n label from both ressource and property source.
     */
    label: {
      type: String,
      default() {
        return this.$admin.getSourceLabel(this.resource, this.source);
      },
    },
    /**
     * Type of field to use. Not used if you use default slot for advanced custom needs.
     */
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
