<template>
  <v-select
    v-bind="commonProps"
    :filled="filled"
    :multiple="multiple"
    :chips="chips"
    :small-chips="smallChips"
    :item-text="getItemText"
    :item-value="getItemValue"
    :items="items || choices"
    @change="change"
    @input="update"
  >
  </v-select>
</template>

<script>
import Input from "../../../mixins/input";
import Multiple from "../../../mixins/multiple";
import Editable from "../../../mixins/editable";
import ReferenceInput from "../../../mixins/reference-input";

/**
 * Value editing from a fixed choices. Support multiple and references.
 * If no choices, by default, takes localized enums with source as value from your VueI18n resources locales.
 */
export default {
  mixins: [Input, Multiple, Editable, ReferenceInput],
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
