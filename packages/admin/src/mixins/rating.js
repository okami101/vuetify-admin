/**
 * Common props for rating field and input components.
 */
export default {
  props: {
    /**
     * Plain color for active ratings
     */
    color: {
      type: String,
      default: "yellow darken-2",
    },
    /**
     * Stroke color for empty ratings.
     */
    backgroundColor: {
      type: String,
      default: "yellow",
    },
    /**
     * Amount of ratings to show.
     */
    length: {
      type: [Number, String],
      default: 5,
    },
    /**
     * Allows the selection of half increments.
     */
    halfIncrements: {
      type: Boolean,
      default: false,
    },
  },
};
