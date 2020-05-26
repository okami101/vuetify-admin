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
import Reference from "../../../mixins/reference";

/**
 * Value editing from a fixed choices. Referenceable input.
 * If no choices, by default, takes localized enums with source as value from your VueI18n resources locales.
 * @displayName SelectInput
 */
export default {
  mixins: [Input, Multiple, Editable, Reference],
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
