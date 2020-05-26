/**
 * Common props for all type of action button.
 */
export default {
  props: {
    /**
     * Icon button, must be a valid MDI.
     */
    icon: String,
    /**
     * Label of button, shown as label next icon or as tooltip.
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * Hide label next of icon. Will appear as tooltip.
     */
    hideLabel: Boolean,
    /**
     * Color of button.
     */
    color: {
      type: String,
      default: "primary",
    },
    /**
     * Show as text without background.
     */
    text: Boolean,
  },
  methods: {
    onClick() {
      /**
       * Triggered on click, send related item if available.
       */
      this.$emit("click", this.item);
    },
  },
};
