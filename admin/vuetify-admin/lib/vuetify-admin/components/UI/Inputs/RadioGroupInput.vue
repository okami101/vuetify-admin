<template>
  <v-radio-group
    v-model="input"
    :label="label"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :hide-details="hideDetails"
    :dense="dense"
    :column="column"
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
import Input from "vuetify-admin/mixins/input";
import Choices from "vuetify-admin/mixins/choices";

export default {
  name: "RadioGroupInput",
  mixins: [Input, Choices],
  props: {
    column: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      items: null
    };
  },
  async created() {
    /**
     * Load parent reference input if available
     */
    if (this.$parent.fetchChoices) {
      this.items = await this.$parent.fetchChoices();
    }
  }
};
</script>
