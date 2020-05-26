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
import Rating from "../../../mixins/rating";

/**
 * Show value as rating stars. Value should be a valid integer or decimal if half increments enabled.
 * Icons can be edited via $ratingFull, $ratingEmpty and $ratingHalf on Vuetify settings.
 */
export default {
  mixins: [Field, Rating],
};
</script>
