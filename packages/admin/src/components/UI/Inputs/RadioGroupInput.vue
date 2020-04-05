<template>
  <v-radio-group
    v-bind="commonProps"
    :column="column"
    :row="row"
    @change="change"
    @input="update"
  >
    <v-radio v-if="clearable" :label="$t('va.forms.none')"></v-radio>
    <v-radio
      v-for="(c, i) in items || choices"
      :key="i"
      :label="c[optionText]"
      :value="c[optionValue]"
    ></v-radio>
  </v-radio-group>
</template>

<script>
import Input from "@/mixins/input";
import Reference from "@/mixins/reference";

export default {
  name: "RadioGroupInput",
  mixins: [Input, Reference],
  props: {
    column: {
      type: Boolean,
      default: true,
    },
    row: Boolean,
  },
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
