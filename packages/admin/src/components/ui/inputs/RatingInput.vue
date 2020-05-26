<template>
  <va-input v-bind="$props">
    <v-rating
      dense
      v-bind="commonProps"
      :color="color"
      :background-color="backgroundColor"
      @change="change"
      @input="update"
    ></v-rating>
  </va-input>
</template>

<script>
import Input from "../../../mixins/input";
import Rating from "../../../mixins/rating";
import Editable from "../../../mixins/editable";

/**
 * Edit number value as rating stars. Value should be a valid integer or decimal if half increments enabled.
 * Icons can be edited via $ratingFull, $ratingEmpty and $ratingHalf on Vuetify settings.
 */
export default {
  mixins: [Input, Rating, Editable],
  props: {
    /**
     * Number to be edited.
     * @model
     */
    value: {
      type: Number,
      default: null,
    },
  },
};
</script>
