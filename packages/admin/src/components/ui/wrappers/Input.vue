<template>
  <v-input
    :label="getLabel"
    :hint="hint"
    :rules="rules"
    :error-messages="errorMessages"
    :append-icon="appendIcon"
    :hide-details="hideDetails"
    :dense="dense"
  >
    <!-- @slot Custom input placeholder which handles value editing -->
    <slot></slot>
  </v-input>
</template>

<script>
import Source from "../../../mixins/source";
import InputWrapper from "../../../mixins/input-wrapper";

/**
 * Dumb input wrapper for custom input components that don't manage natively error states.
 */
export default {
  mixins: [Source, InputWrapper],
  props: {
    /**
     * Puts the input in an error state and passes through custom error messages.
     */
    errorMessages: Array,
  },
};
</script>
