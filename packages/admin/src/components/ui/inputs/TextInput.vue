<template>
  <v-textarea
    v-if="multiline"
    v-bind="commonProps"
    auto-grow
    :filled="filled"
    @change="change"
    @input="update"
  ></v-textarea>
  <v-text-field
    v-else
    v-bind="commonProps"
    :filled="filled"
    @change="change"
    @input="update"
    :type="type"
  ></v-text-field>
</template>

<script>
import Input from "../../../mixins/input";
import Editable from "../../../mixins/editable";

/**
 * Text editing for text value type via a basic text input.
 * Support textarea mode for long text via `multiline` prop.
 * Can be use for any date, datetime or time editing, use type set on `date`, `datetime-local` or `time`.
 * Render will depend of browser support.
 */
export default {
  mixins: [Input, Editable],
  props: {
    /**
     * Text to be edited.
     * @model
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * Type of text input. All HTML type allowed.
     */
    type: {
      type: String,
      default: "text",
    },
    /**
     * Transform text input into textarea.
     */
    multiline: Boolean,
    /**
     * Use full filled background color style.
     */
    filled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
