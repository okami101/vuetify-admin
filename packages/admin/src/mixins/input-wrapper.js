/**
 * Common props for all inputs.
 * @displayName VaMixinInputWrapper
 */
export default {
  props: {
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
  },
};
