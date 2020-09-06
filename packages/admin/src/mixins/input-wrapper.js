/**
 * Common props for all inputs.
 */
export default {
  props: {
    /**
     * Specific case of parent resource for array input.
     */
    parentSource: String,
    /**
     * Appends an icon to the component. Must be a valid MDI.
     */
    appendIcon: String,
    /**
     * Hint text.
     */
    hint: String,
    /**
     * Hides hint and validation errors. When set to auto messages will be rendered only if there's a message (hint, error message, counter value etc) to display.
     */
    hideDetails: [Boolean, String],
    /**
     * Reduces the input height.
     */
    dense: Boolean,
    /**
     * Add default required client side rule.
     */
    required: Boolean,
    /**
     * Accepts an array of functions that take an input value as an argument and return either true / false or a string with an error message.
     */
    rules: {
      type: Array,
      default() {
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
    /**
     * Override default label behavior.
     * Default is to get the localized VueI18n label from both resource and property source.
     */
    label: String,
    /**
     * Override default source key as translated label.
     */
    labelKey: String,
    /**
     * Placeholder if input support it.
     */
    placeholder: String,
    /**
     * Mark this input as clearable.
     */
    clearable: Boolean,
    /**
     * Specific index of field in case of inside array of inputs, aka VaArrayInput.
     * Use it with `parentSource` prop in order to update the value at a good place in the form model.
     */
    index: Number,
    /**
     * List of custom error validation messages to show as hint
     */
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getLabel() {
      if (this.label) {
        return this.label;
      }

      if (!this.labelKey && !this.source) {
        return "";
      }

      let source = this.labelKey || this.source;

      if (this.parentSource) {
        source = `${this.parentSource}.${this.source}`;
      }

      return this.$admin.getSourceLabel(this.resource, source);
    },
  },
};
