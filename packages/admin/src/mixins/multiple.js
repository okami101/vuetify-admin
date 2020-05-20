export default {
  props: {
    /**
     * @model
     */
    value: {
      type: [String, Array],
      default() {
        return this.multiple ? [] : null;
      },
    },
    /**
     * Allow input to accept multiple value as array.
     */
    multiple: Boolean,
    /**
     * Use full filled background color style.
     */
    filled: {
      type: Boolean,
      default() {
        return !this.multiple;
      },
    },
    /**
     * Use chips for each item. Enabled if `multiple` by default.
     */
    chips: {
      type: Boolean,
      default() {
        return this.multiple;
      },
    },
    /**
     * Use small chips.
     */
    smallChips: Boolean,
  },
};
