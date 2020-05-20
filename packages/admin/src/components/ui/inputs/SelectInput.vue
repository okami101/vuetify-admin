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
import Filterable from "../../../mixins/filterable";
import Reference from "../../../mixins/reference";

export default {
  mixins: [Input, Multiple, Editable, Filterable, Reference],
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
