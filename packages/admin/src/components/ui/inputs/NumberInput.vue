<template>
  <v-text-field
    v-bind="commonProps"
    :filled="filled"
    type="number"
    :step="step"
    :min="min"
    :max="max"
    @change="change"
    @input="update"
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";

/**
 * Optimized for number editing. Just a type number input with step, min and max attribute behavior.
 */
export default {
  mixins: [Input, Editable],
  props: {
    /**
     * Number to be edited.
     * @model
     */
    value: {
      type: Number,
      default: null,
    },
    /**
     * Use full filled background color style.
     */
    filled: {
      type: Boolean,
      default: true,
    },
    /**
     * The interval step.
     */
    step: {
      type: Number,
      default: 1,
    },
    /**
     * The minimum accepted value.
     */
    min: Number,
    /**
     * The maximum accepted value.
     */
    max: Number,
  },
};
</script>
