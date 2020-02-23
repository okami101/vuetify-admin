<template>
  <v-input
    :label="getLabel"
    :hint="hint"
    :rules="getRules"
    :error-messages="errorMessages"
    :append-icon="icon"
    :hide-details="hideDetails"
    :dense="dense"
  >
    <slot></slot>
  </v-input>
</template>

<script>
export default {
  name: "Input",
  props: {
    source: String,
    label: String,
    hint: String,
    icon: String,
    hideDetails: Boolean,
    dense: Boolean,
    errorMessages: Array,
    required: Boolean
  },
  computed: {
    getLabel() {
      return this.label || this.$t(`attributes.${this.source}`);
    },
    getRules() {
      let rules = [];

      if (this.required) {
        rules.push(
          v =>
            !!v || this.$t("va.forms.required_field", { field: this.getLabel })
        );
      }
      return rules;
    }
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
