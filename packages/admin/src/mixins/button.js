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
    /**
     * Force show button, prevent hiding it according to any default behavior.
     * Notably used on create, edit, show and clone buttons which will auto-hide in case of no relation action resource available.
     */
    show: Boolean,
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
