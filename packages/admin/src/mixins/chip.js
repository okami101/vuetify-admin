/**
 * Common props for all based chip fields.
 */
export default {
  props: {
    /**
     * Color of chip, can be a function for dynamic color according to a certain value.
     */
    color: [String, Function],
    /**
     * Small chip.
     */
    small: Boolean,
    /**
     * Router link associated to chip if needed.
     */
    to: [String, Object],
  },
  methods: {
    getColor(value) {
      return typeof this.color === "function" ? this.color(value) : this.color;
    },
  },
};
