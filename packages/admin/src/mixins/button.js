/**
 * Common props for generic button.
 * @displayName VaMixinButton
 */
export default {
  props: {
    /**
     * If true, show button with icon only, label will be shown as tooltip.
     */
    icon: Boolean,
    /**
     * Customizable background or text color, dependly of text prop value.
     */
    color: String,
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
