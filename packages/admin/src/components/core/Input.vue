<template>
  <v-input
    :label="label"
    :hint="hint"
    :rules="rules"
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
  props: {
    source: String,
    label: String,
    hint: String,
    icon: String,
    hideDetails: Boolean,
    dense: Boolean,
    errorMessages: Array,
    required: Boolean,
  },
  computed: {
    rules() {
      let rules = [];

      if (this.required) {
        rules.push(
          (v) =>
            !!v || this.$t("va.forms.required_field", { field: this.label })
        );
      }
      return rules;
    },
  },
};
</script>
