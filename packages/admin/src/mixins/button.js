import Resource from "./resource";

/**
 * Common props for generic button.
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Item attached to the button.
     */
    item: null,
    /**
     * If true, show button with icon only, label will be shown as tooltip.
     */
    icon: Boolean,
    /**
     * Customizable background or text color, dependably of text prop value.
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
