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
     * Show label next of icon. As tooltip by default.
     */
    showLabel: Boolean,
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
       * Trigered on click, send related item if available.
       */
      this.$emit("click", this.item);
    },
  },
};
