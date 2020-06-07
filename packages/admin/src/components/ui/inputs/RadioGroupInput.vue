<template>
  <v-radio-group
    v-bind="commonProps"
    :column="column"
    :row="row"
    @change="update"
  >
    <v-radio v-if="clearable" :label="$t('va.forms.none')"></v-radio>
    <v-radio
      v-for="(c, i) in items || choices"
      :key="i"
      :label="c[getItemText]"
      :value="c[getItemValue]"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import Input from "../../../mixins/input";
import ReferenceInput from "../../../mixins/reference-input";

/**
 * Value editing from a fixed choices. Support references.
 * If no choices, by default, takes localized enums with source as value from your VueI18n resources locales.
 */
export default {
  mixins: [Input, ReferenceInput],
  props: {
    /**
     * Show radios as a column.
     */
    column: Boolean,
    /**
     * Show radios as a row.
     */
    row: Boolean,
  },
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
