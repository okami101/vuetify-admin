<template>
  <v-rating
    :value="value"
    :length="length"
    :half-increments="halfIncrements"
    readonly
    dense
    :color="color"
    :background-color="backgroundColor"
  ></v-rating>
</template>

<script>
import Field from "../../../mixins/field";

/**
 * Show value as rating stars. Value should be a valid integer or decimal if half increments enabled.
 * Icons can be edited via $ratingFull, $ratingEmpty and $ratingHalf on Vuetify settings.
 * @displayName VaRatingField
 */
export default {
  mixins: [Field],
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
</script>
